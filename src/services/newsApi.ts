import { cacheLife, cacheTag } from 'next/cache';
import { API_BYPASS_TOKEN, buildBypassUrl } from '@/lib/api-constants';
import type {
	BreakingNewsItem,
	BreakingNewsResponse,
	Article,
	ArticleDetail,
	ArticleDetailResponse,
	ArticlesResponse,
	TrendingArticlesResponse,
} from '@/types/api';

const BASE_URL = process.env.NEWS_API_BASE_URL!;

const headers = {
	accept: 'application/json',
	'x-vercel-protection-bypass': API_BYPASS_TOKEN,
};

/**
 * Fetches the latest breaking news item from the news API.
 * Used for rendering the breaking news banner at the top of pages.
 * Throws on non-OK responses so callers can handle errors via error boundaries.
 * @async
 * @returns {Promise<BreakingNewsItem|null>} The breaking news item or null if unavailable
 * @throws {Error} When the API returns a non-OK status after retries or the request fails
 */
export async function getBreakingNews(): Promise<BreakingNewsItem | null> {
	let res = await fetch(`${BASE_URL}/breaking-news`, {
		headers,
	});

	// Fallback to query parameter if header-based bypass fails
	if (!res.ok && res.status === 401) {
		res = await fetch(
			buildBypassUrl(`${BASE_URL}/breaking-news`, API_BYPASS_TOKEN),
			{
				headers,
			},
		);
	}

	if (!res.ok) {
		throw new Error(
			`[Breaking News API] Status ${res.status}: ${res.statusText}`,
		);
	}

	const json: BreakingNewsResponse = await res.json();
	return json.success ? json.data : null;
}

/**
 * Fetches featured articles from the news API.
 * Used for displaying the featured articles section on the homepage.
 * Throws on non-OK responses so callers can handle errors via error boundaries.
 * @async
 * @returns {Promise<Article[]>} Array of featured articles, empty array if unavailable
 * @throws {Error} When the API returns a non-OK status after retries or the request fails
 */
export async function getFeaturedArticles(): Promise<Article[]> {
	const res = await fetch(`${BASE_URL}/articles?featured=true`, {
		headers,
	});

	if (!res.ok) {
		throw new Error(
			`[Featured Articles API] Status ${res.status}: ${res.statusText}`,
		);
	}

	const json: ArticlesResponse = await res.json();
	return json.success ? json.data : [];
}

/**
 * Fetches a single article by slug.
 * Cached for article-detail rendering and metadata generation.
 * Uses Next.js 16 cacheComponents with cacheLife('hours') for server-side revalidation.
 * Returns null for 404 responses so callers can delegate to notFound().
 * @async
 * @param {string} slug - Article slug route param (URL-encoded automatically for safety)
 * @returns {Promise<ArticleDetail|null>} Full article detail or null if not found
 * @throws {Error} When the API returns a non-OK status (except 404) after retries
 */
export async function getArticleBySlug(
	slug: string,
): Promise<ArticleDetail | null> {
	'use cache';
	cacheLife('hours');
	cacheTag('articles');
	cacheTag(`article:${slug}`);

	const encodedSlug = encodeURIComponent(slug);

	let res = await fetch(`${BASE_URL}/articles/${encodedSlug}`, {
		headers,
	});

	if (!res.ok && res.status === 401) {
		res = await fetch(
			buildBypassUrl(`${BASE_URL}/articles/${encodedSlug}`, API_BYPASS_TOKEN),
			{ headers },
		);
	}

	if (res.status === 404) {
		return null;
	}

	if (!res.ok) {
		throw new Error(`[Article API] Status ${res.status}: ${res.statusText}`);
	}

	const json: ArticleDetailResponse = await res.json();
	return json.success ? json.data : null;
}

/**
 * Fetches trending articles for article discovery and static generation.
 * Cached for static generation of article detail pages via generateStaticParams.
 * Uses Next.js 16 cacheComponents with cacheLife('hours') for server-side revalidation.
 * @async
 * @returns {Promise<ArticleDetail[]>} Trending article collection, empty array if unavailable
 * @throws {Error} When the API returns a non-OK status after retries or the request fails
 */
export async function getTrendingArticles(): Promise<ArticleDetail[]> {
	'use cache';
	cacheLife('hours');
	cacheTag('articles');
	cacheTag('trending-articles');

	let res = await fetch(`${BASE_URL}/articles/trending`, {
		headers,
	});

	if (!res.ok && res.status === 401) {
		res = await fetch(
			buildBypassUrl(`${BASE_URL}/articles/trending`, API_BYPASS_TOKEN),
			{ headers },
		);
	}

	if (!res.ok) {
		throw new Error(
			`[Trending Articles API] Status ${res.status}: ${res.statusText}`,
		);
	}

	const json: TrendingArticlesResponse = await res.json();
	return json.success ? json.data : [];
}
