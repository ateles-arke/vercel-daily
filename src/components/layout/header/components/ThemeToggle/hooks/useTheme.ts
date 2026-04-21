import { useLayoutEffect, useState } from 'react';

function getStoredTheme(): boolean {
  const stored = localStorage.getItem('theme');
  return stored ? stored === 'dark' : true;
}

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return getStoredTheme();
  });

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  function toggle() {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  }

  return { isDark, toggle };
}
