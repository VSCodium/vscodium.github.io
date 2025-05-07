import type { Metadata } from 'next';
import { DocumentationContent } from '@/components/documentation-content';
import { getDocumentationPage } from '@/lib/documentation';

export async function generateMetadata(): Promise<Metadata> {
	const documentationPage = await getDocumentationPage('index.md');

	return {
		title: `${documentationPage.metadata.title} - VSCodium`,
		description: documentationPage.metadata.description,
	};
}

export default async function DocumentationPage() {
	const documentationPage = await getDocumentationPage('index.md');

	return (
		<>
			<div className='flex-1 max-w-3xl'>
				<DocumentationContent html={documentationPage.content} />
			</div>
		</>
	);
}
