export default function NoArticlesFound() {
	return (
		<section className="px-8 py-12 md:px-16 md:py-16 lg:px-24">
			<div className="rounded-2xl border border-foreground/10 bg-foreground/3 px-6 py-10 text-center">
				<p className="text-base font-medium text-foreground/70">
					No Articles Found
				</p>
			</div>
		</section>
	);
}