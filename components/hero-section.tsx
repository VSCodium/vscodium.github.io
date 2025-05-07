import { Download, Github, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type HeroSectionProperties = {
	variant?: 'default' | 'insiders';
	title: string;
	subtitle: string;
	version?: string;
	badgeText?: string;
	imageUrl: string;
	imageAlt: string;
};

export function HeroSection({
	variant = 'default',
	title,
	subtitle,
	version,
	badgeText = 'MIT License',
	imageUrl,
	imageAlt,
}: HeroSectionProperties) {
	const isInsiders = variant === 'insiders';
	const bgClass = isInsiders ? 'bg-gradient-to-b from-[#FFA348]/10 to-background' : 'bg-gradient-to-b from-[#62A0EA]/10 to-background';

	return (
		<section className={`w-full py-12 md:py-24 lg:py-32 xl:py-48 ${bgClass}`}>
			<div className='container px-4 md:px-6'>
				<div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
					<div className='flex flex-col justify-center space-y-4'>
						<div className='space-y-2'>
							{version && (
								<Badge variant='outline' className='w-fit'>
									<span className='bg-primary/10 text-primary px-1.5 py-0.5 rounded-full mr-2'>New</span>
									<span>v{version} now available</span>
								</Badge>
							)}
							<h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
								{isInsiders ? (
									<>
										{title.split(' ')[0]} <span className='text-[#FFA348]'>{title.split(' ')[1]}</span>
									</>
								) : (
									title
								)}
							</h1>
							<p className='max-w-[600px] text-muted-foreground md:text-xl'>{subtitle}</p>
						</div>
						<div className='flex flex-col gap-2 min-[400px]:flex-row'>
							<Button size='lg' className={isInsiders ? 'bg-[#FFA348] hover:bg-[#FFA348]/90' : ''} asChild>
								<Link href='#install'>
									<Download className='mr-2 h-5 w-5' />
									{isInsiders ? 'Install Insiders' : 'Install Now'}
								</Link>
							</Button>
							<Button variant='outline' size='lg' asChild>
								<Link href={isInsiders ? '#about' : '#why'}>Learn More</Link>
							</Button>
						</div>
						<div className='flex items-center gap-2 text-sm text-muted-foreground'>
							{isInsiders ? (
								<>
									<Badge variant='secondary'>Daily Builds</Badge>
									<Badge variant='secondary'>Experimental Features</Badge>
								</>
							) : (
								<>
									<Badge variant='secondary'>{badgeText}</Badge>
									<Link href='https://github.com/VSCodium/vscodium' className='flex items-center hover:text-primary' target='_blank'>
										<Github className='mr-1 h-3 w-3' />
                    GitHub
									</Link>
									<Link href='/insiders' className='flex items-center text-[#FFA348] hover:text-[#FFA348]/80'>
										<Sparkles className='mr-1 h-3 w-3' />
                    Try Insiders
									</Link>
								</>
							)}
						</div>
					</div>
					<div className='mx-auto w-full max-w-[600px] rounded-lg border bg-background p-2 shadow-lg'>
						{isInsiders ? (
							<div className='relative rounded-md overflow-hidden'>
								<div className='absolute top-0 right-0 bg-[#FFA348] text-white px-3 py-1 rounded-bl-md font-medium z-10'>
                  Insiders
								</div>
								<Image
									src={imageUrl || '/placeholder.svg'}
									alt={imageAlt}
									width={600}
									height={400}
									className='rounded-md object-cover'
								/>
							</div>
						) : (
							<Image
								src={imageUrl || '/placeholder.svg'}
								alt={imageAlt}
								width={600}
								height={400}
								className='rounded-md object-cover'
							/>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
