'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import ArticlesGridSkeleton from '@/components/features/article/ArticlesGridSkeleton';
import Pagination from '@/components/ui/atoms/Pagination';

interface ArticlesGridSectionProps {
	children: React.ReactNode;
	total: number;
	currentPage: number;
	totalPages: number;
	basePath: string;
}

/**
 * Client wrapper around the server-rendered articles grid.
 * Keeps the page shell stable while pagination swaps only the grid area
 * to a skeleton during client-side transitions.
 */
export default function ArticlesGridSection({
	children,
	total,
	currentPage,
	totalPages,
	basePath,
}: ArticlesGridSectionProps) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	function handleNavigate(href: string) {
		startTransition(() => {
			router.push(href, { scroll: false });
		});
	}

	return (
		<>
			<p className="mb-8 text-sm text-foreground/50">
				{total > 0 ? `${total} article${total !== 1 ? 's' : ''}` : '0 articles'}
			</p>

			{isPending ? (
				<ArticlesGridSkeleton showCount={false} showPagination={false} />
			) : (
				children
			)}

			{totalPages > 1 && (
				<div className="mt-12 flex justify-center">
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						basePath={basePath}
						onNavigate={handleNavigate}
						disabled={isPending}
					/>
				</div>
			)}
		</>
	);
}
