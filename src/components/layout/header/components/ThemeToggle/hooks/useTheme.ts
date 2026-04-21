import { useCallback, useLayoutEffect, useSyncExternalStore } from 'react';

function subscribeToStorage(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getSnapshot() {
  const stored = localStorage.getItem('theme');
  return stored ? stored === 'dark' : true;
}

function getServerSnapshot() {
  return false;
}

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
