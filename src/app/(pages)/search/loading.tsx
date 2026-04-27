import SearchPageSkeleton from '@/components/features/search/SearchPageSkeleton';

/**
 * Route-level loading state for the search page.
 * Mirrors the page shell while search controls and results stream in.
 * @returns {React.ReactNode} Search page loading UI
 */
export default function SearchLoading() {
	return (
		<main className="px-8 py-12 md:px-16 md:py-16 lg:px-24">
			<div className="max-w-3xl">
				<div className="h-3 w-20 rounded bg-foreground/10" />
				<div className="mt-4 h-12 w-80 rounded bg-foreground/10" />
				<div className="mt-4 h-4 w-full max-w-2xl rounded bg-foreground/10" />
				<div className="mt-2 h-4 w-4/5 max-w-xl rounded bg-foreground/10" />
			</div>

			<div className="mt-8">
				<SearchPageSkeleton />
			</div>
		</main>
	);
}