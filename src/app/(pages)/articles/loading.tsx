import ArticlesGridSkeleton from '@/components/features/article/ArticlesGridSkeleton';

/**
 * Route-level loading skeleton for the all-articles page (client-side navigation).
 * Wraps the shared ArticlesGridSkeleton with the page's outer layout.
 * @returns {React.ReactNode} Full-page skeleton UI
 */
export default function ArticlesLoading() {
	return (
		<main className="px-8 py-12 md:px-16 md:py-16 lg:px-24">
			<div className="mb-8 h-9 w-36 rounded bg-foreground/10" />
			<ArticlesGridSkeleton />
		</main>
	);
}
