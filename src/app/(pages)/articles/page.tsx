import type { Metadata } from 'next';
import ArticleCard from '@/components/features/article/ArticleCard';
import Pagination from '@/components/ui/atoms/Pagination';
import { getAllArticles } from '@/services/newsApi';

const PAGE_SIZE = 12;

interface AllArticlesPageProps {
	searchParams: Promise<Record<string, string | string[]>>;
}

export const metadata: Metadata = {
	title: 'All Articles',
	description:
		'Browse all articles — changelogs, engineering deep dives, customer stories, and community updates from the Vercel team.',
	openGraph: {
		title: 'All Articles | The Vercel Daily',
		description:
			'Browse all articles — changelogs, engineering deep dives, customer stories, and community updates from the Vercel team.',
		url: '/articles',
	},
};

/**
 * All articles page with server-side pagination.
 * Reads the ?page search param to determine which page to fetch.
 * Falls back to page 1 for invalid or missing values.
 * @async
 * @param {AllArticlesPageProps} props - Page props including async searchParams
 * @returns {Promise<React.ReactNode>} The articles grid with pagination controls
 */
export default async function AllArticlesPage({
	searchParams,
}: AllArticlesPageProps) {
	const params = await searchParams;
	const rawPage = params.page;
	const currentPage = Math.max(
		1,
		Number(Array.isArray(rawPage) ? rawPage[0] : (rawPage ?? '1')) || 1,
	);

	const { articles, meta } = await getAllArticles(currentPage, PAGE_SIZE);

	return (
		<main className="px-8 py-12 md:px-16 md:py-16 lg:px-24">
			{/* Header */}
			<div className="mb-8">
				<h1 className="mb-1 text-3xl font-black tracking-tight">Articles</h1>
				<p className="text-sm text-foreground/50">
					{meta.total > 0
						? `${meta.total} article${meta.total !== 1 ? 's' : ''}`
						: 'All articles'}
				</p>
			</div>

			{/* Articles grid */}
			{articles.length === 0 ? (
				<div className="rounded-2xl border border-foreground/10 bg-foreground/3 px-6 py-10 text-center">
					<p className="text-base font-medium text-foreground/70">
						No articles found.
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{articles.map((article) => (
						<ArticleCard key={article.id} article={article} />
					))}
				</div>
			)}

			{/* Pagination */}
			{meta.totalPages > 1 && (
				<div className="mt-12 flex justify-center">
					<Pagination
						currentPage={currentPage}
						totalPages={meta.totalPages}
						basePath="/articles"
					/>
				</div>
			)}
		</main>
	);
}
