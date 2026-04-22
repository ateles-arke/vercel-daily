'use client';

import Image from 'next/image';
import { useTheme } from './hooks/useTheme';

/**
 * Theme toggle button allowing users to switch between light and dark modes.
 * Displays moon icon in dark mode and sun icon in light mode.
 * Persists theme preference to session cookies and applies CSS class to document root.
 * @returns {React.ReactNode} The theme toggle button element
 */
export default function ThemeToggle() {
	const { isDark, toggle } = useTheme();

	return (
		<button
			onClick={toggle}
			aria-label="Toggle theme"
			className="rounded-md p-2 text-foreground/60 transition-colors hover:bg-foreground/5 hover:text-foreground"
		>
			<Image
				src={isDark ? '/icons/moon.svg' : '/icons/sun.svg'}
				alt={isDark ? 'Dark mode' : 'Light mode'}
				width={16}
				height={16}
				className="dark:invert"
			/>
		</button>
	);
}
