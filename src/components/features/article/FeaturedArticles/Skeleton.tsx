/**
 * Skeleton loader for featured articles grid.
 * Displays 6 placeholder cards matching the layout of FeaturedArticles during data loading.
 * @returns {React.ReactNode} Skeleton UI element
 */
export default function FeaturedArticlesSkeleton() {
	return (
		<section className="px-8 py-12 md:px-16 md:py-16 lg:px-24">
			<div className="mb-8 flex items-start justify-between">
				<div className="flex-1">
					<div className="mb-3 h-8 w-32 rounded bg-foreground/10" />
					<div className="h-4 w-48 rounded bg-foreground/10" />
				</div>
				<div className="mt-1 h-4 w-20 rounded bg-foreground/10" />
			</div>

			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{[...Array(6)].map((_, index) => (
					<div key={index} className="flex flex-col space-y-3">
						<div className="aspect-video rounded-lg bg-foreground/10" />
						<div className="h-3 w-32 rounded bg-foreground/10" />
						<div className="space-y-2">
							<div className="h-5 w-full rounded bg-foreground/10" />
							<div className="h-5 w-4/5 rounded bg-foreground/10" />
						</div>
						<div className="space-y-2">
							<div className="h-4 w-full rounded bg-foreground/10" />
							<div className="h-4 w-full rounded bg-foreground/10" />
							<div className="h-4 w-2/3 rounded bg-foreground/10" />
						</div>
					</div>
				))}
			</div>
		</section>
	);
}