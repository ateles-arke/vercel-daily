/**
 * Skeleton loader for breaking news banner.
 * Mimics the layout of BreakingNewsBanner during data loading.
 * @returns {React.ReactNode} Skeleton UI element
 */
export default function BreakingNewsSkeleton() {
	return (
		<section className="px-8 py-6 md:px-16 md:py-8 lg:px-24">
			<div className="rounded-lg border border-foreground/10 bg-foreground/3 p-4 md:p-6">
				<div className="flex items-start gap-4">
					{/* Icon placeholder */}
					<div className="h-6 w-6 flex-shrink-0 rounded bg-foreground/10" />
					{/* Text placeholder */}
					<div className="flex-1 space-y-2">
						<div className="h-4 w-3/4 rounded bg-foreground/10" />
						<div className="h-3 w-1/2 rounded bg-foreground/10" />
					</div>
				</div>
			</div>
		</section>
	);
}
