import { Skeleton } from '@/components/ui/skeleton';

export default function DocumentationPageLoading() {
	return (
		<div className='flex-1 max-w-3xl'>
			<Skeleton className='h-12 w-3/4 mb-6' />
			<Skeleton className='h-4 w-full mb-2' />
			<Skeleton className='h-4 w-full mb-2' />
			<Skeleton className='h-4 w-3/4 mb-6' />

			<Skeleton className='h-8 w-1/2 mb-4' />
			<Skeleton className='h-4 w-full mb-2' />
			<Skeleton className='h-4 w-full mb-2' />
			<Skeleton className='h-4 w-5/6 mb-6' />

			<Skeleton className='h-8 w-1/2 mb-4' />
			<Skeleton className='h-4 w-full mb-2' />
			<Skeleton className='h-4 w-full mb-2' />
			<Skeleton className='h-4 w-4/5 mb-2' />
		</div>
	);
}
