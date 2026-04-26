interface ThemeConfig {
	className: string;
	isDark: boolean;
}

/**
 * Resolves the initial theme configuration for the HTML root element and Header.
 * Defaults to dark mode if no theme cookie is set.
 * @param {string} baseClassName - Base className containing font variables (e.g., "var-sans var-mono h-full antialiased")
 * @param {string|null} themeCookieValue - Theme value from cookies
 * @returns {ThemeConfig} Object containing the complete HTML className and isDark boolean for header initialization
 */
export function getInitialThemeConfig(
	baseClassName: string,
	themeCookieValue: string | null,
): ThemeConfig {
	const isDark = themeCookieValue ? themeCookieValue === 'dark' : true;

	return {
		className: isDark ? `${baseClassName} dark` : baseClassName,
		isDark,
	};
}
