import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocumentationContent } from '@/components/documentation-content';
import { getDocumentationPage, getDocumentationPages } from '@/lib/documentation';

type DocumentationPageProperties = {
	params: {
		slug: string;
	};
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams() {
	const documentFiles = await getDocumentationPages();

	return documentFiles
		.filter((filename) => filename !== 'index.md')
		.map((filename) => ({
			slug: filename.replace('.md', ''),
		}));
}

export async function generateMetadata({ params }: DocumentationPageProperties): Promise<Metadata> {
	// eslint-disable-next-line @typescript-eslint/await-thenable
	const { slug } = await params;

	try {
		const documentationPage = await getDocumentationPage(`${slug}.md`);

		return {
			title: `${documentationPage.metadata.title} - VSCodium`,
			description: documentationPage.metadata.description,
		};
	}
	catch {
		return {
			title: 'Documentation Not Found - VSCodium',
			description: 'The requested documentation page could not be found.',
		};
	}
}

export default async function DocumentationPage({ params }: DocumentationPageProperties) {
	// eslint-disable-next-line @typescript-eslint/await-thenable
	const { slug } = await params;

	try {
		const documentationPage = await getDocumentationPage(`${slug}.md`);

		return (
			<>
				<div className='flex-1 max-w-3xl'>
					<DocumentationContent html={documentationPage.content} />
				</div>
			</>
		);
	}
	catch {
		notFound();
	}
}
