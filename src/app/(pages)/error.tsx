'use client';

import { useEffect } from 'react';

/**
 * Route-level error boundary for the (pages) segment.
 * Handles uncaught exceptions that bubble up from child components.
 * Must be a Client Component per Next.js error.js file convention.
 * @param {Object} props - Error boundary props
 * @param {Error & { digest?: string }} props.error - The uncaught error
 * @param {() => void} props.unstable_retry - Callback to re-render the segment
 */
export default function Error({
	error,
	unstable_retry,
}: {
	error: Error & { digest?: string };
	unstable_retry: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<main className="flex min-h-[60vh] flex-col items-center justify-center px-8">
			<div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-10 text-center">
				<h2 className="text-lg font-semibold text-foreground">
					Something went wrong
				</h2>
				<p className="mt-2 text-sm text-foreground/60">
					An unexpected error occurred. Please try again.
				</p>
				{error.digest && (
					<p className="mt-1 font-mono text-xs text-foreground/30">
						Error ID: {error.digest}
					</p>
				)}
				<button
					onClick={unstable_retry}
					className="mt-6 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
				>
					Try again
				</button>
			</div>
		</main>
	);
}
