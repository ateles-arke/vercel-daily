/**
 * Skeleton for only the search results section (header row + article grid).
 * Used as the Suspense fallback when query/category params change so the
 * search controls remain visible during re-fetches.
 * @returns {React.ReactNode} Results section skeleton
 */
export function SearchResultsSkeleton() {
	return (
		<section className="mt-8">
			<div className="flex flex-col gap-3 border-b border-foreground/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
				<div className="space-y-2">
					<div className="h-6 w-36 animate-pulse rounded bg-foreground/10" />
					<div className="h-4 w-56 animate-pulse rounded bg-foreground/10" />
				</div>
				<div className="hidden h-4 w-28 animate-pulse rounded bg-foreground/10 sm:block" />
			</div>

			<div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
				{Array.from({ length: 5 }).map((_, index) => (
					<div key={index} className="flex flex-col space-y-3">
						<div className="aspect-video animate-pulse rounded-lg bg-foreground/10" />
						<div className="h-3 w-28 animate-pulse rounded bg-foreground/10" />
						<div className="space-y-2">
							<div className="h-5 w-full animate-pulse rounded bg-foreground/10" />
							<div className="h-5 w-4/5 animate-pulse rounded bg-foreground/10" />
						</div>
						<div className="space-y-2">
							<div className="h-4 w-full animate-pulse rounded bg-foreground/10" />
							<div className="h-4 w-full animate-pulse rounded bg-foreground/10" />
							<div className="h-4 w-2/3 animate-pulse rounded bg-foreground/10" />
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

/**
 * Full-page loading skeleton for the search page.
 * Covers the filter controls area and a five-card results grid.
 * Used as the initial page load fallback.
 * @returns {React.ReactNode} Search page skeleton content
 */
export default function SearchPageSkeleton() {
	return (
		<>
			<div className="rounded-3xl border border-foreground/10 bg-foreground/3 p-4 md:p-5">
				<div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_13rem_auto] md:items-end">
					<div className="space-y-2">
						<div className="h-3 w-28 rounded bg-foreground/10" />
						<div className="h-12 rounded-2xl bg-foreground/10" />
						<div className="h-3 w-72 rounded bg-foreground/10" />
					</div>
					<div className="space-y-2">
						<div className="h-3 w-20 rounded bg-foreground/10" />
						<div className="h-12 rounded-2xl bg-foreground/10" />
					</div>
					<div className="h-12 rounded-2xl bg-foreground/10" />
				</div>
			</div>

			<SearchResultsSkeleton />
		</>
	);
}
