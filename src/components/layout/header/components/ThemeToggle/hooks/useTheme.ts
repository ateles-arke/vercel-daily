import { useEffect, useState } from 'react';

function getInitialTheme(): boolean {
  if (typeof window === 'undefined') return true;
  const stored = localStorage.getItem('theme');
  return stored ? stored === 'dark' : true;
}

export function useTheme() {
  const [isDark, setIsDark] = useState(() => getInitialTheme());

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  function toggle() {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  }

  return { isDark, toggle, mounted: true };
}
