import { Suspense } from 'react';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from '@/components/layout/header';
import { getInitialThemeConfig } from '@/lib/theme';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: {
		default: 'The Vercel Daily',
		template: '%s | The Vercel Daily',
	},
	description:
		'Changelogs, engineering deep dives, customer stories, and community updates — all in one place.',
	metadataBase: new URL('https://vercel-daily.vercel.app'),
	openGraph: {
		type: 'website',
		siteName: 'The Vercel Daily',
		title: 'The Vercel Daily',
		description:
			'Changelogs, engineering deep dives, customer stories, and community updates — all in one place.',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'The Vercel Daily',
		description:
			'Changelogs, engineering deep dives, customer stories, and community updates — all in one place.',
	},
};

async function ThemeInitializer() {
	const themeCookie = (await cookies()).get('theme')?.value ?? null;
	const baseClassName = `${geistSans.variable} ${geistMono.variable} h-full antialiased`;
	const { isDark } = getInitialThemeConfig(baseClassName, themeCookie);
	return <Header initialIsDark={isDark} />;
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const baseClassName = `${geistSans.variable} ${geistMono.variable} h-full antialiased`;

	return (
		<html lang="en" suppressHydrationWarning className={baseClassName}>
			<head>
				{/* Inline script runs before first paint to apply .dark without flash */}
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(){try{var c=document.cookie.split(';').find(function(s){return s.trim().startsWith('theme=');});var t=c?decodeURIComponent(c.trim().slice(6)):'dark';if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`,
					}}
				/>
			</head>
			<body className="min-h-full flex flex-col">
				<Suspense fallback={<div className="h-14" />}>
					<ThemeInitializer />
				</Suspense>
				{children}
			</body>
		</html>
	);
}
