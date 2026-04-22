import { useCallback, useSyncExternalStore } from 'react';

/**
 * Gets subscription value from cookies.
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
 * Sets subscription value in a session cookie.
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
 * Enables cross-tab synchronization of subscription preference.
 * @param {Function} callback - Function to call when storage changes
 * @returns {Function} Unsubscribe function to remove event listener
 */
function subscribeToStorage(callback: () => void) {
	window.addEventListener('storage', callback);
	return () => window.removeEventListener('storage', callback);
}

/**
 * Gets current subscription preference from session cookie.
 * Returns true if user is subscribed, false otherwise.
 * @returns {boolean} True if user is subscribed, false otherwise
 */
function getSnapshot() {
	return getCookieValue('subscribed') === 'true';
}

/**
 * Gets subscription snapshot for server-side rendering.
 * Always returns false to avoid hydration mismatch.
 * @returns {boolean} Always false for SSR safety
 */
function getServerSnapshot() {
	return false;
}

/**
 * Hook for managing user subscription state.
 * Syncs subscription preference from session cookies.
 * Uses useSyncExternalStore for SSR-safe external store management.
 * Persists only within the current browser session (survives refresh, not browser close).
 * Listens to storage events for cross-tab subscription synchronization.
 * @returns {{isSubscribed: boolean, subscribe: () => void, unsubscribe: () => void}} Subscription state and control functions
 */
export function useSubscription() {
	const isSubscribed = useSyncExternalStore(
		subscribeToStorage,
		getSnapshot,
		getServerSnapshot,
	);

	const subscribe = useCallback(() => {
		setCookie('subscribed', 'true');
		window.dispatchEvent(new Event('storage'));
	}, []);

	const unsubscribe = useCallback(() => {
		setCookie('subscribed', 'false');
		window.dispatchEvent(new Event('storage'));
	}, []);

	return { isSubscribed, subscribe, unsubscribe };
}
