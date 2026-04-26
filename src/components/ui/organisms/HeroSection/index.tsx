import Image from 'next/image';
import Button from '@/components/ui/atoms/Button';

interface HeroSectionProps {
	/**
	 * Callback for browse articles button click
	 * Optional - button can be stateless for now
	 */
	onBrowseClick?: () => void;

	/**
	 * Callback for subscribe button click
	 * Optional - button can be stateless for now
	 */
	onSubscribeClick?: () => void;
}

/**
 * Hero section occupying the full viewport height with heading, subtitle, and CTAs.
 * Displays "Browse articles" (secondary) and "Subscribe" (primary) buttons.
 * @param {HeroSectionProps} props - Optional click handlers
 * @returns {React.ReactNode} The hero banner section
 */
export default function HeroSection({
	onBrowseClick,
	onSubscribeClick,
}: HeroSectionProps) {
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
					{/* Browse Articles Button */}
					<Button
						variant="primary"
						size="md"
						onClick={onBrowseClick}
						rightIcon={
							<Image
								src="/icons/arrow-right.svg"
								alt=""
								width={16}
								height={16}
								className="invert dark:invert-0"
							/>
						}
					>
						Browse articles
					</Button>

					{/* Subscribe Button */}
					<Button variant="secondary" size="md" onClick={onSubscribeClick}>
						Subscribe
					</Button>
				</div>
			</div>
		</section>
	);
}
