import { Suspense } from 'react';

const CurrentYear = async () => {
	'use cache';
	return `${new Date().getFullYear()} Vercel Daily. All rights reserved`;
};

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
