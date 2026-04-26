/**
 * Vercel API bypass token for protected endpoints.
 * Loaded from NEWS_API_BYPASS_TOKEN environment variable.
 * Used during development/preview environments to bypass Vercel protection.
 * Empty string if not configured (won't bypass if missing).
 * @type {string}
 */
export const API_BYPASS_TOKEN = process.env.NEWS_API_BYPASS_TOKEN || '';

/**
 * Constructs a URL with Vercel bypass cookie and protection token as query parameters.
 * Used as a fallback when header-based bypass fails with 401 responses.
 * Automatically detects existing query string and uses appropriate separator (? or &).
 *
 * @param {string} baseUrl - The base URL to append bypass params to (should not already have bypass params)
 * @param {string} token - The bypass token to include in the request
 * @returns {string} URL string with bypass params appended in the format:
 *                   ?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass={token}
 *                   or &x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass={token}
 * @example
 * buildBypassUrl('https://api.example.com/articles', 'secret123')
 * // Returns: 'https://api.example.com/articles?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=secret123'
 */
export function buildBypassUrl(baseUrl: string, token: string): string {
	const separator = baseUrl.includes('?') ? '&' : '?';
	return `${baseUrl}${separator}x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${encodeURIComponent(token)}`;
}
