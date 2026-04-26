import Image from 'next/image';
import Link from 'next/link';

/**
 * Primary CTA button linking to the all-articles page.
 * Renders as a Next.js Link styled to match the primary Button variant.
 * Uses /icons/arrow-right.svg from the public folder with dark-mode invert.
 * @returns {React.ReactNode} The browse articles link button
 */
export default function BrowseArticlesButton() {
	return (
		<Link
			href="/articles"
			className="inline-flex h-10 items-center justify-center rounded-lg bg-foreground px-5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 dark:bg-foreground dark:text-background dark:hover:bg-foreground/80"
		>
			Browse articles
			<span className="ml-2 flex items-center">
				<Image
					src="/icons/arrow-right.svg"
					alt=""
					width={16}
					height={16}
					aria-hidden="true"
					className="invert dark:invert-0"
				/>
			</span>
		</Link>
	);
}
