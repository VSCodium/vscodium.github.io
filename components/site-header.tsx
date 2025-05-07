'use client';

import { Download, Github, Sparkles, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

type SiteHeaderProperties = {
	variant?: 'default' | 'insiders';
};

export function SiteHeader({ variant = 'default' }: SiteHeaderProperties) {
	const isInsiders = variant === 'insiders';
	const accentColor = isInsiders ? '[#FFA348]' : 'primary';

	return (
		<header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='container flex h-16 items-center justify-between'>
				<div className='flex items-center gap-2'>
					<Link href='/' className='flex items-center gap-2'>
						<Image src={isInsiders ? '/vscodium-insiders-logo.svg' : '/vscodium-logo.svg'} alt='VSCodium Logo' width={36} height={36} className='h-9 w-9' />
						<span className='text-xl font-bold'>VSCodium</span>
					</Link>
					{isInsiders && <Badge className='ml-2 bg-[#FFA348] hover:bg-[#FFA348]/80'>Insiders</Badge>}
				</div>

				{/* Desktop Navigation */}
				<nav className='hidden md:flex gap-6'>
					<Link href='/' className={`text-sm font-medium transition-colors hover:text-${accentColor}`}>
						Home
					</Link>
					<Link href='/docs' className={`text-sm font-medium transition-colors hover:text-${accentColor}`}>
						Documentation
					</Link>
					{
						!isInsiders
						&& <Link
							href='/insiders'
							className='text-sm font-medium flex items-center text-[#FFA348] hover:text-[#FFA348]/80'
						>
							<Sparkles className='mr-1 h-3 w-3' />
							Try Insiders
						</Link>
					}
				</nav>

				{/* Mobile Navigation */}
				<div className='md:hidden'>
					<Sheet>
						<SheetTrigger asChild>
							<Button variant='ghost' size='icon'>
								<Menu className='h-5 w-5' />
								<span className='sr-only'>Toggle menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side='right'>
							<div className='flex flex-col gap-4 mt-8'>
								<Link href='/' className='text-base font-medium'>
									Home
								</Link>
								<Link href='/docs' className='text-base font-medium'>
									Documentation
								</Link>
								{
									!isInsiders
									&& <Link href='/insiders' className='text-base font-medium flex items-center text-[#FFA348]'>
										<Sparkles className='mr-1 h-3 w-3' />
										Try Insiders
									</Link>
								}
							</div>
							<div className='mt-4'>
								<ThemeToggle variant='mobile'/>
							</div>
						</SheetContent>
					</Sheet>
				</div>

				<div className='hidden md:flex items-center gap-2'>
					<ThemeToggle />
					<Button variant='outline' size='sm' asChild>
						<Link href='https://github.com/VSCodium/vscodium' target='_blank' rel='noopener noreferrer'>
							<Github className='mr-2 h-4 w-4' />
							GitHub
						</Link>
					</Button>
					<Button size='sm' className={isInsiders ? 'bg-[#FFA348] hover:bg-[#FFA348]/90' : ''} asChild>
						<Link href={isInsiders ? '/insiders#install' : '/#install'}>
							<Download className='mr-2 h-4 w-4' />
							Install
						</Link>
					</Button>
				</div>
			</div>
		</header>
	);
}
