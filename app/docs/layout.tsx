import type { ReactNode } from 'react';
import { DocumentationSidebar } from '@/components/documentation-sidebar';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getDocumentationPagesWithSections } from '@/lib/documentation';

type DocumentationLayoutProperties = {
	children: ReactNode;
};

export default async function DocumentationLayout({ children }: DocumentationLayoutProperties) {
	// Get all doc pages with their sections
	const pages = await getDocumentationPagesWithSections();

	return (
		<div className='flex min-h-screen flex-col'>
			<SiteHeader />
			<main className='flex-1 container py-12'>
				<div className='flex flex-col md:flex-row gap-12'>
					<DocumentationSidebar pages={pages} />
					{children}
				</div>
			</main>
			<SiteFooter />
		</div>
	);
}
