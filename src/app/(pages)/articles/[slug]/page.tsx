import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import BackButton from '@/components/shared/BackButton';
import ArticleContent from '@/components/features/article/ArticleContent';
import ArticleHeader from '@/components/features/article/ArticleHeader';
import ArticlePaywall from '@/components/features/article/ArticlePaywall';
import TrendingArticlesAside from '@/components/features/article/TrendingArticlesAside';
import { getSubscriptionStateFromCookies } from '@/lib/subscription';
import { getArticleBySlug, getTrendingArticles } from '@/services/newsApi';

interface ArticlePageProps {
	params: Promise<{ slug: string }>;
}

function getPaywallTeaser(
	article: Awaited<ReturnType<typeof getArticleBySlug>>,
) {
	if (!article) {
		return '';
	}

	const firstParagraph = article.content.find(
		(block) => block.type === 'paragraph',
	);
	return firstParagraph?.text ?? article.excerpt;
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
	const { isSubscribed } = getSubscriptionStateFromCookies(await cookies());

	if (!article) {
		notFound();
	}

	const trendingArticles = await getTrendingArticles();
	const sidebarArticles = trendingArticles
		.filter((trendingArticle) => trendingArticle.slug !== article.slug)
		.slice(0, 4);

	return (
		<main className="px-8 py-12 md:px-16 md:py-16 lg:px-24">
			<div className="mx-auto w-full max-w-[1320.8px]">
				<BackButton className="mb-8" label="Back" />

				<div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
					<article className="min-w-0">
						<ArticleHeader article={article} />
						{isSubscribed ? (
							<ArticleContent content={article.content} />
						) : (
							<div className="relative max-h-48 overflow-hidden">
								<p className="text-base leading-8 text-foreground/80">
									{getPaywallTeaser(article)}
								</p>
								<div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
							</div>
						)}
					</article>

					{isSubscribed ? (
						<TrendingArticlesAside articles={sidebarArticles} />
					) : (
						<aside className="self-start lg:sticky lg:top-24">
							<ArticlePaywall initialIsSubscribed={isSubscribed} />
						</aside>
					)}
				</div>
			</div>
		</main>
	);
}
