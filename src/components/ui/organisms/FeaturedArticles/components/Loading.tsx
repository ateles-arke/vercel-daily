const skeletonItems = [0, 1, 2];

export default function Loading() {
	return (
		<section className="px-8 py-12 md:px-16 md:py-16 lg:px-24">
			<div className="mb-8 flex items-start justify-between">
				<div className="space-y-3">
					<div className="h-8 w-32 animate-pulse rounded-full bg-foreground/10" />
					<div className="h-4 w-56 animate-pulse rounded-full bg-foreground/8" />
				</div>
				<div className="mt-1 h-4 w-16 animate-pulse rounded-full bg-foreground/8" />
			</div>
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{skeletonItems.map((item) => (
					<div
						key={item}
						className="overflow-hidden rounded-3xl border border-foreground/10"
					>
						<div className="aspect-video animate-pulse bg-foreground/8" />
						<div className="space-y-4 px-5 py-5">
							<div className="h-4 w-28 animate-pulse rounded-full bg-foreground/8" />
							<div className="h-6 w-full animate-pulse rounded-full bg-foreground/10" />
							<div className="h-6 w-4/5 animate-pulse rounded-full bg-foreground/10" />
							<div className="space-y-2 pt-1">
								<div className="h-4 w-full animate-pulse rounded-full bg-foreground/8" />
								<div className="h-4 w-11/12 animate-pulse rounded-full bg-foreground/8" />
								<div className="h-4 w-3/4 animate-pulse rounded-full bg-foreground/8" />
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
