import { Suspense } from 'react';
import BreakingNewsBanner from '@/components/ui/organisms/BreakingNewsBanner';
import { getBreakingNews } from '@/services/newsApi';
//TODO: implement error handling and loading states for breaking news - CHECKING WITH VERCEL

/**
 * Async component fetching and displaying the latest breaking news.
 * Fetches from news API with ISR caching. Falls back to demo headline during development.
 * @async
 * @returns {Promise<React.ReactNode>} Breaking news banner or null if unavailable
 */
async function BreakingNewsSection() {
	//TODO: fetch real breaking news from API - CHECKING WITH VERCEL
	// const news = await getBreakingNews();
	// if (!news) return null;
	// return <BreakingNewsBanner headline={news.headline} />;
	const headline = 'Vercel Introduces the AI Cloud Platform';
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
			</Suspense>
		</main>
	);
}
