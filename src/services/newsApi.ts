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
	PaginationMeta,
} from '@/types/api';

const BASE_URL = process.env.NEWS_API_BASE_URL!;

const headers = {
	accept: 'application/json',
	'x-vercel-protection-bypass': API_BYPASS_TOKEN,
};

/**
 * Performs a fetch with the shared API headers and retries once with bypass query params on 401.
 * Keeps Vercel protection fallback behavior consistent across endpoints that support it.
 * @async
 * @param {string} url - Endpoint URL to request
 * @returns {Promise<Response>} The initial response or the retry response when a bypass retry was needed
 */
async function fetchWithBypassRetry(url: string): Promise<Response> {
	let response = await fetch(url, { headers });

	if (!response.ok && response.status === 401) {
		response = await fetch(buildBypassUrl(url, API_BYPASS_TOKEN), {
			headers,
		});
	}

	return response;
}

/**
 * Fetches the full article collection used by list-like experiences.
 * Cached once so article listing pages can derive their own filtered views
 * without repeating the underlying API request.
 * @async
 * @returns {Promise<Article[]>} Full article collection
 * @throws {Error} When the API returns a non-OK status or the request fails
 */
async function fetchArticlesCollection(): Promise<Article[]> {
	'use cache';
	cacheLife('hours');
	cacheTag('articles');

	const res = await fetchWithBypassRetry(`${BASE_URL}/articles`);

	if (!res.ok) {
		throw new Error(
			`[All Articles API] Status ${res.status}: ${res.statusText}`,
		);
	}

	const json: ArticlesResponse = await res.json();
	return json.success ? json.data : [];
}

/**
 * Fetches the latest breaking news item from the news API.
 * Used for rendering the breaking news banner at the top of pages.
 * Throws on non-OK responses so callers can handle errors via error boundaries.
 * @async
 * @returns {Promise<BreakingNewsItem|null>} The breaking news item or null if unavailable
 * @throws {Error} When the API returns a non-OK status after retries or the request fails
 */
export async function getBreakingNews(): Promise<BreakingNewsItem | null> {
	const res = await fetchWithBypassRetry(`${BASE_URL}/breaking-news`);

	if (!res.ok) {
		throw new Error(
			`[Breaking News API] Status ${res.status}: ${res.statusText}`,
		);
	}

	const json: BreakingNewsResponse = await res.json();
	return json.success ? json.data : null;
}

/**
 * Fetches all articles and paginates them locally.
 * The API returns all articles in a single response; pagination is computed client-side.
 * Cached with 'hours' profile — article list changes infrequently.
 * @async
 * @param {number} page - 1-based page number
 * @param {number} pageSize - Number of articles per page (default 12)
 * @returns {Promise<{ articles: Article[]; meta: PaginationMeta }>} Sliced articles and computed pagination metadata
 * @throws {Error} When the API returns a non-OK status or the request fails
 */
export async function getAllArticles(
	page = 1,
	pageSize = 12,
): Promise<{ articles: Article[]; meta: PaginationMeta }> {
	const all = await fetchArticlesCollection();

	const total = all.length;
	const totalPages = Math.max(1, Math.ceil(total / pageSize));
	const safePage = Math.min(Math.max(1, page), totalPages);
	const start = (safePage - 1) * pageSize;

	return {
		articles: all.slice(start, start + pageSize),
		meta: { page: safePage, pageSize, total, totalPages },
	};
}

/**
 * Returns the unique sorted categories derived from the cached article collection.
 * Used to populate the category filter dropdown on the search page.
 * @async
 * @returns {Promise<string[]>} Sorted array of unique category names
 */
export async function getArticleCategories(): Promise<string[]> {
	const allArticles = await fetchArticlesCollection();
	return Array.from(
		new Set(
			allArticles.map((article) => article.category.trim()).filter(Boolean),
		),
	).sort((left, right) => left.localeCompare(right));
}

/**
 * Fetches article data for the search page.
 * Uses the cached article collection, derives unique categories, returns the
 * newest articles by default, and filters server-side from URL params when the
 * user performs a search.
 * @async
 * @param {string} query - Free-text search query
 * @param {string} category - Optional exact category filter
 * @param {number} limit - Max number of articles to return
 * @returns {Promise<{ articles: Article[]; categories: string[]; total: number; hasActiveSearch: boolean }>} Search-ready article data
 */
export async function getSearchArticlesData(
	query = '',
	category = '',
	limit = 5,
): Promise<{
	articles: Article[];
	categories: string[];
	total: number;
	hasActiveSearch: boolean;
}> {
	const allArticles = await fetchArticlesCollection();
	const normalizedQuery = query.trim().toLowerCase();
	const normalizedCategory = category.trim().toLowerCase();
	const hasActiveSearch =
		normalizedQuery.length > 0 || normalizedCategory.length > 0;

	const sortedArticles = [...allArticles].sort((left, right) => {
		return (
			new Date(right.publishedAt).getTime() -
			new Date(left.publishedAt).getTime()
		);
	});

	const categories = Array.from(
		new Set(
			allArticles.map((article) => article.category.trim()).filter(Boolean),
		),
	).sort((left, right) => left.localeCompare(right));

	const filteredArticles = sortedArticles.filter((article) => {
		const matchesCategory = normalizedCategory
			? article.category.toLowerCase() === normalizedCategory
			: true;

		const matchesQuery = normalizedQuery
			? [article.title, article.excerpt, article.category].some((value) =>
					value.toLowerCase().includes(normalizedQuery),
				)
			: true;

		return matchesCategory && matchesQuery;
	});

	const matchingArticles = hasActiveSearch ? filteredArticles : sortedArticles;

	return {
		articles: matchingArticles.slice(0, limit),
		categories,
		total: matchingArticles.length,
		hasActiveSearch,
	};
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
	const res = await fetchWithBypassRetry(`${BASE_URL}/articles/${encodedSlug}`);

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
	const res = await fetchWithBypassRetry(`${BASE_URL}/articles/trending`);

	if (!res.ok) {
		throw new Error(
			`[Trending Articles API] Status ${res.status}: ${res.statusText}`,
		);
	}

	const json: TrendingArticlesResponse = await res.json();
	return json.success ? json.data : [];
}
