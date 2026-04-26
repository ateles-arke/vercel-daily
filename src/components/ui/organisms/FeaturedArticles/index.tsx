import { cacheLife, cacheTag } from 'next/cache';
import Link from 'next/link';
import ArticleCard from '@/components/shared/ArticleCard';
import { getFeaturedArticles } from '@/services/newsApi';
import NoArticlesFound from '@/components/ui/organisms/FeaturedArticles/components/NoArticlesFound';

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

	// Throws on API failure — error.tsx boundary handles it
	const articles = await getFeaturedArticles();

	if (articles.length === 0) {
		return <NoArticlesFound />;
	}

	return (
		<section className="px-8 md:px-16 lg:px-24 py-12 md:py-16">
			{/* Section header */}
			<div className="flex items-start justify-between mb-8">
				<div>
					<h2 className="text-2xl font-bold mb-1">Featured</h2>
					<p className="text-sm text-foreground/50">
						Handpicked stories from the team.
					</p>
				</div>
				<Link
					href="/articles"
					className="text-sm text-foreground/50 hover:text-foreground transition-colors mt-1"
				>
					View all
				</Link>
			</div>

			{/* Articles grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{articles.slice(0, 6).map((article) => (
				<ArticleCard key={article.id} article={article} />
				))}
			</div>
		</section>
	);
}
