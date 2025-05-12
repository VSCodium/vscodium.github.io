'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { DocumentationPageInfo } from '@/lib/documentation';

type DocumentationSidebarProperties = {
	pages: DocumentationPageInfo[];
};

export function DocumentationSidebar({ pages }: DocumentationSidebarProperties) {
	const pathname = usePathname();
	const [expandedPages, setExpandedPages] = useState<Record<string, boolean>>({});

	// Determine the current page slug from the pathname
	const currentSlug = pathname === '/docs' ? 'index' : pathname.replace('/docs/', '');

	// Initialize expanded state based on current page
	useEffect(() => {
		setExpandedPages((previous) => ({
			...previous,
			[currentSlug]: true,
		}));
	}, [currentSlug]);

	const togglePage = (slug: string) => {
		setExpandedPages((previous) => ({
			...previous,
			[slug]: !previous[slug],
		}));
	};

	return (
		<aside className='w-full md:w-64 shrink-0'>
			<nav className='sticky top-24 space-y-1 pr-2 max-h-[calc(100vh-8rem)] overflow-y-auto pb-10'>
				<ul className='space-y-1'>
					{pages.map((page) => {
						const isCurrentPage = currentSlug === page.slug;
						const isExpanded = expandedPages[page.slug] ?? isCurrentPage;
						const hasSections = page.sections.length > 0;

						return (
							<li key={page.slug} className='space-y-1'>
								<div className='flex items-center'>
									{hasSections && (
										<button
											onClick={() => togglePage(page.slug)}
											className='mr-1 p-1 rounded-md hover:bg-muted/50'
											aria-label={isExpanded ? 'Collapse sections' : 'Expand sections'}
										>
											{isExpanded ? <ChevronDown className='h-4 w-4' /> : <ChevronRight className='h-4 w-4' />}
										</button>
									)}
									<Link
										href={page.slug === 'index' ? '/docs' : `/docs/${page.slug}`}
										className={`flex-grow p-2 rounded-md ${
											isCurrentPage ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'
										}`}
									>
										{page.title}
									</Link>
								</div>

								{/* Page sections */}
								{isExpanded && hasSections && (
									<ul className='ml-6 space-y-1 mt-1'>
										{page.sections.map((section) => {
											// Only show h2 sections in the sidebar to avoid clutter
											if(section.level > 2) {
												return null;
											}

											const sectionUrl = section.slug ? (page.slug === 'index' ? `/docs#${section.slug}` : `/docs/${page.slug}#${section.slug}`) : section.url!;

											return (
												<li key={`${page.slug}-${section.slug}`}>
													<Link
														href={sectionUrl}
														className={`block p-2 rounded-md text-sm ${
															isCurrentPage
																? 'text-muted-foreground hover:text-primary'
																: 'text-muted-foreground hover:text-foreground'
														}`}
													>
														{section.title}
													</Link>
												</li>
											);
										})}
									</ul>
								)}
							</li>
						);
					})}
				</ul>
			</nav>
		</aside>
	);
}
