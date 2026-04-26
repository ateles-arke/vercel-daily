/**
 * Skeleton loader for featured articles grid.
 * Displays 3 placeholder cards matching the layout of FeaturedArticles during data loading.
 * @returns {React.ReactNode} Skeleton UI element
 */
export default function FeaturedArticlesSkeleton() {
	return (
		<section className="px-8 md:px-16 lg:px-24 py-12 md:py-16">
			{/* Section header skeleton */}
			<div className="flex items-start justify-between mb-8">
				<div className="flex-1">
					<div className="h-8 w-32 rounded bg-foreground/10 mb-3" />
					<div className="h-4 w-48 rounded bg-foreground/10" />
				</div>
				<div className="h-4 w-20 rounded bg-foreground/10 mt-1" />
			</div>

			{/* Articles grid skeleton */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{[...Array(6)].map((_, i) => (
					<div key={i} className="flex flex-col space-y-3">
						{/* Image placeholder */}
						<div className="aspect-video rounded-lg bg-foreground/10" />
						{/* Meta placeholder */}
						<div className="h-3 w-32 rounded bg-foreground/10" />
						{/* Title placeholder */}
						<div className="space-y-2">
							<div className="h-5 w-full rounded bg-foreground/10" />
							<div className="h-5 w-4/5 rounded bg-foreground/10" />
						</div>
						{/* Excerpt placeholder */}
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
