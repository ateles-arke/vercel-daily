import Image from 'next/image';
import Link from 'next/link';
import { format, isValid, parseISO } from 'date-fns';
import type { Article } from '@/types/api';

interface ArticleCardProps {
	article: Article;
	priority?: boolean;
}

/**
 * Card component displaying a single article with image, category, date, headline, and summary.
 * Links headline to the article detail page via slug.
 * Feature-specific component kept under components/features/article.
 * @param {ArticleCardProps} props - The article data to display
 * @returns {React.ReactNode} The article card element
 */
export default function ArticleCard({
	article,
	priority = false,
}: ArticleCardProps) {
	const { slug, title, excerpt, category, publishedAt, image } = article;
	const parsedDate = parseISO(publishedAt);
	const hasValidDate = isValid(parsedDate);
	const formattedDate = hasValidDate
		? format(parsedDate, 'MMM d, yyyy')
		: 'Unknown date';

	return (
		<article className="flex flex-col">
			<Link
				href={`/articles/${slug}`}
				className="relative mb-4 block aspect-video overflow-hidden rounded-lg bg-foreground/5"
			>
				<Image
					src={image}
					alt={title}
					fill
					priority={priority}
					fetchPriority={priority ? 'high' : 'auto'}
					loading={priority ? undefined : 'lazy'}
					className="object-cover transition-transform duration-300 hover:scale-105"
					sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
				/>
			</Link>

			<div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-foreground/50">
				<span>{category}</span>
				<span>·</span>
				<time dateTime={hasValidDate ? publishedAt : undefined}>
					{formattedDate}
				</time>
			</div>

			<h3 className="mb-2 text-base font-semibold leading-snug">
				<Link
					href={`/articles/${slug}`}
					className="underline-offset-2 hover:underline"
				>
					{title}
				</Link>
			</h3>

			<p className="line-clamp-3 text-sm leading-relaxed text-foreground/60">
				{excerpt}
			</p>
		</article>
	);
}
