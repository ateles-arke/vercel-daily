interface ArticlesGridSkeletonProps {
	showCount?: boolean;
	showPagination?: boolean;
	cardCount?: number;
}

/**
 * Reusable skeleton for the articles grid.
 * Can render the full articles page placeholder or only the card grid area.
 * @returns {React.ReactNode} Articles grid skeleton
 */
export default function ArticlesGridSkeleton({
	showCount = true,
	showPagination = true,
	cardCount = 12,
}: ArticlesGridSkeletonProps) {
	return (
		<>
			{showCount && (
				<>
					{/* Article count placeholder */}
					<div className="mb-8 h-4 w-24 rounded bg-foreground/10" />
				</>
			)}

			{/* Grid skeleton — 12 cards */}
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{[...Array(cardCount)].map((_, i) => (
					<div key={i} className="flex flex-col space-y-3">
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

			{showPagination && (
				<>
					{/* Pagination skeleton */}
					<div className="mt-12 flex justify-center gap-1">
						{[...Array(7)].map((_, i) => (
							<div key={i} className="h-9 w-9 rounded-lg bg-foreground/10" />
						))}
					</div>
				</>
			)}
		</>
	);
}
