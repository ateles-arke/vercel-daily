import Link from 'next/link';

export default function NotFound() {
	return (
		<main className="flex flex-1 items-center justify-center px-8 py-24 md:px-16 lg:px-24">
			<section className="mx-auto flex w-full max-w-2xl flex-col items-start rounded-3xl border border-foreground/10 bg-foreground/2 p-8 md:p-12">
				<p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/45">
					404 Error
				</p>
				<h1 className="mt-4 text-4xl font-black tracking-tight text-foreground md:text-5xl">
					Page not found
				</h1>
				<p className="mt-4 max-w-xl text-base leading-7 text-foreground/65 md:text-lg">
					The page you requested does not exist or may have been moved.
					Return to the homepage to keep reading the latest updates.
				</p>
				<Link
					href="/"
					className="mt-8 inline-flex items-center rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
				>
					Go back home
				</Link>
			</section>
		</main>
	);
}