'use client';

import { Download } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { type ParsedRelease, type Quality } from '@/lib/types';

type ArchitectureSelectorProperties = {
	platform: 'windows' | 'macos' | 'linux';
	quality: Quality;
	releaseData: ParsedRelease;
};

export function ArchitectureSelector({ platform, quality, releaseData }: ArchitectureSelectorProperties) {
	const [architecture, setArchitecture] = React.useState(
		platform === 'windows' ? 'x64' : (platform === 'macos' ? 'x64' : 'x64'),
	);
	const [installerType, setInstallerType] = React.useState(
		platform === 'windows' ? 'UserInstaller' : (platform === 'macos' ? 'dmg' : 'deb'),
	);

	// Reset installer type when architecture changes (for Linux special cases)
	React.useEffect(() => {
		if(platform === 'linux') {
			if(['ppc64', 'riscv64', 'loong64'].includes(architecture)) {
				setInstallerType('tar.gz');
			}
			else if(installerType === 'deb') {
				// Default to deb for common architectures if coming from a restricted one
				setInstallerType('deb');
			}
			else {
				// Keep tar.gz if it was already selected
			}
		}
	}, [architecture, platform, installerType]);

	// Get available architectures for the current platform
	const getAvailableArchitectures = () => {
		const platformData = releaseData.platforms[platform];
		return Object.keys(platformData).filter((arch) => {
			const archData = platformData[arch as keyof typeof platformData];
			return Object.keys(archData).length > 0;
		});
	};

	// Get available installer types for the current platform and architecture
	const getAvailableInstallerTypes = () => {
		const platformData = releaseData.platforms[platform];
		const archData = platformData[architecture as keyof typeof platformData];
		return Object.keys(archData || {});
	};

	const availableArchitectures = getAvailableArchitectures();
	const availableInstallerTypes = getAvailableInstallerTypes();

	// Set default architecture and installer type based on availability
	React.useEffect(() => {
		if(availableArchitectures.length > 0 && !availableArchitectures.includes(architecture)) {
			setArchitecture(availableArchitectures[0]);
		}

		if(availableInstallerTypes.length > 0 && !availableInstallerTypes.includes(installerType)) {
			setInstallerType(availableInstallerTypes[0]);
		}
	}, [availableArchitectures, availableInstallerTypes, architecture, installerType]);

	const getDownloadFileName = () => {
		const url = getDownloadUrl();
		return url.replace(/^.*\//, '');
	};

	// Get the download URL from the release data
	const getDownloadUrl = () => {
		try {
			const platformData = releaseData.platforms[platform];
			const archData = platformData[architecture as keyof typeof platformData];
			return archData[installerType] || `https://github.com/VSCodium/vscodium/releases/tag/${releaseData.version}`;
		}
		catch {
			return `https://github.com/VSCodium/vscodium/releases/tag/${releaseData.version}`;
		}
	};

	return (
		<Card className='p-4'>
			<div className='space-y-6'>
				<div className='space-y-3'>
					<h4 className='font-medium'>1. Select Architecture</h4>
					<RadioGroup value={architecture} onValueChange={setArchitecture} className='flex flex-wrap gap-4'>
						{platform === 'windows' ? (
							<>
								{availableArchitectures.includes('x64') && (
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='x64' id='x64' />
										<Label htmlFor='x64'>x64 (64-bit)</Label>
									</div>
								)}
								{availableArchitectures.includes('arm64') && (
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='arm64' id='arm64' />
										<Label htmlFor='arm64'>ARM64</Label>
									</div>
								)}
							</>
						) : (platform === 'macos' ? (
							<>
								{availableArchitectures.includes('x64') && (
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='x64' id='mac-x64' />
										<Label htmlFor='mac-x64'>Intel (x64)</Label>
									</div>
								)}
								{availableArchitectures.includes('arm64') && (
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='arm64' id='mac-arm64' />
										<Label htmlFor='mac-arm64'>Apple Silicon (ARM64)</Label>
									</div>
								)}
							</>
						) : (
							// Linux architectures
							<>
								{availableArchitectures.includes('x64') && (
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='x64' id='linux-x64' />
										<Label htmlFor='linux-x64'>x64 (64-bit)</Label>
									</div>
								)}
								{availableArchitectures.includes('arm64') && (
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='arm64' id='linux-arm64' />
										<Label htmlFor='linux-arm64'>ARM64</Label>
									</div>
								)}
								{availableArchitectures.includes('arm32') && (
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='arm32' id='linux-arm32' />
										<Label htmlFor='linux-arm32'>ARM32</Label>
									</div>
								)}
								{availableArchitectures.includes('ppc64') && (
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='ppc64' id='linux-ppc64' />
										<Label htmlFor='linux-ppc64'>PowerPC64</Label>
									</div>
								)}
								{availableArchitectures.includes('riscv64') && (
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='riscv64' id='linux-riscv64' />
										<Label htmlFor='linux-riscv64'>RISC-V64</Label>
									</div>
								)}
								{availableArchitectures.includes('loong64') && (
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='loong64' id='linux-loong64' />
										<Label htmlFor='linux-loong64'>Loong64</Label>
									</div>
								)}
								{availableArchitectures.includes('s390x') && (
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='s390x' id='linux-s390x' />
										<Label htmlFor='linux-s390x'>System/390</Label>
									</div>
								)}
							</>
						))}
					</RadioGroup>
				</div>

				<div className='space-y-3'>
					<h4 className='font-medium'>2. Select Installer Type</h4>
					<RadioGroup
						value={installerType}
						onValueChange={setInstallerType}
						className='flex flex-wrap gap-4'
					>
						{platform === 'windows' ? (
							<>
								{availableInstallerTypes.includes('UserInstaller') && (
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='UserInstaller' id='user-installer' />
										<Label htmlFor='user-installer'>User Installer (.exe)</Label>
									</div>
								)}
								{availableInstallerTypes.includes('SystemInstaller') && (
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='SystemInstaller' id='system-installer' />
										<Label htmlFor='system-installer'>System Installer (.exe)</Label>
									</div>
								)}
								{availableInstallerTypes.includes('zip') && (
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='zip' id='zip' />
										<Label htmlFor='zip'>Portable (.zip)</Label>
									</div>
								)}
								{availableInstallerTypes.includes('msi') && (
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='msi' id='msi' />
										<Label htmlFor='msi'>Windows Installer (.msi)</Label>
									</div>
								)}
								{availableInstallerTypes.includes('cli') && (
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='cli' id='cli' />
										<Label htmlFor='cli'>CLI</Label>
									</div>
								)}
							</>
						) : (platform === 'macos' ? (
							<>
								{availableInstallerTypes.includes('dmg') && (
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='dmg' id='dmg' />
										<Label htmlFor='dmg'>Disk Image (.dmg)</Label>
									</div>
								)}
								{availableInstallerTypes.includes('zip') && (
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='zip' id='mac-zip' />
										<Label htmlFor='mac-zip'>Archive (.zip)</Label>
									</div>
								)}
								{availableInstallerTypes.includes('cli') && (
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='cli' id='cli' />
										<Label htmlFor='cli'>CLI</Label>
									</div>
								)}
							</>
						) : (
							// Linux installer types
							<>
								{availableInstallerTypes.includes('deb') && (
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='deb' id='deb' />
										<Label htmlFor='deb'>Debian/Ubuntu (.deb)</Label>
									</div>
								)}
								{availableInstallerTypes.includes('rpm') && (
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='rpm' id='rpm' />
										<Label htmlFor='rpm'>Red Hat/Fedora (.rpm)</Label>
									</div>
								)}
								{availableInstallerTypes.includes('tar.gz') && (
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='tar.gz' id='tar-gz' />
										<Label htmlFor='tar-gz'>Archive (.tar.gz)</Label>
									</div>
								)}
								{availableInstallerTypes.includes('AppImage') && (
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='AppImage' id='appimage' />
										<Label htmlFor='appimage'>AppImage</Label>
									</div>
								)}
								{availableInstallerTypes.includes('cli') && (
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='cli' id='cli' />
										<Label htmlFor='cli'>CLI</Label>
									</div>
								)}
							</>
						))}
					</RadioGroup>
				</div>

				<div className='pt-2'>
					<Button className={`w-full ${quality === 'insider' ? 'bg-[#FFA348] hover:bg-[#FFA348]/90' : ''}`} asChild>
						<Link href={getDownloadUrl()} target='_blank' rel='noopener noreferrer'>
							<Download className='mr-2 h-4 w-4' />
							Download {getDownloadFileName()}
						</Link>
					</Button>
				</div>
			</div>
		</Card>
	);
}
