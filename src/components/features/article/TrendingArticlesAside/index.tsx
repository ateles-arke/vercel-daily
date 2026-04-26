import Link from 'next/link';
import { format, isValid, parseISO } from 'date-fns';
import Button from '@/components/ui/atoms/Button';
import type { ArticleDetail } from '@/types/api';

interface TrendingArticlesAsideProps {
	articles: ArticleDetail[];
}

function formatPublishedDate(publishedAt: string): string {
	const parsedDate = parseISO(publishedAt);
	return isValid(parsedDate) ? format(parsedDate, 'MMM d, yyyy') : 'Unknown date';
}

export default function TrendingArticlesAside({
	articles,
}: TrendingArticlesAsideProps) {
	return (
		<aside className="space-y-8 lg:sticky lg:top-24">
			<section className="rounded-3xl border border-foreground/10 bg-foreground/3 p-6">
				<div className="mb-5 flex items-center justify-between">
					<h2 className="text-lg font-semibold text-foreground">Trending</h2>
					<span className="text-xs uppercase tracking-[0.22em] text-foreground/45">
						Now
					</span>
				</div>

				<div className="space-y-5">
					{articles.map((article) => (
						<article
							key={article.id}
							className="border-b border-foreground/10 pb-5 last:border-b-0 last:pb-0"
						>
							<p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/45">
								{article.category} · {formatPublishedDate(article.publishedAt)}
							</p>
							<h3 className="text-base font-semibold leading-6 text-foreground">
								<Link
									href={`/articles/${article.slug}`}
									className="transition-colors hover:text-foreground/70"
								>
									{article.title}
								</Link>
							</h3>
							<p className="mt-2 line-clamp-3 text-sm leading-6 text-foreground/60">
								{article.excerpt}
							</p>
						</article>
					))}
				</div>
			</section>

			<section className="rounded-3xl border border-foreground/10 bg-background p-6 shadow-sm">
				<p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/45">
					Newsletter
				</p>
				<h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
					Subscribe for the next issue
				</h2>
				<p className="mt-3 text-sm leading-6 text-foreground/60">
					We will wire this CTA later. For now it holds the page layout and copy.
				</p>
				<div className="mt-5">
					<Button type="button" fullWidth>
						Subscribe
					</Button>
				</div>
			</section>
		</aside>
	);
}