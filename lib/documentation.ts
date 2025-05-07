import path from 'path';
import fse from 'fs-extra';
import { toString } from 'mdast-util-to-string';
import { cache } from 'react';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';
import slugify from 'slugify';
import { visit } from 'unist-util-visit';

export type DocumentationPage = {
	content: string;
	sections: DocumentationSection[];
	metadata: {
		title: string;
		description?: string;
		order?: number;
	};
};

export type TableOfContentsItem = {
	title: string;
	url: string;
	items?: TableOfContentsItem[];
	level: number;
};

export type TableOfContents = {
	items: TableOfContentsItem[];
};

export type DocumentationSection = {
	title: string;
	slug: string;
	level: number;
};

export type DocumentationPageInfo = {
	title: string;
	slug: string;
	description?: string;
	order?: number;
	sections: DocumentationSection[];
};

// Function to extract title from markdown content
function extractTitle(content: string): string {
	const titleMatch = /^#\s+(.*)$/m.exec(content);
	// return titleMatch ? titleMatch[1] : "Documentation"
	if(titleMatch) {
		return titleMatch[1];
	}
	else {
		return '';
	}
}

// Function to extract description from markdown content
function extractDescription(content: string): string | undefined {
	const lines = content.split('\n');
	for(let i = 0; i < lines.length; i++) {
		if(lines[i].startsWith('# ')) {
			// Look for the first paragraph after the title
			for(let j = i + 1; j < lines.length; j++) {
				const line = lines[j].trim();
				if(line && !line.startsWith('#')) {
					return line;
				}
			}
		}
	}

	return undefined;
}

// Function to extract metadata from markdown content
function extractMetadata(content: string): { order?: number } {
	const metadata: { order?: number } = {};

	// Look for metadata in HTML comments at the top of the file
	// Format: <!-- order: 10 -->
	const metadataRegex = /<!--\s*(\w+):\s*(.*?)\s*-->/g;
	let match;

	while((match = metadataRegex.exec(content)) !== null) {
		const [, key, value] = match;
		if(key === 'order') {
			metadata.order = Number.parseInt(value, 10);
		}
	}

	return metadata;
}

