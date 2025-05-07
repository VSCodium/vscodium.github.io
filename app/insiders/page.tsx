import { Code, Zap, ExternalLink, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { HeroSection } from '@/components/hero-section';
import { InstallSection } from '@/components/install-section';
import { SectionHeader } from '@/components/section-header';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getLatestRelease } from '@/lib/github';

export default async function InsidersPage() {
	const releaseData = await getLatestRelease('insider');

	return (
		<div className='flex min-h-screen flex-col'>
			<SiteHeader variant='insiders' />
			<main className='flex-1'>
				<HeroSection
					variant='insiders'
					title='VSCodium Insiders'
					subtitle='Get early access to the latest features and improvements'
					version={releaseData.version}
					badgeText='Latest Build'
					imageUrl='/vscodium-screenshot.png'
					imageAlt='VSCodium Insiders Screenshot'
				/>

				<section id='about' className='w-full py-12 md:py-24 lg:py-32 bg-muted/40'>
					<div className='container px-4 md:px-6'>
						<SectionHeader
							title='About Insiders'
							description="VSCodium Insiders provides early access to new features and improvements before they're released in the stable version."
						/>
						<div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3'>
							<Card>
								<CardHeader>
									<Sparkles className='h-10 w-10 text-[#FFA348]' />
									<CardTitle>Cutting Edge</CardTitle>
								</CardHeader>
								<CardContent>
									<p>Access the latest features and improvements as soon as they're developed.</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<Code className='h-10 w-10 text-[#FFA348]' />
									<CardTitle>Daily Builds</CardTitle>
								</CardHeader>
								<CardContent>
									<p>New builds are released daily with the latest code changes and improvements.</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<Zap className='h-10 w-10 text-[#FFA348]' />
									<CardTitle>Provide Feedback</CardTitle>
								</CardHeader>
								<CardContent>
									<p>Help shape the future of VSCodium by testing and providing feedback on new features.</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				<InstallSection
					title='Install Insiders'
					description='Download and install VSCodium Insiders on your preferred platform.'
					quality='insider'
					releaseData={releaseData}
				/>

				<section id='features' className='w-full py-12 md:py-24 lg:py-32 bg-muted/40'>
					<div className='container px-4 md:px-6'>
						<SectionHeader
							title='Insiders Features'
							description='Get early access to these upcoming features and improvements.'
						/>
						<div className='mx-auto max-w-5xl gap-8 py-12'>
							<Card>
								<CardHeader>
									<CardTitle>Important Notes</CardTitle>
								</CardHeader>
								<CardContent>
									<p className='mb-4'>
                    Insiders builds are released daily and may contain bugs or incomplete features. They are intended
                    for testing and feedback purposes.
									</p>
									<ul className='list-disc pl-5 space-y-2'>
										<li>Can be installed alongside the stable version</li>
										<li>Settings and extensions are shared with the stable version by default</li>
										<li>May be less stable than regular releases</li>
										<li>Perfect for early adopters and contributors</li>
									</ul>
								</CardContent>
								<CardFooter>
									<Button variant='outline' className='border-[#FFA348] text-[#FFA348] hover:bg-[#FFA348]/10' asChild>
										<Link href='https://github.com/VSCodium/vscodium/issues' target='_blank' rel='noopener noreferrer'>
                      Report Issues
											<ExternalLink className='ml-2 h-4 w-4' />
										</Link>
									</Button>
								</CardFooter>
							</Card>
						</div>
					</div>
				</section>
			</main>
			<SiteFooter variant='insiders' />
		</div>
	);
}
