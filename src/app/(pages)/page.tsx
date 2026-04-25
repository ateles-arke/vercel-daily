import { Suspense } from 'react';
import { cacheLife, cacheTag } from 'next/cache';
import BreakingNewsBanner from '@/components/ui/organisms/BreakingNewsBanner';
import { getBreakingNews } from '@/services/newsApi';
import Button from '@/components/ui/atoms/Button';
import Image from 'next/image';

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
	// Use fallback headline until API authentication is resolved
	const headline = news?.headline || 'Vercel Introduces the AI Cloud Platform';
	return <BreakingNewsBanner headline={headline} />;
}

/**
 * Home page displaying breaking news and main content.
 * Wraps breaking news in Suspense boundary for smooth async data loading.
 * @returns {React.ReactNode} The home page content
 */
export default function Home() {
	return (
		<main>
			<Suspense fallback={'...Loading breaking news'}>
				<BreakingNewsSection />
				HOME PAGE
				<Button variant="primary" size="md">
					Subscribe
				</Button>
				<Button
					variant="secondary"
					rightIcon={
						<Image
							src="/icons/arrow-right.svg"
							alt=""
							width={16}
							height={16}
							className="dark:invert"
						/>
					}
				>
					Browse articles
				</Button>
			</Suspense>
		</main>
	);
}
