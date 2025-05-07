import path from 'path';
import fse from 'fs-extra';
import { type Quality, type VSCodiumRelease } from '@/lib/types';

export function getReleaseDataPath(quality: Quality): string {
	return path.resolve(process.cwd(), `./cache/release-data.${quality}.json`);
}

// Helper function to read release data
export async function readReleaseData(quality: Quality): Promise<VSCodiumRelease | null> {
	const filePath = getReleaseDataPath(quality);

	if(!fse.existsSync(filePath)) {
		return null;
	}

	const data = fse.readFileSync(filePath, 'utf8');

	return JSON.parse(data) as VSCodiumRelease;
}

// Helper function to write release data
export async function writeReleaseData(data: VSCodiumRelease, quality: Quality): Promise<void> {
	const filePath = getReleaseDataPath(quality);

	// Use ensureDir instead of manual directory check and creation
	await fse.ensureDir(path.dirname(filePath));

	await fse.writeFile(filePath, JSON.stringify(data, null, 2));
}
