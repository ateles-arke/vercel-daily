export default function Error() {
	return (
		<section className="px-8 py-12 md:px-16 md:py-16 lg:px-24">
			<div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-10 text-center">
				<h2 className="text-lg font-semibold text-foreground">
					Unable to load featured articles
				</h2>
				<p className="mt-2 text-sm text-foreground/60">
					Please try again in a moment.
				</p>
			</div>
		</section>
	);
}