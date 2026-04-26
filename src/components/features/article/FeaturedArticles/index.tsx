import { cacheLife, cacheTag } from 'next/cache';
import Link from 'next/link';
import ArticleCard from '@/components/features/article/ArticleCard';
import NoArticlesFound from '@/components/features/article/FeaturedArticles/components/NoArticlesFound';
import { getFeaturedArticles } from '@/services/newsApi';

/**
 * Featured articles section displaying a grid of at least 6 handpicked articles.
 * Fetches from the articles API with featured=true filter.
 * Cached with 'hours' profile — editorial content changes infrequently.
 * Supports on-demand invalidation via 'featured-articles' cache tag.
 * @async
 * @returns {Promise<React.ReactNode>} The featured articles grid section
 */
export default async function FeaturedArticles() {
	'use cache';
	cacheLife('hours');
	cacheTag('featured-articles');

	const articles = await getFeaturedArticles();

	if (articles.length === 0) {
		return <NoArticlesFound />;
	}

	return (
		<section className="px-8 py-12 md:px-16 md:py-16 lg:px-24">
			<div className="mb-8 flex items-start justify-between">
				<div>
					<h2 className="mb-1 text-2xl font-bold">Featured</h2>
					<p className="text-sm text-foreground/50">
						Handpicked stories from the team.
					</p>
				</div>
				<Link
					href="/articles"
					className="mt-1 text-sm text-foreground/50 transition-colors hover:text-foreground"
				>
					View all
				</Link>
			</div>

			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{articles.slice(0, 6).map((article) => (
					<ArticleCard key={article.id} article={article} />
				))}
			</div>
		</section>
	);
}
