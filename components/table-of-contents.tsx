'use client';

import { useEffect, useState } from 'react';
import type { TableOfContents, TableOfContentsItem } from '@/lib/documentation';

type TableOfContentsProperties = {
	toc: TableOfContents;
};

export function TableOfContentsNav({ toc }: TableOfContentsProperties) {
	const [activeId, setActiveId] = useState<string>('');

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for(const entry of entries) {
					if(entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				}
			},
			{ rootMargin: '0px 0px -80% 0px' },
		);

		const headings = document.querySelectorAll('h2, h3, h4');
		for(const heading of headings) {
			observer.observe(heading);
		}

		return () => {
			for(const heading of headings) {
				observer.unobserve(heading);
			}
		};
	}, []);

	const renderItems = (items: TableOfContentsItem[]) => (
		<ul className='space-y-1 text-sm'>
			{items.map((item) => (
				<li key={item.url} className={item.level > 2 ? 'ml-4' : ''}>
					<a
						href={item.url}
						className={`block py-1 ${
							activeId === item.url.slice(1)
								? 'text-primary font-medium'
								: 'text-muted-foreground hover:text-foreground'
						}`}
					>
						{item.title}
					</a>
					{item.items && renderItems(item.items)}
				</li>
			))}
		</ul>
	);

	if(toc.items.length === 0) {
		return null;
	}

	return (
		<div className='hidden xl:block'>
			<div className='sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pb-10'>
				<p className='font-medium mb-4'>On this page</p>
				{renderItems(toc.items)}
			</div>
		</div>
	);
}
