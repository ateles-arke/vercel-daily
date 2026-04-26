/**
 * Vercel API bypass configuration
 * Used for requests to protected API endpoints during development/preview
 */
export const API_BYPASS_TOKEN = process.env.NEWS_API_BYPASS_TOKEN || '';

/**
 * Build a URL with Vercel bypass cookie and protection token as query parameters
 * Used as a fallback when header-based bypass fails (401 response)
 * @param baseUrl The base URL to append bypass params to
 * @param token The bypass token
 * @returns URL string with bypass params appended
 */
export function buildBypassUrl(baseUrl: string, token: string): string {
	const separator = baseUrl.includes('?') ? '&' : '?';
	return `${baseUrl}${separator}x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${encodeURIComponent(token)}`;
}
