import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { ArchitectureSelector } from '@/components/architecture-selector';
import { Command } from '@/components/command';
import { SectionHeader } from '@/components/section-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type ParsedRelease } from '@/lib/types';

type InstallSectionProperties = {
	title: string;
	description?: string;
	quality: 'stable' | 'insider';
	releaseData: ParsedRelease;
	className?: string;
};

export function InstallSection({ title, description, quality, releaseData, className }: InstallSectionProperties) {
	const isStable = quality === 'stable';

	return (
		<section id='install' className={`w-full py-12 md:py-24 lg:py-32 scroll-mt-16 ${className}`}>
			<div className='container px-4 md:px-6'>
				<SectionHeader
					title={title}
					description={description}
				/>
				<div className='mx-auto max-w-3xl py-12'>
					<Tabs defaultValue='linux' className='w-full'>
						<TabsList className='grid w-full grid-cols-3'>
							<TabsTrigger value='linux'>Linux</TabsTrigger>
							<TabsTrigger value='macos'>macOS</TabsTrigger>
							<TabsTrigger value='windows'>Windows</TabsTrigger>
						</TabsList>
						<TabsContent value='windows' className='mt-6 space-y-4'>
							<Card>
								<CardHeader>
									<CardTitle>Windows Installation</CardTitle>
									<CardDescription>Multiple installation options for Windows users</CardDescription>
								</CardHeader>
								<CardContent className='space-y-4'>
									<Tabs defaultValue='direct' className='w-full'>
										<TabsList className='w-full grid grid-cols-2 md:grid-cols-4'>
											<TabsTrigger value='direct'>Direct Download</TabsTrigger>
											<TabsTrigger value='winget'>Winget</TabsTrigger>
											<TabsTrigger value='chocolatey'>Chocolatey</TabsTrigger>
											{ quality === 'stable' && <TabsTrigger value='scoop'>Scoop</TabsTrigger> }
										</TabsList>
										<TabsContent value='direct' className='mt-4 space-y-4'>
											<div className='space-y-4'>
												<h3 className='font-medium'>Direct Download</h3>
												<p className='text-sm text-muted-foreground'>
													Download the installer directly for your architecture and distribution.
												</p>
												<ArchitectureSelector platform='windows' quality={quality} releaseData={releaseData} />
											</div>
										</TabsContent>
										<TabsContent value='winget' className='mt-4 space-y-4'>
											<div className='space-y-4'>
												<h3 className='font-medium flex items-center'>Winget</h3>
												<p className='text-sm text-muted-foreground'>
													Install our official winget with the command:
												</p>
												<Command>
													{
														quality === 'stable'
															? <>winget install -e --id VSCodium.VSCodium</>
															: <>winget install -e --id VSCodium.VSCodium.Insiders</>
													}
												</Command>
											</div>
										</TabsContent>
										<TabsContent value='chocolatey' className='mt-4 space-y-4'>
											<div className='space-y-4'>
												<h3 className='font-medium'>Chocolatey</h3>
												<p className='text-sm text-muted-foreground'>
													Install with the command:
												</p>
												<Command>
													{
														quality === 'stable'
															? <>choco install vscodium</>
															: <>choco install vscodium-insiders</>
													}
												</Command>
											</div>
										</TabsContent>
										{
											quality === 'stable'
											&& <TabsContent value='scoop' className='mt-4 space-y-4'>
												<div className='space-y-4'>
													<h3 className='font-medium'>Scoop</h3>
													<p className='text-sm text-muted-foreground'>
														Install with the command:
													</p>
													<Command>{'scoop bucket add extras\nscoop install vscodium'}</Command>
												</div>
											</TabsContent>
										}
									</Tabs>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value='macos' className='mt-6 space-y-4'>
							<Card>
								<CardHeader>
									<CardTitle>macOS Installation</CardTitle>
									<CardDescription>Multiple installation options for macOS users</CardDescription>
								</CardHeader>
								<CardContent className='space-y-4'>
									<Tabs defaultValue='direct' className='w-full'>
										<TabsList className='w-full grid grid-cols-2 md:grid-cols-4'>
											<TabsTrigger value='direct'>Direct Download</TabsTrigger>
											<TabsTrigger value='brew'>Homebrew</TabsTrigger>
											<TabsTrigger value='nix'>Nix</TabsTrigger>
										</TabsList>
										<TabsContent value='direct' className='mt-4 space-y-4'>
											<div className='space-y-4'>
												<h3 className='font-medium'>Direct Download</h3>
												<p className='text-sm text-muted-foreground'>
													Download the installer directly for your architecture and distribution.
												</p>
												<ArchitectureSelector platform='macos' quality={quality} releaseData={releaseData} />
											</div>
										</TabsContent>
										<TabsContent value='brew' className='mt-4 space-y-4'>
											<div className='space-y-4'>
												<h3 className='font-medium flex items-center'>
													Homebrew
													<Link href={isStable ? 'https://formulae.brew.sh/cask/vscodium' : 'https://formulae.brew.sh/cask/vscodium@insiders'} target='_blank' rel='noopener noreferrer'>
														<ExternalLink className='ml-2 h-4 w-4' />
													</Link>
												</h3>
												<p className='text-sm text-muted-foreground'>
													Install VSCodium with the <Link href={isStable ? 'https://formulae.brew.sh/cask/vscodium' : 'https://formulae.brew.sh/cask/vscodium@insiders'} target='_blank' rel='noopener noreferrer' className='underline'>Homebrew Formulae</Link>:
												</p>
												<Command>brew install --cask {isStable ? 'vscodium' : 'vscodium@insiders'}</Command>
											</div>
										</TabsContent>
										<TabsContent value='nix' className='mt-4 space-y-4'>
											<div className='space-y-4'>
												<h3 className='font-medium'>Nix</h3>
												<p className='text-sm text-muted-foreground'>
													Install with the command like:
												</p>
												<Command>nix-env -iA nixpkgs.vscodium</Command>
											</div>
										</TabsContent>
									</Tabs>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value='linux' className='mt-6 space-y-4'>
							<Card>
								<CardHeader>
									<CardTitle>Linux Installation</CardTitle>
									<CardDescription>Multiple installation options for Linux users</CardDescription>
								</CardHeader>
								<CardContent>
									<Tabs defaultValue='direct' className='w-full'>
										<TabsList className='w-full grid grid-cols-2 md:grid-cols-4 h-80 md:h-20'>
											<TabsTrigger value='direct'>Direct Download</TabsTrigger>
											<TabsTrigger value='flatpak'>Flatpak</TabsTrigger>
											{ isStable && <TabsTrigger value='snap'>Snap</TabsTrigger> }
											<TabsTrigger value='arch'>Arch</TabsTrigger>
											<TabsTrigger value='debian'>Debian/Ubuntu</TabsTrigger>
											<TabsTrigger value='fedora'>Fedora/RHEL</TabsTrigger>
											<TabsTrigger value='gentoo'>Gentoo/Funtoo</TabsTrigger>
											<TabsTrigger value='nix'>Nix</TabsTrigger>
										</TabsList>

										<TabsContent value='direct' className='mt-4 space-y-4'>
											<div className='space-y-4'>
												<h3 className='font-medium'>Direct Download</h3>
												<p className='text-sm text-muted-foreground'>
													Download the installer directly for your architecture and distribution.
												</p>
												<ArchitectureSelector platform='linux' quality={quality} releaseData={releaseData} />
											</div>
										</TabsContent>

										<TabsContent value='flatpak' className='mt-4 space-y-4'>
											<div className='space-y-4'>
												<h3 className='font-medium flex items-center'>
													Flatpak
													<Link href={isStable ? 'https://flathub.org/apps/com.vscodium.codium' : 'https://flathub.org/apps/com.vscodium.codium-insiders'} target='_blank' rel='noopener noreferrer'>
														<ExternalLink className='ml-2 h-4 w-4' />
													</Link>
												</h3>
												<p className='text-sm text-muted-foreground'>
													Install <Link href={isStable ? 'https://flathub.org/apps/com.vscodium.codium' : 'https://flathub.org/apps/com.vscodium.codium-insiders'} target='_blank' rel='noopener noreferrer' className='underline'>our official flatpak</Link> with the command:
												</p>
												<Command>flatpak install flathub {isStable ? 'com.vscodium.codium' : 'com.vscodium.codium-insiders'}</Command>
											</div>
										</TabsContent>

										{
											isStable
											&& <TabsContent value='snap' className='mt-4 space-y-4'>
												<div className='space-y-4'>
													<h3 className='font-medium flex items-center'>
														Snap
														<Link href='https://snapcraft.io/codium' target='_blank' rel='noopener noreferrer'>
															<ExternalLink className='ml-2 h-4 w-4' />
														</Link>
													</h3>
													<p className='text-sm text-muted-foreground'>
														Install <Link href='https://snapcraft.io/codium' target='_blank' rel='noopener noreferrer' className='underline'>our official snap</Link> with the command:
													</p>
													<Command>snap install codium --classic</Command>
												</div>
											</TabsContent>
										}

										<TabsContent value='arch' className='mt-4 space-y-4'>
											<div className='space-y-4'>
												<h3 className='font-medium flex items-center'>
													Arch
													<Link href={isStable ? 'https://aur.archlinux.org/packages/vscodium-bin' : 'https://aur.archlinux.org/packages/vscodium-insiders-bin'} target='_blank' rel='noopener noreferrer'>
														<ExternalLink className='ml-2 h-4 w-4' />
													</Link>
												</h3>
												<p className='text-sm text-muted-foreground'>
													Install VSCodium from the <Link href={isStable ? 'https://aur.archlinux.org/packages/vscodium-bin' : 'https://aur.archlinux.org/packages/vscodium-insiders-bin'} target='_blank' rel='noopener noreferrer' className='underline'>AUR</Link> with your preferred AUR helper like:
												</p>
												<Command>yay -S {isStable ? 'vscodium-bin' : 'vscodium-insiders-bin'}</Command>
											</div>
										</TabsContent>

										<TabsContent value='debian' className='mt-4 space-y-4'>
											<div className='space-y-4'>
												<h3 className='font-medium'>Debian/Ubuntu Repository</h3>
												<p className='text-sm text-muted-foreground'>
													Add the VSCodium repository to your system and install via apt.
												</p>
												<div className='space-y-2'>
													<h4 className='text-sm font-medium'>1. Add the GPG key</h4>
													<Command>{'curl -fsSL https://repo.vscodium.dev/vscodium.gpg \\\n| gpg --dearmor \\\n| sudo dd of=/usr/share/keyrings/vscodium.gpg'}</Command>
												</div>
												<div className='space-y-2'>
													<h4 className='text-sm font-medium'>2. Add the repository</h4>
													<Command>sudo curl --output-dir /etc/apt/sources.list.d -LO https://repo.vscodium.dev/vscodium.list</Command>
												</div>
												<div className='space-y-2'>
													<h4 className='text-sm font-medium'>3. Update and install</h4>
													<Command>sudo apt update && sudo apt install codium</Command>
												</div>
											</div>
										</TabsContent>

										<TabsContent value='fedora' className='mt-4 space-y-4'>
											<div className='space-y-4'>
												<h3 className='font-medium'>Fedora/RHEL</h3>
												<p className='text-sm text-muted-foreground'>
													Add the VSCodium repository to your system and install via dnf/yum.
												</p>
												<div className='space-y-2'>
													<h4 className='text-sm font-medium'>1. Add the repository</h4>
													<Command>sudo curl --output-dir /etc/yum.repos.d -LO https://repo.vscodium.dev/vscodium.repo</Command>
												</div>
												<div className='space-y-2'>
													<h4 className='text-sm font-medium'>2. Install VSCodium</h4>
													<Command>sudo dnf install codium</Command>
												</div>
											</div>
										</TabsContent>

										<TabsContent value='gentoo' className='mt-4 space-y-4'>
											<div className='space-y-4'>
												<h3 className='font-medium'>Funtoo</h3>
												<p className='text-sm text-muted-foreground'>
													Install with the command:
												</p>
												<Command>sudo emerge -av vscodium-bin</Command>
											</div>
											<div className='space-y-4'>
												<h3 className='font-medium'>Gentoo</h3>
												<p className='text-sm text-muted-foreground'>
													Install with the command:
												</p>
												<Command>sudo emerge -av vscodium</Command>
											</div>
										</TabsContent>

										<TabsContent value='nix' className='mt-4 space-y-4'>
											<div className='space-y-4'>
												<h3 className='font-medium'>NixOS</h3>
												<p className='text-sm text-muted-foreground'>
													Install with the command like:
												</p>
												<Command>nix-env -iA nixos.vscodium</Command>
											</div>
											<div className='space-y-4'>
												<h3 className='font-medium'>Non NixOS</h3>
												<p className='text-sm text-muted-foreground'>
													Install with the command like:
												</p>
												<Command>nix-env -iA nixpkgs.vscodium</Command>
											</div>
										</TabsContent>
									</Tabs>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</section>
	);
}
