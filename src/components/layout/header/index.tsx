import Image from 'next/image';
import Link from 'next/link';
import NavLink from '@/components/ui/atoms/NavLink';
import ThemeToggle from './components/ThemeToggle';
import SubscribeButton from './components/SubscribeButton';

/**
 * Header component providing site navigation and theme/subscription controls.
 * Sticky header displayed at the top of all pages with logo, navigation links,
 * and user controls for theme toggling and subscription management.
 * @returns {React.ReactNode} The header navigation element
 */
export default function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-(--header-border) bg-(--header-bg) transition-colors duration-300">
			<div className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-4">
				{/* Logo */}
				<Link
					href="/"
					className="flex items-center gap-2 font-semibold text-foreground transition-colors"
				>
					<Image
						src="/icons/logo.svg"
						alt="Vercel Daily"
						width={18}
						height={18}
						className="dark:invert"
					/>
					<span>Vercel Daily</span>
				</Link>

				{/* Nav links */}
				<nav className="flex items-center gap-6">
					<NavLink href="/">Home</NavLink>
					<NavLink href="/search">Search</NavLink>
				</nav>

				{/* Right side */}
				<div className="ml-auto flex items-center gap-2">
					<SubscribeButton />
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
