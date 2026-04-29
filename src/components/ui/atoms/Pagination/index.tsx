'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/cn';

interface PaginationProps {
	/** Current active page (1-based) */
	currentPage: number;
	/** Total number of pages */
	totalPages: number;
	/** Base path for page links, e.g. '/articles' */
	basePath: string;
	className?: string;
	onNavigate?: (href: string) => void;
	disabled?: boolean;
}

/**
 * Returns the href for a given page number.
 * Page 1 omits the query param for clean URLs.
 */
function pageHref(basePath: string, page: number): string {
	return page === 1 ? basePath : `${basePath}?page=${page}`;
}

/**
 * Generates the list of page numbers/ellipses to display.
 * Shows at most 7 items, with ellipsis collapsing distant ranges.
 */
function getPageNumbers(current: number, total: number): (number | '...')[] {
	if (total <= 7) {
		return Array.from({ length: total }, (_, i) => i + 1);
	}
	if (current <= 4) {
		return [1, 2, 3, 4, 5, '...', total];
	}
	if (current >= total - 3) {
		return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
	}
	return [1, '...', current - 1, current, current + 1, '...', total];
}

const itemBase =
	'flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-colors';

/**
 * Reusable pagination control for navigating multi-page lists.
 * Uses URL-based navigation (search param ?page=N) for SSR compatibility.
 * Renders nothing when totalPages is 1 or less.
 *
 * @param {PaginationProps} props - Pagination configuration
 * @returns {React.ReactNode|null} The pagination nav or null when not needed
 */
export default function Pagination({
	currentPage,
	totalPages,
	basePath,
	className,
	onNavigate,
	disabled = false,
}: PaginationProps) {
	const router = useRouter();

	if (totalPages <= 1) return null;

	const hasPrev = currentPage > 1;
	const hasNext = currentPage < totalPages;
	const pages = getPageNumbers(currentPage, totalPages);

	function navigate(href: string) {
		if (onNavigate) {
			onNavigate(href);
			return;
		}

		router.push(href);
	}

	return (
		<nav
			aria-label="Pagination"
			className={cn('flex items-center gap-1', className)}
		>
			{/* Previous */}
			{hasPrev ? (
				<button
					type="button"
					aria-label="Previous page"
					disabled={disabled}
					onClick={() => navigate(pageHref(basePath, currentPage - 1))}
					className={cn(
						itemBase,
						'border border-foreground/20 text-foreground hover:bg-foreground/5 disabled:cursor-wait disabled:opacity-60',
					)}
				>
					<Image
						src="/icons/arrow-left.svg"
						alt=""
						width={14}
						height={14}
						className="dark:invert"
					/>
				</button>
			) : (
				<span
					aria-disabled="true"
					aria-label="Previous page"
					className={cn(
						itemBase,
						'border border-foreground/10 text-foreground/30',
					)}
				>
					<Image
						src="/icons/arrow-left.svg"
						alt=""
						width={14}
						height={14}
						className="opacity-40 dark:invert"
					/>
				</span>
			)}

			{/* Page numbers */}
			{pages.map((page, i) =>
				page === '...' ? (
					<span
						key={`ellipsis-${i}`}
						className="flex h-9 w-9 items-center justify-center text-sm text-foreground/40"
					>
						&hellip;
					</span>
				) : (
					<button
						key={page}
						type="button"
						aria-current={page === currentPage ? 'page' : undefined}
						disabled={disabled || page === currentPage}
						onClick={() => navigate(pageHref(basePath, page as number))}
						className={cn(
							itemBase,
							page === currentPage
								? 'bg-foreground font-semibold text-background'
								: 'border border-foreground/20 text-foreground hover:bg-foreground/5 disabled:cursor-wait disabled:opacity-60',
						)}
					>
						{page}
					</button>
				),
			)}

			{/* Next */}
			{hasNext ? (
				<button
					type="button"
					aria-label="Next page"
					disabled={disabled}
					onClick={() => navigate(pageHref(basePath, currentPage + 1))}
					className={cn(
						itemBase,
						'border border-foreground/20 text-foreground hover:bg-foreground/5 disabled:cursor-wait disabled:opacity-60',
					)}
				>
					<Image
						src="/icons/arrow-right.svg"
						alt=""
						width={14}
						height={14}
						className="dark:invert"
					/>
				</button>
			) : (
				<span
					aria-disabled="true"
					aria-label="Next page"
					className={cn(
						itemBase,
						'border border-foreground/10 text-foreground/30',
					)}
				>
					<Image
						src="/icons/arrow-right.svg"
						alt=""
						width={14}
						height={14}
						className="opacity-40 dark:invert"
					/>
				</span>
			)}
		</nav>
	);
}
