import type { BreakingNewsItem, BreakingNewsResponse } from '@/types/api';

const BASE_URL = process.env.NEWS_API_BASE_URL!;

const headers = {
	'x-vercel-protection-bypass': process.env.NEWS_API_BYPASS_TOKEN!,
};

/**
 * Fetches the latest breaking news item from the news API.
 * Uses Incremental Static Regeneration (ISR) with 60-second revalidation.
 * Gracefully returns null if API is unavailable or request fails.
 * @async
 * @returns {Promise<BreakingNewsItem|null>} The breaking news item or null if unavailable
 */
export async function getBreakingNews(): Promise<BreakingNewsItem | null> {
	const res = await fetch(`${BASE_URL}/breaking-news`, {
		headers,
		next: { revalidate: 60 },
	});

	if (!res.ok) return null;

	const json: BreakingNewsResponse = await res.json();
	return json.success ? json.data : null;
}
