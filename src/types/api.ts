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
 * Article author metadata for attribution.
 * Contains author name and profile image.
 * @interface ArticleAuthor
 */
export interface ArticleAuthor {
	name: string;
	avatar: string;
}

/**
 * Paragraph content block for article body.
 * Represents a single paragraph of text content.
 * @interface ArticleParagraphBlock
 */
export interface ArticleParagraphBlock {
	type: 'paragraph';
	text: string;
}

/**
 * Heading content block for article structure.
 * Supports heading levels (1-6) for semantic markup.
 * @interface ArticleHeadingBlock
 */
export interface ArticleHeadingBlock {
	type: 'heading';
	level: number;
	text: string;
}

/**
 * Unordered list content block for article body.
 * Renders as a bulleted list with multiple items.
 * @interface ArticleUnorderedListBlock
 */
export interface ArticleUnorderedListBlock {
	type: 'unordered-list';
	items: string[];
}

/**
 * Ordered list content block for article body.
 * Renders as a numbered list with multiple items.
 * @interface ArticleOrderedListBlock
 */
export interface ArticleOrderedListBlock {
	type: 'ordered-list';
	items: string[];
}

/**
 * Image content block for article body.
 * Includes image source, alt text for accessibility, and optional caption.
 * @interface ArticleImageBlock
 */
export interface ArticleImageBlock {
	type: 'image';
	src: string;
	alt?: string;
	caption?: string;
}

/**
 * Union type for all article content block types.
 * Used for rendering rich article body content with multiple block types.
 * @typedef ArticleContentBlock
 */
export type ArticleContentBlock =
	| ArticleParagraphBlock
	| ArticleHeadingBlock
	| ArticleUnorderedListBlock
	| ArticleOrderedListBlock
	| ArticleImageBlock;

export interface ArticleDetail extends Article {
	content: ArticleContentBlock[];
	author: ArticleAuthor;
	tags: string[];
}

/**
 * API response structure for the articles list endpoint.
 * @interface ArticlesResponse
 */
export interface ArticlesResponse {
	success: boolean;
	data: Article[];
}

/**
 * API response structure for single article detail endpoint.
 * Includes success status and full article data with content and metadata.
 * @interface ArticleDetailResponse
 */
export interface ArticleDetailResponse {
	success: boolean;
	data: ArticleDetail;
}

/**
 * API response structure for trending articles endpoint.
 * Returns a collection of trending articles with full detail and content.
 * @interface TrendingArticlesResponse
 */
export interface TrendingArticlesResponse {
	success: boolean;
	data: ArticleDetail[];
}
