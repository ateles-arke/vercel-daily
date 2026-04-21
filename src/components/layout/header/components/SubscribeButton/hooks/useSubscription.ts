import { useCallback, useSyncExternalStore } from 'react';

/**
 * Subscribes to browser storage events for subscription changes.
 * Enables cross-tab synchronization of subscription preference.
 * @param {Function} callback - Function to call when storage changes
 * @returns {Function} Unsubscribe function to remove event listener
 */
function subscribeToStorage(callback: () => void) {
	window.addEventListener('storage', callback);
	return () => window.removeEventListener('storage', callback);
}

/**
 * Gets current subscription preference from localStorage.
 * Returns true if user is subscribed, false otherwise.
 * @returns {boolean} True if user is subscribed, false otherwise
 */
function getSnapshot() {
	return localStorage.getItem('subscribed') === 'true';
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
 * Syncs subscription preference from localStorage and persists user choice.
 * Uses useSyncExternalStore for SSR-safe external store management.
 * Listens to storage events for cross-tab subscription synchronization.
 * @returns {{isSubscribed: boolean, subscribe: () => void, unsubscribe: () => void}} Subscription state and control functions
 */
export function useSubscription() {
	const isSubscribed = useSyncExternalStore(subscribeToStorage, getSnapshot, getServerSnapshot);

	const subscribe = useCallback(() => {
		localStorage.setItem('subscribed', 'true');
		window.dispatchEvent(new Event('storage'));
	}, []);

	const unsubscribe = useCallback(() => {
		localStorage.setItem('subscribed', 'false');
		window.dispatchEvent(new Event('storage'));
	}, []);

	return { isSubscribed, subscribe, unsubscribe };
}
