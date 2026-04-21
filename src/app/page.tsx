import { Suspense } from 'react';
import BreakingNewsBanner from '@/components/ui/organisms/BreakingNewsBanner';
import { getBreakingNews } from '@/services/newsApi';
//TODO: implement error handling and loading states for breaking news - CHECKING WITH VERCEL

async function BreakingNewsSection() {
	//TODO: fetch real breaking news from API - CHECKING WITH VERCEL
	// const news = await getBreakingNews();
	// if (!news) return null;
	// return <BreakingNewsBanner headline={news.headline} />;
	const headline = 'Vercel Introduces the AI Cloud Platform';
	return <BreakingNewsBanner headline={headline} />;
}

export default function Home() {
	return (
		<main>
			<Suspense fallback={'...Loading breaking news'}>
				<BreakingNewsSection />
			</Suspense>
		</main>
	);
}
