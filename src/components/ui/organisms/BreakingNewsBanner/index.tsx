interface BreakingNewsBannerProps {
	headline: string;
}

/**
 * Breaking news banner displaying urgent news headline.
 * Large prominent banner with warning icon and 'BREAKING' badge.
 * Shows only when breaking news is available.
 * @param {BreakingNewsBannerProps} props - Banner content with news headline
 * @returns {React.ReactNode|null} The breaking news banner or null if no headline
 */
export default function BreakingNewsBanner({
	headline,
}: BreakingNewsBannerProps) {
	return (
		<div className="w-full bg-foreground text-background">
			<div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2.5 text-sm">
				{/* Warning icon */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="15"
					height="15"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="shrink-0 opacity-80"
					aria-hidden="true"
				>
					<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
					<path d="M12 9v4" />
					<path d="M12 17h.01" />
				</svg>

				{/* Badge */}
				<span className="shrink-0 rounded bg-background px-1.5 py-0.5 text-xs font-bold uppercase tracking-wider text-foreground">
					Breaking
				</span>

				{/* Headline */}
				<p className="truncate opacity-90">{headline}</p>
			</div>
		</div>
	);
}
