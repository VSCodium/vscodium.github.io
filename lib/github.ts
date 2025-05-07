import { cache } from 'react';
import { readReleaseData, writeReleaseData } from '@/lib/release-data';
import type { VSCodiumRelease, ParsedRelease, Quality } from '@/lib/types';

/**
 * GitHub API integration for VSCodium releases
 *
 * Note: The GITHUB_TOKEN environment variable is optional.
 * - Without a token, the API is rate-limited to 60 requests per hour
 * - With a token, the limit increases to 5,000 requests per hour
 *
 * For production deployments, it's recommended to add a GITHUB_TOKEN
 * with public repo access to avoid rate limiting issues.
 */

const USE_MOCK_DATA = process.env.NODE_ENV === 'development';

// Helper function to fetch data from the GitHub API
async function fetchFromApi(quality: Quality): Promise<VSCodiumRelease> {
	const headers: Record<string, string> = {
		Accept: 'application/vnd.github.v3+json',
	};

	// Only add the Authorization header if GITHUB_TOKEN exists
	if(process.env.GITHUB_TOKEN) {
		headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
	}

	const apiUrl = quality === 'stable' ? 'https://api.github.com/repos/VSCodium/vscodium/releases/latest' : 'https://api.github.com/repos/VSCodium/vscodium-insiders/releases/latest';

	console.log(`Fetching data from GitHub API: ${apiUrl}`);
	const response = await fetch(apiUrl, {
		headers,
		next: { revalidate: 3600 },
	});

	if(!response.ok) {
		const errorMessage
			= response.status === 403
				? 'GitHub API rate limit exceeded. Consider adding a GITHUB_TOKEN environment variable for higher limits.'
				: `GitHub API responded with status: ${response.status}`;

		console.warn(errorMessage);
		throw new Error(errorMessage);
	}

	const data: unknown = await response.json();
	return data as VSCodiumRelease;
}

function parseReleaseData(release: VSCodiumRelease): ParsedRelease {
	// Initialize the parsed release structure
	const parsed: ParsedRelease = {
		version: release.tag_name.replace(/-.*$/, ''),
		publishedAt: release.published_at,
		platforms: {
			windows: {
				x64: {},
				arm64: {},
			},
			macos: {
				x64: {},
				arm64: {},
			},
			linux: {
				x64: {},
				arm64: {},
				arm32: {},
				ppc64: {},
				riscv64: {},
				loong64: {},
				s390x: {},
			},
		},
	};

	// Process each asset and categorize by platform and architecture
	for(const asset of release.assets) {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const { name, browser_download_url } = asset;

		// Determine architecture
		let arch = 'x64';
		if(name.includes('arm64') || name.includes('aarch64')) {
			arch = 'arm64';
		}
		else if(name.includes('armhf') || name.includes('armv7')) {
			arch = 'arm32';
		}
		else if(name.includes('ppc64')) {
			arch = 'ppc64';
		}
		else if(name.includes('riscv64')) {
			arch = 'riscv64';
		}
		else if(name.includes('loong64')) {
			arch = 'loong64';
		}
		else if(name.includes('s390x')) {
			arch = 's390x';
		}

		if(name.endsWith('.AppImage')) {
			parsed.platforms.linux[arch as keyof typeof parsed.platforms.linux].AppImage = browser_download_url;
		}
		else if(name.endsWith('.deb')) {
			parsed.platforms.linux[arch as keyof typeof parsed.platforms.linux].deb = browser_download_url;
		}
		else if(name.endsWith('.dmg')) {
			parsed.platforms.macos[arch as keyof typeof parsed.platforms.macos].dmg = browser_download_url;
		}
		else if(name.endsWith('.exe')) {
			if(name.includes('UserSetup')) {
				parsed.platforms.windows[arch as keyof typeof parsed.platforms.windows].UserInstaller = browser_download_url;
			}
			else {
				parsed.platforms.windows[arch as keyof typeof parsed.platforms.windows].SystemInstaller = browser_download_url;
			}
		}
		else if(name.endsWith('.msi')) {
			if(!name.includes('disabled')) {
				parsed.platforms.windows[arch as keyof typeof parsed.platforms.windows].msi = browser_download_url;
			}
		}
		else if(name.endsWith('.rpm')) {
			parsed.platforms.linux[arch as keyof typeof parsed.platforms.linux].rpm = browser_download_url;
		}
		else if(name.endsWith('.tar.gz')) {
			if(name.includes('cli')) {
				if(name.includes('darwin')) {
					parsed.platforms.macos[arch as keyof typeof parsed.platforms.macos].cli = browser_download_url;
				}
				else if(name.includes('linux')) {
					parsed.platforms.linux[arch as keyof typeof parsed.platforms.linux].cli = browser_download_url;
				}
				else {
					parsed.platforms.windows[arch as keyof typeof parsed.platforms.windows].cli = browser_download_url;
				}
			}
			else if(name.includes('VSCodium-linux-')) {
				parsed.platforms.linux[arch as keyof typeof parsed.platforms.linux]['tar.gz'] = browser_download_url;
			}
		}
		else if(name.endsWith('.zip')) {
			if(name.includes('darwin')) {
				parsed.platforms.macos[arch as keyof typeof parsed.platforms.macos].zip = browser_download_url;
			}
			else {
				parsed.platforms.windows[arch as keyof typeof parsed.platforms.windows].zip = browser_download_url;
			}
		}
	}

	return parsed;
}

