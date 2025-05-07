'use client';

import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';

export function Toaster() {
	const { toasts } = useToast();

	return (
		<ToastProvider>
			{toasts.map(({ id, title, description, action, ...properties }) => (
				<Toast key={id} {...properties}>
					<div className='grid gap-1'>
						{title && <ToastTitle>{title}</ToastTitle>}
						{description && (
							<ToastDescription>{description}</ToastDescription>
						)}
					</div>
					{action}
					<ToastClose />
				</Toast>
			))}
			<ToastViewport />
		</ToastProvider>
	);
}
