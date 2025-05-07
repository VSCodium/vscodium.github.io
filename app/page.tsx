import { Code, Shield, Zap, ExternalLink, Github, Blocks, Cpu, Server } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { HeroSection } from '@/components/hero-section';
import { InstallSection } from '@/components/install-section';
import { SectionHeader } from '@/components/section-header';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getLatestRelease } from '@/lib/github';

export default async function Home() {
	// Fetch the latest release data at build time
	const releaseData = await getLatestRelease('stable');

	return (
		<div className='flex min-h-screen flex-col'>
			<SiteHeader />
			<main className='flex-1'>
				<HeroSection
					title='Free & Open Source Code Editor'
					subtitle="VSCodium is a community-driven, freely-licensed binary distribution of Microsoft's Visual Studio Code without telemetry and tracking."
					version={releaseData.version}
					imageUrl='/vscodium-screenshot.png'
					imageAlt='VSCodium Editor Screenshot'
				/>

				<section id='why' className='w-full py-12 md:py-24 lg:py-32 bg-muted/40'>
					<div className='container px-4 md:px-6'>
						<SectionHeader
							title='Why Does This Exist'
							description='Experience all the powerful features of  Visual Studio Code without the privacy concerns.'
						/>
						<div className='mx-auto max-w-5xl py-12'>
							<Card>
								<CardContent className='m-12'>
									<p>
										Microsoft's <code className='language-plaintext highlighter-rouge'>vscode</code> source code is open source (MIT-licensed), but the product available for download (Visual Studio Code) is licensed under <Link href='https://code.visualstudio.com/license' target='_blank' rel='noopener noreferrer' className='underline'>this not-FLOSS license</Link> and contains telemetry/tracking. According to <Link href='https://github.com/Microsoft/vscode/issues/60#issuecomment-161792005' target='_blank' rel='noopener noreferrer' className='underline'>this comment</Link> from a Visual Studio Code maintainer:
									</p>
									<blockquote className='m-6 border-l-2 pl-6 italic text-muted-foreground'>
										<p>When we [Microsoft] build Visual Studio Code, we do exactly this. We clone the vscode repository, we lay down a customized product.json that has Microsoft specific functionality (telemetry, gallery, logo, etc.), and then produce a build that we release under our license.</p>
										<p>When you clone and build from the vscode repo, none of these endpoints are configured in the default product.json. Therefore, you generate a “clean” build, without the Microsoft customizations, which is by default licensed under the MIT license</p>
									</blockquote>
									<p>The VSCodium project exists so that you don't have to download+build from source. This project includes special build scripts that clone Microsoft's vscode repo, apply patches, run the build commands, and upload the resulting binaries for you to <Link href='https://github.com/VSCodium/vscodium/releases' target='_blank' rel='noopener noreferrer' className='underline'>GitHub releases</Link>. <strong>These binaries are licensed under the MIT license. Telemetry is disabled.</strong></p>
									<p className='mt-6'>If you want to build from source yourself, head over to <Link href='https://github.com/Microsoft/vscode' target='_blank' rel='noopener noreferrer' className='underline'>Microsoft’s vscode repo</Link> and follow their <Link href='https://github.com/Microsoft/vscode/wiki/How-to-Contribute#build-and-run' target='_blank' rel='noopener noreferrer' className='underline'>instructions</Link>. VSCodium exists to make it easier to get the latest version of MIT-licensed Visual Studio Code.</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				<section id='info' className='w-full py-12 md:py-24 lg:py-32'>
					<div className='container px-4 md:px-6'>
						<SectionHeader
							title='More Information'
							description='Learn more about VSCodium and what makes it a great choice for developers.'
						/>
						<div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3'>
							<Card>
								<CardHeader>
									<Shield className='h-10 w-10 text-primary' />
									<CardTitle>Privacy Focused</CardTitle>
								</CardHeader>
								<CardContent>
									<p>No telemetry, tracking or Microsoft branding. Your code stays private and secure.</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<Code className='h-10 w-10 text-primary' />
									<CardTitle>Open Source</CardTitle>
								</CardHeader>
								<CardContent>
									<p>Truly open source under the MIT license, with a transparent development, build and release processes.</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<Zap className='h-10 w-10 text-primary' />
									<CardTitle>Feature Complete</CardTitle>
								</CardHeader>
								<CardContent>
									<p>All the powerful features of Visual Studio Code without the proprietary elements.</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<Blocks className='h-10 w-10 text-primary' />
									<CardTitle>Extensions</CardTitle>
								</CardHeader>
								<CardContent>
									<p>For extensions, VSCodium uses <Link
										href='https://open-vsx.org/'
										target='_blank'
										rel='noopener noreferrer'
									>
										Open VSX Registry
									</Link>, an open-source marketplace supported by the Eclipse Foundation.</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<Cpu className='h-10 w-10 text-primary' />
									<CardTitle>More Architectures</CardTitle>
								</CardHeader>
								<CardContent>
									<p>VSCodium supports a wider range of architectures like PowerPC64, RISC-V64, Loong64 or System/390.</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<Server className='h-10 w-10 text-primary' />
									<CardTitle>Servers</CardTitle>
								</CardHeader>
								<CardContent>
									<p>All components are availble to run VSCodium on a server for remote coding (Remote Host) or coding on the web (Web Host).</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				<InstallSection
					title='Installation'
					description='Download and install VSCodium on your preferred platform.'
					quality='stable'
					releaseData={releaseData}
					className='bg-muted/40'
				/>

				<section id='community' className='w-full py-12 md:py-24 lg:py-32'>
					<div className='container px-4 md:px-6'>
						<SectionHeader
							title='Join the Community'
							description='Get involved with VSCodium development and connect with other users.'
						/>
						<div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2'>
							<Card>
								<CardHeader>
									<CardTitle>GitHub</CardTitle>
								</CardHeader>
								<CardContent>
									<p>Contribute to the project, report issues, or submit feature requests on GitHub.</p>
								</CardContent>
								<CardFooter>
									<Button asChild>
										<Link href='https://github.com/VSCodium/vscodium' target='_blank' rel='noopener noreferrer'>
											<Github className='mr-2 h-4 w-4' />
											Visit Repository
										</Link>
									</Button>
								</CardFooter>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Documentation</CardTitle>
								</CardHeader>
								<CardContent>
									<p>Read the comprehensive documentation to learn more about VSCodium features and configuration.</p>
								</CardContent>
								<CardFooter>
									<Button asChild>
										<Link href='/docs'>
											<ExternalLink className='mr-2 h-4 w-4' />
											View Docs
										</Link>
									</Button>
								</CardFooter>
							</Card>
						</div>
					</div>
				</section>

				<section id='special-thanks' className='w-full py-12 md:py-24 lg:py-32 bg-muted/40'>
					<div className='container px-4 md:px-6'>
						<SectionHeader title='Special Thanks' />
						<div className='mx-auto max-w-4xl py-12'>
							<div className='overflow-hidden rounded-lg border bg-card text-card-foreground shadow'>
								<table className='w-full'>
									<tbody>
										<tr className='border-b border-border'>
											<td className='p-4 font-medium'>
												<Link href='https://github.com/daiyam' className='hover:text-primary'>
													@daiyam
												</Link>
											</td>
											<td className='p-4'>for macOS certificate</td>
										</tr>
										<tr className='border-b border-border bg-muted/50'>
											<td className='p-4 font-medium'>
												<Link href='https://github.com/jaredreich' className='hover:text-primary'>
													@jaredreich
												</Link>
											</td>
											<td className='p-4'>for the logo</td>
										</tr>
										<tr className='border-b border-border'>
											<td className='p-4 font-medium dark:bg-white'>
												<div className='flex items-center'>
													<Image
														src='https://images.prismic.io/macstadium/66fbce64-707e-41f3-b547-241908884716_MacStadium_Logo.png?w=128&q=75'
														alt='MacStadium Logo'
														width={128}
														height={49}
													/>
												</div>
											</td>
											<td className='p-4'>for providing a Mac mini M1</td>
										</tr>
										<tr className='border-b border-border bg-muted/50'>
											<td className='p-4 font-medium'>
												<Link href='https://github.com/PalinuroSec' className='hover:text-primary'>
													@PalinuroSec
												</Link>
											</td>
											<td className='p-4'>for CDN and domain name</td>
										</tr>
										<tr className='border-b border-border'>
											<td className='p-4 font-medium dark:bg-white'>
												<div className='flex items-center'>
													<Image
														src='/signpath-logo.svg'
														alt='SignPath Logo'
														width={128}
														height={26}
													/>
												</div>
											</td>
											<td className='p-4'>
												free code signing on Windows provided by{' '}
												<Link href='https://signpath.io' className='text-primary hover:underline'>
													SignPath.io
												</Link>
												, certificate by{' '}
												<Link href='https://signpath.org' className='text-primary hover:underline'>
													SignPath Foundation
												</Link>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</section>
			</main>
			<SiteFooter />
		</div>
	);
}