// Use React's cache to prevent redundant fetches during build
export const getLatestRelease = cache(async (quality: Quality): Promise<ParsedRelease> => {
	try {
		let release: VSCodiumRelease;

		// In development mode, try to use mock data
		if(USE_MOCK_DATA) {
			// Check if mock data exists
			const mockData = await readReleaseData(quality);

			if(mockData) {
				console.log(`Using mock data for VSCodium ${mockData.tag_name}`);
				release = mockData;
			}
			else {
				// If mock data doesn't exist, fetch from API
				console.log('Mock data not found, fetching from API...');
				release = await fetchFromApi(quality);

				// Try to save the fetched data as mock data for future use
				// This might fail in some environments, but we'll continue anyway
				await writeReleaseData(release, quality);
				console.log(`Created mock data file with VSCodium ${release.tag_name}`);
			}
		}
		else {
			// In production, always fetch from the API
			release = await fetchFromApi(quality);
		}

		// Parse the release data
		return parseReleaseData(release);
	}
	catch (error) {
		const isRateLimitError = (error as { message?: string }).message?.includes('rate limit');

		if(isRateLimitError) {
			console.warn('GitHub API rate limit exceeded. The site will use fallback data until the rate limit resets.');
		}
		else {
			console.error('Error fetching VSCodium release data:', error);
		}

		// Return a fallback version if the API call fails
		return {
			version: '1.99.32846', // Fallback version
			publishedAt: new Date().toISOString(),
			platforms: {
				windows: { x64: {}, arm64: {} },
				macos: { x64: {}, arm64: {} },
				linux: { x64: {}, arm64: {}, arm32: {}, ppc64: {}, riscv64: {}, loong64: {}, s390x: {} },
			},
		};
	}
});

// Helper function to get download URL for a specific platform, architecture, and installer type
export function getDownloadUrl(
	release: ParsedRelease,
	platform: 'windows' | 'macos' | 'linux',
	architecture: string,
	installerType: string,
): string {
	try {
		const platformData = release.platforms[platform];
		const archData = platformData[architecture as keyof typeof platformData];

		if(!archData) {
			throw new Error(`Architecture ${architecture} not found for platform ${platform}`);
		}

		const url = archData[installerType];

		if(!url) {
			throw new Error(`Installer type ${installerType} not found for ${platform} ${architecture}`);
		}

		return url;
	}
	catch (error) {
		console.error('Error getting download URL:', error);
		return 'https://github.com/VSCodium/vscodium/releases/latest';
	}
}
