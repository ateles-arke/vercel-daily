import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
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

/**
 * Root layout component wrapping all pages of the application.
 * Provides global styles, fonts, and persistent header/footer navigation.
 * Uses Geist font family from Vercel for modern typography.
 * @param {Readonly<{children: React.ReactNode}>} props - Child pages to render
 * @returns {React.ReactNode} The HTML document structure with header, children, and footer
 */
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				<Header />
				{children}
			</body>
		</html>
	);
}
