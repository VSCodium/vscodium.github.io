'use client';

import { Check, Copy } from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

type CommandProperties = {
	className?: string;
	children: React.ReactNode;
};

export function Command({ children, className }: CommandProperties) {
	const [copied, setCopied] = useState(false);

	const copyToClipboard = async () => {
		try {
			// Convert children to string if it's not already
			const textToCopy
				= typeof children === 'string' ? children : (Array.isArray(children) ? children.join('') : String(children));

			await navigator.clipboard.writeText(textToCopy);

			setCopied(true);
			setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
		}
		catch (error) {
			console.error('Failed to copy text:', error);
		}
	};

	return (
		<div className={cn('relative group rounded-md bg-muted p-4', className)}>
			<button
				onClick={copyToClipboard}
				className='absolute top-4 right-4 p-1.5 rounded-md bg-background/50 hover:bg-background text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity'
				aria-label='Copy command to clipboard'
			>
				{copied ? <Check className='h-4 w-4' /> : <Copy className='h-4 w-4' />}
			</button>
			<code className='font-mono text-sm whitespace-pre-wrap p-0'>{children}</code>
		</div>
	);
}
