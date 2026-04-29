/**
 * Loading skeleton that reproduces the RenderArticle component structure.
 * Displays a two-column grid with article content and sidebar placeholders.
 * @returns {React.ReactNode} Article content skeleton
 */
export default function RenderArticleSkeleton() {
	return (
		<>
			<div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
				{/* Article column */}
				<article className="min-w-0">
					{/* Article header skeleton */}
					<div className="mb-8">
						{/* Category pills */}
						<div className="mb-4 flex items-center gap-2">
							<div className="h-5 w-20 animate-pulse rounded-full bg-foreground/10" />
							<div className="h-5 w-24 animate-pulse rounded bg-foreground/10" />
						</div>

						{/* Title */}
						<div className="space-y-2">
							<div className="h-10 w-full animate-pulse rounded bg-foreground/10" />
							<div className="h-10 w-4/5 animate-pulse rounded bg-foreground/10" />
						</div>

						{/* Excerpt */}
						<div className="mt-4 space-y-2">
							<div className="h-6 w-full animate-pulse rounded bg-foreground/10" />
							<div className="h-6 w-11/12 animate-pulse rounded bg-foreground/10" />
							<div className="h-6 w-3/4 animate-pulse rounded bg-foreground/10" />
						</div>

						{/* Author info */}
						<div className="mt-6 flex items-center gap-3">
							<div className="h-10 w-10 animate-pulse rounded-full bg-foreground/10" />
							<div className="space-y-1">
								<div className="h-4 w-32 animate-pulse rounded bg-foreground/10" />
								<div className="h-3 w-24 animate-pulse rounded bg-foreground/10" />
							</div>
						</div>
					</div>

					{/* Hero image */}
					<div className="mb-8 aspect-video w-full animate-pulse rounded-3xl bg-foreground/10" />

					{/* Content area - either full content or teaser with gradient */}
					<div className="space-y-3">
						{Array.from({ length: 6 }).map((_, i) => (
							<div
								key={i}
								className="h-5 animate-pulse rounded bg-foreground/10"
								style={{ width: `${85 + (i % 2) * 10}%` }}
							/>
						))}
						{/* Gradient fade suggestion */}
						<div className="mt-4 h-8 animate-pulse rounded bg-linear-to-b from-foreground/10 to-foreground/5" />
					</div>
				</article>

				{/* Sidebar skeleton - trending articles or paywall */}
				<aside className="space-y-4 self-start">
					<div className="rounded-3xl border border-foreground/10 bg-foreground/3 p-6">
						{/* Header */}
						<div className="mb-6 flex items-center justify-between">
							<div className="h-6 w-24 animate-pulse rounded bg-foreground/10" />
							<div className="h-4 w-8 animate-pulse rounded bg-foreground/10" />
						</div>

						{/* Content - trending articles or paywall message */}
						<div className="space-y-4">
							{/* Line 1 - could be paywall label or article title */}
							<div className="h-4 w-32 animate-pulse rounded bg-foreground/10" />

							{/* Line 2 - paywall heading or first article title */}
							<div className="space-y-1">
								<div className="h-5 w-full animate-pulse rounded bg-foreground/10" />
								<div className="h-5 w-3/4 animate-pulse rounded bg-foreground/10" />
							</div>

							{/* Divider or spacing */}
							<div className="border-t border-foreground/10 py-3" />

							{/* Items - could be trending articles or paywall details */}
							{Array.from({ length: 3 }).map((_, i) => (
								<div key={i} className="space-y-2">
									<div className="h-3 w-2/3 animate-pulse rounded bg-foreground/10" />
									<div className="h-4 w-full animate-pulse rounded bg-foreground/10" />
									<div className="h-4 w-5/6 animate-pulse rounded bg-foreground/10" />
								</div>
							))}

							{/* CTA button */}
							<div className="mt-4 h-10 w-full animate-pulse rounded-lg bg-foreground/10" />
						</div>
					</div>
				</aside>
			</div>
		</>
	);
}
