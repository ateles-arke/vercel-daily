import { useCallback, useLayoutEffect, useSyncExternalStore } from 'react';

/**
 * Subscribes to browser storage events for theme changes.
 * Enables cross-tab synchronization of theme preference.
 * @param {Function} callback - Function to call when storage changes
 * @returns {Function} Unsubscribe function to remove event listener
 */
function subscribeToStorage(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

/**
 * Gets current theme preference from localStorage.
 * Returns true for dark mode, false for light mode.
 * @returns {boolean} True if dark mode is enabled, false otherwise
 */
function getSnapshot() {
  const stored = localStorage.getItem('theme');
  return stored ? stored === 'dark' : true;
}

/**
 * Gets theme snapshot for server-side rendering.
 * Always returns false to avoid hydration mismatch.
 * @returns {boolean} Always false for SSR safety
 */
function getServerSnapshot() {
  return false;
}

/**
 * Hook for managing theme state across the application.
 * Syncs theme preference from localStorage with document-wide dark mode.
 * Uses useSyncExternalStore for SSR-safe external store management.
 * Listens to storage events for cross-tab theme synchronization.
 * @returns {{isDark: boolean, toggle: () => void}} Current theme state and toggle function
 */
export function useTheme() {
  const isDark = useSyncExternalStore(subscribeToStorage, getSnapshot, getServerSnapshot);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggle = useCallback(() => {
    const next = !isDark;
    localStorage.setItem('theme', next ? 'dark' : 'light');
    window.dispatchEvent(new Event('storage'));
  }, [isDark]);

  return { isDark, toggle };
}