// Function to extract sections (h2 headings) from markdown content
function extractSections(content: string): DocumentationSection[] {
	const sections: DocumentationSection[] = [];
	const headingRegex = /^(#{2,3})\s+(?:<a id="([\w-]+)"><\/a>)?(.*)$/gm;
	let match;

	while((match = headingRegex.exec(content)) !== null) {
		let [, hashes, slug, title] = match;
		const level = hashes.length;

		// Only include h2 and h3
		if(level <= 3 && title !== 'Table of Contents') {
			slug ||= slugify(title, { lower: true });

			sections.push({
				title,
				slug,
				level,
			});
		}
	}

	return sections;
}

// Custom plugin to generate TOC with proper slugs
function remarkTocWithSlugs() {
	return (tree: any) => {
		const toc: TableOfContents = { items: [] };
		let currentLevel1: TableOfContentsItem | null = null;
		let currentLevel2: TableOfContentsItem | null = null;

		visit(tree, 'heading', (node: any) => {
			if(node.depth > 3) {
				return;
			} // Only include h1, h2, h3

			let text: string;
			let slug: string;

			if(node.children[0].type === 'html') {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
				slug = node.children[0].value.replace(/<a id="([\w-]+)">/, '$1');

				while(node.children[0].type === 'html') {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-call
					node.children.shift();
				}

				text = toString(node);
			}
			else {
				text = toString(node);
				slug = slugify(text, { lower: true });
			}

			const url = `#${slug}`;

			// Add id to the heading node for linking
			node.data ??= {};
			node.data.hProperties ??= {};
			node.data.hProperties.id = slug;
			node.data.hProperties.class = 'scroll-mt-16';

			const item: TableOfContentsItem = {
				title: text,
				url,
				level: node.depth as number,
			};

			if(node.depth === 1) {
				toc.items.push(item);
				currentLevel1 = item;
				currentLevel2 = null;
			}
			else if(node.depth === 2) {
				if(currentLevel1) {
					currentLevel1.items ??= [];
					currentLevel1.items.push(item);
					currentLevel2 = item;
				}
				else {
					toc.items.push(item);
					currentLevel2 = item;
				}
			}
			else if(node.depth === 3) {
				if(currentLevel2) {
					currentLevel2.items ??= [];
					currentLevel2.items.push(item);
				}
				else if(currentLevel1) {
					currentLevel1.items ??= [];
					currentLevel1.items.push(item);
				}
				else {
					toc.items.push(item);
				}
			}
		});

		// Store the TOC in the tree data
		tree.data ??= {};
		tree.data.toc = toc;
	};
}

// Custom plugin to remove "Table of Contents" section
function remarkRemoveTableOfContents() {
	return (tree: any) => {
		visit(tree, 'heading', (node: any, index: number, parent: any) => {
			if(toString(node) === 'Table of Contents') {
				if(parent.children[0].type === 'heading') {
					return;
				}

				// Find the next heading to determine where the TOC section ends
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				let endIndex = parent.children.length;
				for(let i = index + 1; i < parent.children.length; i++) {
					if(parent.children[i].type === 'heading') {
						endIndex = i;
						break;
					}
				}

				// Remove the TOC heading and all content until the next heading
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
				parent.children.splice(index, endIndex - index);

				return [visit.SKIP, index];
			}
		});
	};
}

// Function to fetch and process markdown content
export const getDocumentationPage = cache(async (markdownFile: string): Promise<DocumentationPage> => {
	const filePath = path.resolve(process.cwd(), `./cache/${markdownFile}`);
	let content;

	if(fse.existsSync(filePath)) {
		content = fse.readFileSync(filePath, 'utf8');
	}
	else {
		try {
			const headers: Record<string, string> = {
				Accept: 'application/vnd.github.v3.raw',
			};

			// Only add the Authorization header if GITHUB_TOKEN exists
			if(process.env.GITHUB_TOKEN) {
				headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
			}

			const response = await fetch(`https://api.github.com/repos/VSCodium/vscodium/contents/docs/${markdownFile}`, {
				headers,
				next: { revalidate: 3600 }, // Revalidate every hour
			});

			if(!response.ok) {
				const errorMessage
					= response.status === 403
						? 'GitHub API rate limit exceeded. Consider adding a GITHUB_TOKEN environment variable for higher limits.'
						: `GitHub API responded with status: ${response.status}`;

				console.warn(errorMessage);
				throw new Error(errorMessage);
			}

			content = await response.text();

			await fse.ensureDir(path.dirname(filePath));
			await fse.writeFile(filePath, content);
		}
		catch (error) {
			console.error(`Error fetching doc page ${markdownFile}:`, error);

			// Return a fallback page
			return {
				content: '<h1>Documentation Unavailable</h1><p>We couldn\'t load the documentation. Please try again later or check the <a href="https://github.com/VSCodium/vscodium/tree/master/docs">GitHub repository</a>.</p>',
				sections: [],
				metadata: {
					title: 'Documentation Unavailable',
					description: 'We couldn\'t load the documentation. Please try again later.',
				},
			};
		}
	}

	content = content.replaceAll(/https:\/\/github.com\/VSCodium\/vscodium\/blob\/master\/docs\/([\w-]+)\.md/g, '/docs/$1');

	// Extract metadata
	const title = extractTitle(content);
	const description = extractDescription(content);
	const { order } = extractMetadata(content);

	// Process markdown
	const processor = remark()
		.use(remarkGfm) // GitHub Flavored Markdown
		.use(remarkRemoveTableOfContents) // Remove "Table of Contents" section
		.use(remarkTocWithSlugs) // Custom TOC plugin
		.use(html, { sanitize: false }); // Convert to HTML

	const result = await processor.process(content);
	const htmlContent = result.toString();

	// Extract sections from the content
	const sections = extractSections(content);

	return {
		content: htmlContent,
		sections,
		metadata: {
			title,
			description,
			order,
		},
	};
});

// Function to get all available doc pages
export const getDocumentationPages = cache(async (): Promise<string[]> => {
	const filePath = path.resolve(process.cwd(), './cache/pages.json');

	if(fse.existsSync(filePath)) {
		const data = fse.readFileSync(filePath, 'utf8');

		return JSON.parse(data) as string[];
	}
	else {
		try {
			const headers: Record<string, string> = {
				Accept: 'application/vnd.github.v3+json',
			};

			if(process.env.GITHUB_TOKEN) {
				headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
			}

			const response = await fetch('https://api.github.com/repos/VSCodium/vscodium/contents/docs', {
				headers,
				next: { revalidate: 3600 },
			});

			if(!response.ok) {
				throw new Error(`GitHub API responded with status: ${response.status}`);
			}

			const files = await response.json() as Array<{ name: string }>;
			const markdowns = files.filter((file) => file.name.endsWith('.md')).map((file) => file.name);

			await fse.ensureDir(path.dirname(filePath));
			await fse.writeFile(filePath, JSON.stringify(markdowns, null, 2));

			return markdowns;
		}
		catch (error) {
			console.error('Error fetching doc pages:', error);
			return [];
		}
	}
});

// Function to get all doc pages with their sections
export const getDocumentationPagesWithSections = cache(async (): Promise<DocumentationPageInfo[]> => {
	const documentFiles = await getDocumentationPages();

	// Get info for all pages including their sections
	const pagesInfo: Array<DocumentationPageInfo | null> = await Promise.all(
		documentFiles.map(async (filename) => {
			const slug = filename.replace('.md', '');
			const page = await getDocumentationPage(filename);

			if(page.metadata.order === 0) {
				return null;
			}

			return {
				title: page.metadata.title,
				slug,
				description: page.metadata.description,
				order: page.metadata.order ?? 999, // Default to high number for sorting
				sections: page.sections,
			};
		}),
	);

	// Sort pages by order then title
	return pagesInfo.filter((page) => page !== null).sort((a, b) => {
		// Special case for index.md - always first
		if(a.slug === 'index') {
			return -1;
		}

		if(b.slug === 'index') {
			return 1;
		}

		// Sort by order if specified
		if(a.order !== b.order) {
			return (a.order ?? 999) - (b.order ?? 999);
		}

		// Then alphabetically by title
		return a.title.localeCompare(b.title);
	});
});
