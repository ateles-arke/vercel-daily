import { Suspense } from 'react';

/**
 * Async component fetching current year for footer copyright text.
 * Uses cache directive to revalidate yearly for optimal performance.
 * @async
 * @returns {Promise<string>} Copyright text with current year
 */
const CurrentYear = async () => {
	'use cache';
	return `${new Date().getFullYear()} Vercel Daily. All rights reserved`;
};

/**
 * Footer component displaying copyright information with current year.
 * Renders at the bottom of all pages with copyright notice and year.
 * Uses Suspense to handle async year fetching with loading fallback.
 * @returns {React.ReactNode} The footer element
 */
const Footer = () => {
	return (
		<footer className="mt-auto border-t border-(--header-border) bg-(--header-bg) py-4 text-center text-sm text-foreground/50">
			<Suspense fallback="Loading Current Year...">
				<CurrentYear />
			</Suspense>
		</footer>
	);
};

export default Footer;
