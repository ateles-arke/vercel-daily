import { Suspense } from 'react';
import type { Metadata } from 'next';
import { cacheLife, cacheTag } from 'next/cache';
import BreakingNewsBanner from '@/components/ui/organisms/BreakingNewsBanner';
import BreakingNewsSkeleton from '@/components/ui/organisms/BreakingNewsBanner/Skeleton';
import HeroSection from '@/components/ui/organisms/HeroSection';
import FeaturedArticles from '@/components/features/article/FeaturedArticles';
import FeaturedArticlesSkeleton from '@/components/features/article/FeaturedArticles/Skeleton';
import { getBreakingNews } from '@/services/newsApi';

export const metadata: Metadata = {
	title: 'Home',
	description:
		'News and insights for modern web developers. Changelogs, engineering deep dives, customer stories, and community updates — all in one place.',
	openGraph: {
		title: 'The Vercel Daily — News for Modern Web Developers',
		description:
			'News and insights for modern web developers. Changelogs, engineering deep dives, customer stories, and community updates — all in one place.',
		url: '/',
	},
};

/**
 * Async component fetching and displaying the latest breaking news.
 * Cached via 'use cache' with a short 'minutes' profile and a 'breaking-news' tag
 * for on-demand invalidation when urgent news must appear immediately.
 * @async
 * @returns {Promise<React.ReactNode>} Breaking news banner or null if unavailable
 */
async function BreakingNewsSection() {
	'use cache';
	cacheLife('minutes');
	cacheTag('breaking-news');

	const news = await getBreakingNews();
	if (!news) return null;
	return <BreakingNewsBanner headline={news.headline} />;
}

/**
 * Home page displaying breaking news banner and hero section with call-to-action.
 * Wraps breaking news in Suspense boundary for smooth async data loading.
 * @returns {React.ReactNode} The home page content
 */
export default function Home() {
	return (
		<main>
			<Suspense fallback={<BreakingNewsSkeleton />}>
				<BreakingNewsSection />
			</Suspense>
			<HeroSection />
			<Suspense fallback={<FeaturedArticlesSkeleton />}>
				<FeaturedArticles />
			</Suspense>
		</main>
	);
}
