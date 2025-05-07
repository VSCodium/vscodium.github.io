'use client';

import { Moon, Sun, Laptop } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function ThemeToggle() {
	const { setTheme, theme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Avoid hydration mismatch by only rendering after mount
	useEffect(() => {
		setMounted(true);
	}, []);

	if(!mounted) {
		return <Button variant='ghost' size='icon' disabled className='w-9 px-0' />;
	}

	// Use resolvedTheme to get the actual theme (light/dark) when theme is set to "system"
	const currentTheme = resolvedTheme ?? theme ?? 'system';

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' size='icon' className='w-9 px-0'>
								{currentTheme === 'light' && <Sun className='h-[1.2rem] w-[1.2rem]' />}
								{currentTheme === 'dark' && <Moon className='h-[1.2rem] w-[1.2rem]' />}
								{currentTheme === 'system' && <Laptop className='h-[1.2rem] w-[1.2rem]' />}
								<span className='sr-only'>Toggle theme</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuItem onClick={() => setTheme('light')} className='flex items-center gap-2 cursor-pointer'>
								<Sun className='h-4 w-4' />
								<span>Light</span>
								{theme === 'light' && <span className='ml-auto text-xs'>✓</span>}
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme('dark')} className='flex items-center gap-2 cursor-pointer'>
								<Moon className='h-4 w-4' />
								<span>Dark</span>
								{theme === 'dark' && <span className='ml-auto text-xs'>✓</span>}
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme('system')} className='flex items-center gap-2 cursor-pointer'>
								<Laptop className='h-4 w-4' />
								<span>System</span>
								{theme === 'system' && <span className='ml-auto text-xs'>✓</span>}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</TooltipTrigger>
				<TooltipContent>
					<p>Change theme</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
