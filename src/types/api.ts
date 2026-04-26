/**\n * Structure of a single breaking news item from the news API.\n * Contains all information needed to display a breaking news alert.\n * @interface BreakingNewsItem\n */
export interface BreakingNewsItem {
	id: string;
	headline: string;
	summary: string;
	articleId: string;
	category: string;
	publishedAt: string;
	urgent: boolean;
}

/**\n * API response structure for breaking news endpoint.\n * Includes success status and the breaking news data payload.\n * @interface BreakingNewsResponse\n */
export interface BreakingNewsResponse {
	success: boolean;
	data: BreakingNewsItem;
}

/**
 * Structure of a single article from the news API.
 * Used for featured article grids and article detail pages.
 * @interface Article
 */
export interface Article {
	id: string;
	slug: string;
	title: string;
	excerpt: string;
	category: string;
	publishedAt: string;
	image: string;
	featured: boolean;
}

/**
 * API response structure for the articles list endpoint.
 * @interface ArticlesResponse
 */
export interface ArticlesResponse {
	success: boolean;
	data: Article[];
}
