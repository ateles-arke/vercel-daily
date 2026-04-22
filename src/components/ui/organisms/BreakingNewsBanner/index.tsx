import Image from 'next/image';

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
				<Image
					src="/icons/warning.svg"
					alt="Breaking news"
					width={15}
					height={15}
					className="shrink-0 opacity-80 dark:invert"
				/>

				{/* Badge */}
				<span className="shrink-0 rounded bg-background px-1.5 py-0.5 text-xs font-bold uppercase tracking-wider text-foreground">
					Breaking
				</span>

				{/* Headline */}
				<p className="min-w-0 flex-1 truncate opacity-90">{headline}</p>
			</div>
		</div>
	);
}
