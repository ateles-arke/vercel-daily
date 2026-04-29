import BrowseArticlesButton from './components/BrowseArticlesButton';
import HeroSubscribeButton from './components/SubscribeButton';

/**
 * Hero section occupying the full viewport height with heading, subtitle, and CTAs.
 * Displays "Browse articles" and a working subscribe CTA.
 * @returns {React.ReactNode} The hero banner section
 */
export default function HeroSection() {
	return (
		<section className="flex items-center py-16 md:py-20 px-8 md:px-16 lg:px-24">
			<div className="max-w-2xl">
				{/* Label */}
				<div className="mb-3">
					<p className="text-sm font-medium text-foreground/60 tracking-wide uppercase">
						The Vercel Daily
					</p>
				</div>

				{/* Heading */}
				<h1 className="mb-5 text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
					News and insights for modern web developers.
				</h1>

				{/* Subheading */}
				<p className="mb-8 text-base md:text-lg text-foreground/60 leading-relaxed max-w-xl">
					Changelogs, engineering deep dives, customer stories, and community
					updates — all in one place.
				</p>

				{/* Buttons */}
				<div className="flex flex-row gap-3">
					<BrowseArticlesButton />
					<HeroSubscribeButton />
				</div>
			</div>
		</section>
	);
}
