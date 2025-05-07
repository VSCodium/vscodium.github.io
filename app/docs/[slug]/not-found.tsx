import Link from 'next/link';

export default function DocumentNotFound() {
	return (
		<div className='flex-1 max-w-3xl'>
			<h1 className='text-4xl font-bold mb-6'>Documentation Not Found</h1>
			<p className='mb-6'>The documentation page you're looking for doesn't exist or has been moved.</p>
			<Link href='/docs' className='text-primary hover:underline'>
				Return to Documentation Home
			</Link>
		</div>
	);
}
