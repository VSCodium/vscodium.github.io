'use client';

import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type ApiWarningProperties = {
	message?: string;
};

export function ApiWarning({ message }: ApiWarningProperties) {
	return (
		<Alert variant='warning' className='mb-6'>
			<AlertCircle className='h-4 w-4' />
			<AlertTitle>API Limitation</AlertTitle>
			<AlertDescription>
				{message ?? 'Using fallback data because GitHub API data couldn\'t be fetched. Some download links may not work correctly.'}
			</AlertDescription>
		</Alert>
	);
}
