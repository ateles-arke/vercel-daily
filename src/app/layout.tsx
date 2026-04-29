import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from '@/components/layout/header';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

const BASE_CLASS_NAME = `${geistSans.variable} ${geistMono.variable} h-full antialiased`;

const THEME_BOOTSTRAP_SCRIPT = `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark');}catch(e){document.documentElement.classList.add('dark');}})();`;

export const metadata: Metadata = {
	title: {
		default: 'The Vercel Daily',
		template: '%s | The Vercel Daily',
	},
	description:
		'Changelogs, engineering deep dives, customer stories, and community updates — all in one place.',
	keywords: [
		'vercel',
		'next.js',
		'web development',
		'engineering',
		'news',
		'changelogs',
	],
	metadataBase: new URL('https://vercel-daily.vercel.app'),
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	openGraph: {
		type: 'website',
		siteName: 'The Vercel Daily',
		title: 'The Vercel Daily',
		description:
			'Changelogs, engineering deep dives, customer stories, and community updates — all in one place.',
		url: 'https://vercel-daily.vercel.app',
		locale: 'en_US',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'The Vercel Daily',
		description:
			'Changelogs, engineering deep dives, customer stories, and community updates — all in one place.',
		creator: '@vercel',
	},
	alternates: {
		canonical: 'https://vercel-daily.vercel.app',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning className={BASE_CLASS_NAME}>
			<head>
				{/* Preconnect to Google Fonts to reduce critical request chain latency */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: THEME_BOOTSTRAP_SCRIPT,
					}}
				/>
			</head>
			<body className="min-h-full flex flex-col">
				<Header />
				{children}
			</body>
		</html>
	);
}
