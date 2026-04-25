import type { BreakingNewsItem, BreakingNewsResponse } from '@/types/api';

const BASE_URL = process.env.NEWS_API_BASE_URL!;
const BYPASS_TOKEN = process.env.NEWS_API_BYPASS_TOKEN!;

const headers = {
	accept: 'application/json',
	'x-vercel-protection-bypass': BYPASS_TOKEN,
};

/**
 * Fetches the latest breaking news item from the news API.
 * Uses Incremental Static Regeneration (ISR) with 60-second revalidation.
 * Gracefully returns null if API is unavailable or request fails.
 * @async
 * @returns {Promise<BreakingNewsItem|null>} The breaking news item or null if unavailable
 */
export async function getBreakingNews(): Promise<BreakingNewsItem | null> {
	try {
		// Try header approach first
		console.log('[Breaking News API] Attempting with header...');
		let res = await fetch(`${BASE_URL}/breaking-news`, {
			headers,
		});

		// Fallback to query parameter if header fails
		if (!res.ok && res.status === 401) {
			console.log(
				'[Breaking News API] Header failed, trying query parameter...',
			);
			res = await fetch(
				`${BASE_URL}/breaking-news?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${encodeURIComponent(BYPASS_TOKEN)}`,
			);
		}

		if (!res.ok) {
			console.error(
				`[Breaking News API] Status ${res.status}: ${res.statusText}`,
			);
			return null;
		}

		const json: BreakingNewsResponse = await res.json();
		if (json.success && json.data) {
			console.log(`[Breaking News API] ✓ Loaded: "${json.data.headline}"`);
		}
		return json.success ? json.data : null;
	} catch (error) {
		console.error(
			'[Breaking News API] Error:',
			error instanceof Error ? error.message : String(error),
		);
		return null;
	}
}
