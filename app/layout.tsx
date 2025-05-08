// eslint-disable-next-line import/extensions
import '@/app/globals.css';
import { Inter } from 'next/font/google';
import type React from 'react';
import { ThemeProvider } from '@/components/theme-provider';

// eslint-disable-next-line new-cap
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'VSCodium - Free/Libre Open Source Software Binaries of Visual Studio Code',
	description: 'VSCodium is a community-driven, freely-licensed binary distribution of Microsoft\'s editor Visual Studio Code.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
