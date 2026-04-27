import { Suspense } from 'react';
import type { Metadata } from 'next';
import ArticleCard from '@/components/features/article/ArticleCard';
import SearchControls from '@/components/features/search/SearchControls';
import SearchPageSkeleton from '@/components/features/search/SearchPageSkeleton';
import BackButton from '@/components/shared/BackButton';
import { getSearchArticlesData } from '@/services/newsApi';

const MAX_RESULTS = 5;

interface SearchPageProps {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata: Metadata = {
	title: 'Search',
	description:
		'Search Vercel Daily articles by query and category, with URL-persistent results you can refresh or share.',
	openGraph: {
		title: 'Search | The Vercel Daily',
		description:
			'Search Vercel Daily articles by query and category, with URL-persistent results you can refresh or share.',
		url: '/search',
	},
};

function getSingleParam(value: string | string[] | undefined): string {
	return Array.isArray(value) ? (value[0] ?? '') : (value ?? '');
}

/**
 * Async search content driven by URL params.
 * Keeps the page shell static while controls/results stream in.
 * @async
 * @param {{ searchParams: Promise<Record<string, string | string[] | undefined>> }} props - Async route search params
 * @returns {Promise<React.ReactNode>} Search controls and article results
 */
async function SearchPageContent({
	searchParams,
}: {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
	const params = await searchParams;
	const query = getSingleParam(params.query).trim();
	const category = getSingleParam(params.category).trim();
	const { articles, categories, total, hasActiveSearch } =
		await getSearchArticlesData(query, category, MAX_RESULTS);

	const visibleCount = articles.length;
	const resultLabel = hasActiveSearch ? 'Search results' : 'Recent articles';
	const resultSummary = hasActiveSearch
		? total > 0
			? `Showing ${visibleCount} of ${total} matching article${total === 1 ? '' : 's'}.`
			: 'No matching articles found for the current filters.'
		: `Showing the ${visibleCount} most recent article${visibleCount === 1 ? '' : 's'}.`;

	return (
		<>
			<SearchControls
				key={`${query}::${category}`}
				categories={categories}
				initialQuery={query}
				initialCategory={category}
			/>

			<section className="mt-8">
				<div className="flex flex-col gap-3 border-b border-foreground/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<h2 className="text-2xl font-semibold tracking-tight text-foreground">
							{resultLabel}
						</h2>
						<p className="mt-2 text-sm text-foreground/55">{resultSummary}</p>
					</div>
					{hasActiveSearch && (
						<p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/45">
							{category ? `${category} filtered` : 'All categories'}
						</p>
					)}
				</div>

				{articles.length === 0 ? (
					<div className="mt-8 rounded-3xl border border-foreground/10 bg-foreground/3 px-6 py-12 text-center">
						<h3 className="text-xl font-semibold tracking-tight text-foreground">
							No articles found
						</h3>
						<p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-foreground/60">
							Try a broader term, remove the category filter, or search with at
							least three characters for automatic updates.
						</p>
					</div>
				) : (
					<div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
						{articles.map((article) => (
							<ArticleCard key={article.id} article={article} />
						))}
					</div>
				)}
			</section>
		</>
	);
}

/**
 * Search page for article discovery.
 * Uses URL search params as the source of truth so searches persist across reloads and shared links.
 * @param {SearchPageProps} props - Route search params
 * @returns {React.ReactNode} Search page shell with streamed content
 */
export default function SearchPage({ searchParams }: SearchPageProps) {
	return (
		<main className="px-8 py-12 md:px-16 md:py-16 lg:px-24">
			<BackButton className="mb-6" label="Back" />

			<div className="max-w-3xl">
				<p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/45">
					Search
				</p>
				<h1 className="mt-3 text-3xl font-black tracking-tight text-foreground">
					Find articles fast.
				</h1>
				<p className="mt-4 text-base leading-8 text-foreground/65 md:text-lg">
					Search by topic, phrase, or category. Results stay in the URL so
					refreshes and shared links preserve the same state.
				</p>
			</div>

			<Suspense fallback={<SearchPageSkeleton />}>
				<SearchPageContent searchParams={searchParams} />
			</Suspense>
		</main>
	);
}
