import BreakingNewsSkeleton from '@/components/ui/organisms/BreakingNewsBanner/Skeleton';
import HeroSection from '@/components/ui/organisms/HeroSection';
import FeaturedArticlesSkeleton from '@/components/ui/organisms/FeaturedArticles/Skeleton';

/**
 * Loading state for the home page.
 * Displays skeleton placeholders while async data is being fetched.
 * This replaces the Suspense fallbacks during initial page load.
 * @returns {React.ReactNode} Loading UI with skeletons matching the page structure
 */
export default function Loading() {
	return (
		<main>
			<BreakingNewsSkeleton />
			<HeroSection />
			<FeaturedArticlesSkeleton />
		</main>
	);
}
