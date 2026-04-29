import { useCallback, useEffect, useSyncExternalStore } from 'react';

/**
 * Gets theme value from localStorage.
 * @returns {string|null} Stored value or null if not set
 */
function getStoredTheme(): string | null {
	if (typeof window === 'undefined') return null;
	return window.localStorage.getItem('theme');
}

/**
 * Stores the current theme in localStorage.
 * @param {string} value - Theme value
 */
function setStoredTheme(value: string): void {
	if (typeof window === 'undefined') return;
	window.localStorage.setItem('theme', value);
}

/**
 * Subscribes to theme changes via storage-like events.
 * Enables cross-tab synchronization of theme preference.
 * @param {Function} callback - Function to call when storage changes
 * @returns {Function} Unsubscribe function to remove event listener
 */
function subscribeToStorage(callback: () => void) {
	window.addEventListener('storage', callback);
	window.addEventListener('theme-change', callback as EventListener);
	return () => {
		window.removeEventListener('storage', callback);
		window.removeEventListener('theme-change', callback as EventListener);
	};
}

/**
 * Gets current theme preference from localStorage.
 * Returns true for dark mode, false for light mode.
 * @returns {boolean} True if dark mode is enabled, false otherwise
 */
function getSnapshot() {
	const stored = getStoredTheme();
	return stored ? stored === 'dark' : true;
}

/**
 * Gets theme snapshot for server-side rendering.
 * Returns the initial theme state to match server-rendered HTML and prevent hydration mismatch.
 * @param {boolean} initialIsDark - The initial dark mode state from the server
 * @returns {boolean} The initial dark mode state for hydration
 */
function getServerSnapshot(initialIsDark: boolean) {
	return initialIsDark;
}

/**
 * Hook for managing theme state across the application.
 * Syncs theme preference from localStorage with document-wide dark mode.
 * Uses useSyncExternalStore for SSR-safe external store management.
 * Persists across browser restarts via localStorage.
 * Listens to storage events for cross-tab theme synchronization.
 * @returns {{isDark: boolean, toggle: () => void}} Current theme state and toggle function
 */
export function useTheme(initialIsDark: boolean) {
	const isDark = useSyncExternalStore(subscribeToStorage, getSnapshot, () =>
		getServerSnapshot(initialIsDark),
	);

	useEffect(() => {
		document.documentElement.classList.toggle('dark', isDark);
	}, [isDark]);

	const toggle = useCallback(() => {
		const next = !isDark;
		setStoredTheme(next ? 'dark' : 'light');
		window.dispatchEvent(new Event('theme-change'));
	}, [isDark]);

	return { isDark, toggle };
}
