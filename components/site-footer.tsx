import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type SiteFooterProperties = {
	variant?: 'default' | 'insiders';
};

export function SiteFooter({ variant = 'default' }: SiteFooterProperties) {
	const isInsiders = variant === 'insiders';

	return (
		<footer className='w-full border-t py-6 md:py-0'>
			<div className='container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
				<div className='flex items-center gap-2'>
					<Image src={isInsiders ? '/vscodium-insiders-logo.svg' : '/vscodium-logo.svg'} alt='VSCodium Logo' width={24} height={24} className='h-6 w-6' />
					<p className='text-sm text-muted-foreground'>© {new Date().getFullYear()} VSCodium. CC BY-NC-SA 4.0.</p>
				</div>
				<div className='flex gap-4'>
					<Link
						href='https://github.com/VSCodium/vscodium'
						target='_blank'
						rel='noopener noreferrer'
						className='text-sm text-muted-foreground hover:text-primary'
					>
						GitHub
					</Link>
					<Link
						href='https://github.com/VSCodium/vscodium/blob/master/LICENSE'
						target='_blank'
						rel='noopener noreferrer'
						className='text-sm text-muted-foreground hover:text-primary'
					>
						License
					</Link>
					<Link
						href='/docs'
						target='_blank'
						rel='noopener noreferrer'
						className='text-sm text-muted-foreground hover:text-primary'
					>
						Documentation
					</Link>
					{
						!isInsiders
						&& <Link href='/insiders' className='flex items-center text-sm text-[#FFA348] hover:text-[#FFA348]/80'>
							<Sparkles className='mr-1 h-3 w-3' />
							Try Insiders
						</Link>
					}
				</div>
			</div>
		</footer>
	);
}
