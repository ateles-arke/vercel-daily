import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BackButton from '@/components/shared/BackButton';
import ArticleContent from '@/components/features/article/ArticleContent';
import ArticleHeader from '@/components/features/article/ArticleHeader';
import TrendingArticlesAside from '@/components/features/article/TrendingArticlesAside';
import { getArticleBySlug, getTrendingArticles } from '@/services/newsApi';

interface ArticlePageProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	const trendingArticles = await getTrendingArticles();

	return trendingArticles.slice(0, 10).map((article) => ({
		slug: article.slug,
	}));
}

export async function generateMetadata({
	params,
}: ArticlePageProps): Promise<Metadata> {
	const { slug } = await params;
	const article = await getArticleBySlug(slug);

	if (!article) {
		notFound();
	}

	return {
		title: article.title,
		description: article.excerpt,
		openGraph: {
			title: `${article.title} | The Vercel Daily`,
			description: article.excerpt,
			url: `/articles/${article.slug}`,
			images: [
				{
					url: article.image,
					alt: article.title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: `${article.title} | The Vercel Daily`,
			description: article.excerpt,
			images: [article.image],
		},
	};
}

export default async function ArticlePage({ params }: ArticlePageProps) {
	const { slug } = await params;
	const article = await getArticleBySlug(slug);

	if (!article) {
		notFound();
	}

	const trendingArticles = await getTrendingArticles();
	const sidebarArticles = trendingArticles
		.filter((trendingArticle) => trendingArticle.slug !== article.slug)
		.slice(0, 4);

	return (
		<main className="px-8 py-12 md:px-16 md:py-16 lg:px-24">
			<div className="mx-auto max-w-360">
				<BackButton className="mb-8" label="Back" />

				<div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
					<article className="min-w-0">
						<ArticleHeader article={article} />
						<ArticleContent content={article.content} />
					</article>

					<TrendingArticlesAside articles={sidebarArticles} />
				</div>
			</div>
		</main>
	);
}
