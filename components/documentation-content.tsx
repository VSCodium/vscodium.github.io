import { cn } from '@/lib/utils';

type DocumentationContentProperties = {
	html: string;
	className?: string;
};

export function DocumentationContent({ html, className }: DocumentationContentProperties) {
	return (
		<div
			className={cn(
				'prose dark:prose-invert max-w-none',
				// Dark mode specific overrides
				'dark:prose-headings:text-zinc-100',
				'dark:prose-p:text-zinc-300',
				'dark:prose-a:text-primary-dark dark:hover:prose-a:text-primary-dark/80',
				'dark:prose-strong:text-zinc-200',
				'dark:prose-code:text-zinc-200 dark:prose-code:bg-zinc-800 dark:prose-code:px-1 dark:prose-code:py-0.5 dark:prose-code:rounded',
				'dark:prose-pre:bg-zinc-900 dark:prose-pre:border dark:prose-pre:border-zinc-800',
				'dark:prose-hr:border-zinc-800',
				'dark:prose-li:text-zinc-300',
				'dark:prose-table:text-zinc-300',
				'dark:prose-thead:border-zinc-800',
				'dark:prose-tr:border-zinc-800',
				className,
			)}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}
