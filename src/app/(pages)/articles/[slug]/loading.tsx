/**
 * Loading skeleton for the article detail page content.
 * Renders inside the Suspense fallback boundary with full page wrapper
 * to ensure proper 1280px width alignment with the Back button.
 * @returns {React.ReactNode} Article skeleton content
 */
export default function ArticleLoading() {
	return (
		<main className="px-8 py-12 md:px-16 md:py-16 lg:px-24">
			<div className="mx-auto w-full max-w-[1280px]">
				{/* Back button skeleton */}
				<div className="mb-8 h-5 w-16 animate-pulse rounded bg-foreground/10" />

				{/* Article grid */}
				<div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
					{/* Article column */}
					<div className="min-w-0">
						{/* Category + date row */}
						<div className="mb-6 flex items-center gap-3">
							<div className="h-5 w-24 animate-pulse rounded-full bg-foreground/10" />
							<div className="h-5 w-28 animate-pulse rounded bg-foreground/10" />
						</div>

						{/* Title */}
						<div className="space-y-3">
							<div className="h-10 w-full animate-pulse rounded bg-foreground/10" />
							<div className="h-10 w-4/5 animate-pulse rounded bg-foreground/10" />
						</div>

						{/* Excerpt */}
						<div className="mt-5 space-y-2">
							<div className="h-6 w-full animate-pulse rounded bg-foreground/10" />
							<div className="h-6 w-11/12 animate-pulse rounded bg-foreground/10" />
							<div className="h-6 w-3/4 animate-pulse rounded bg-foreground/10" />
						</div>

						{/* Author row */}
						<div className="mt-8 flex items-center gap-3">
							<div className="h-10 w-10 animate-pulse rounded-full bg-foreground/10" />
							<div className="space-y-1.5">
								<div className="h-4 w-32 animate-pulse rounded bg-foreground/10" />
								<div className="h-3 w-16 animate-pulse rounded bg-foreground/10" />
							</div>
						</div>

						{/* Hero image */}
						<div className="mt-10 aspect-video w-full animate-pulse rounded-3xl bg-foreground/10" />

						{/* Content paragraphs */}
						<div className="mt-10 space-y-3 border-t border-foreground/10 pt-10">
							{Array.from({ length: 5 }).map((_, i) => (
								<div
									key={i}
									className="h-5 animate-pulse rounded bg-foreground/10"
									style={{ width: `${85 + (i % 3) * 5}%` }}
								/>
							))}
						</div>
					</div>

					{/* Sidebar placeholder */}
					<div className="space-y-4 self-start">
						<div className="rounded-3xl border border-foreground/10 bg-foreground/3 p-6">
							<div className="mb-5 flex items-center justify-between">
								<div className="h-5 w-24 animate-pulse rounded bg-foreground/10" />
								<div className="h-4 w-10 animate-pulse rounded bg-foreground/10" />
							</div>
							<div className="space-y-5">
								{Array.from({ length: 4 }).map((_, i) => (
									<div
										key={i}
										className="border-b border-foreground/10 pb-5 last:border-b-0 last:pb-0"
									>
										<div className="mb-2 h-3 w-2/3 animate-pulse rounded bg-foreground/10" />
										<div className="h-5 w-full animate-pulse rounded bg-foreground/10" />
										<div className="mt-1 h-5 w-4/5 animate-pulse rounded bg-foreground/10" />
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
