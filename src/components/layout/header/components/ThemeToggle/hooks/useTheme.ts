import { useCallback, useLayoutEffect, useSyncExternalStore } from 'react';

/**
 * Gets theme value from cookies.
 * @returns {string|null} Cookie value or null if not set
 */
function getCookieValue(name: string): string | null {
	if (typeof document === 'undefined') return null;
	const nameEQ = name + '=';
	const cookies = document.cookie.split(';');
	for (let cookie of cookies) {
		cookie = cookie.trim();
		if (cookie.startsWith(nameEQ)) {
			return decodeURIComponent(cookie.substring(nameEQ.length));
		}
	}
	return null;
}

/**
 * Sets theme value in a session cookie.
 * Session cookies are deleted when the browser closes.
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 */
function setCookie(name: string, value: string): void {
	if (typeof document === 'undefined') return;
	document.cookie = `${name}=${encodeURIComponent(value)}; path=/`;
}

/**
 * Subscribes to cookie changes via storage events.
 * Enables cross-tab synchronization of theme preference.
 * @param {Function} callback - Function to call when storage changes
 * @returns {Function} Unsubscribe function to remove event listener
 */
function subscribeToStorage(callback: () => void) {
	window.addEventListener('storage', callback);
	return () => window.removeEventListener('storage', callback);
}

/**
 * Gets current theme preference from session cookie.
 * Returns true for dark mode, false for light mode.
 * @returns {boolean} True if dark mode is enabled, false otherwise
 */
function getSnapshot() {
	const stored = getCookieValue('theme');
	return stored ? stored === 'dark' : true;
}

/**
 * Gets theme snapshot for server-side rendering.
 * Always returns false to avoid hydration mismatch.
 * @returns {boolean} Always false for SSR safety
 */
function getServerSnapshot(initialIsDark: boolean) {
	return initialIsDark;
}

/**
 * Hook for managing theme state across the application.
 * Syncs theme preference from session cookies with document-wide dark mode.
 * Uses useSyncExternalStore for SSR-safe external store management.
 * Persists only within the current browser session (survives refresh, not browser close).
 * Listens to storage events for cross-tab theme synchronization.
 * @returns {{isDark: boolean, toggle: () => void}} Current theme state and toggle function
 */
export function useTheme(initialIsDark: boolean) {
	const isDark = useSyncExternalStore(subscribeToStorage, getSnapshot, () =>
		getServerSnapshot(initialIsDark),
	);

	useLayoutEffect(() => {
		document.documentElement.classList.toggle('dark', isDark);
	}, [isDark]);

	const toggle = useCallback(() => {
		const next = !isDark;
		setCookie('theme', next ? 'dark' : 'light');
		window.dispatchEvent(new Event('storage'));
	}, [isDark]);

	return { isDark, toggle };
}
