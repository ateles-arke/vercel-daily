import Image from 'next/image';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import type { Article } from '@/types/api';

interface ArticleCardProps {
	article: Article;
}

/**
 * Card component displaying a single article with image, category, date, headline, and summary.
 * Links headline to the article detail page via slug.
 * Feature-specific component (article routing logic) — kept in shared/ not ui/.
 * @param {ArticleCardProps} props - The article data to display
 * @returns {React.ReactNode} The article card element
 */
export default function ArticleCard({ article }: ArticleCardProps) {
	const { slug, title, excerpt, category, publishedAt, image } = article;
	const formattedDate = format(parseISO(publishedAt), 'MMM d, yyyy');

	return (
		<article className="flex flex-col">
			{/* Article Image */}
			<Link href={`/articles/${slug}`} className="block mb-4 overflow-hidden rounded-lg aspect-video relative bg-foreground/5">
				<Image
					src={image}
					alt={title}
					fill
					className="object-cover transition-transform duration-300 hover:scale-105"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
				/>
			</Link>

			{/* Meta: category · date */}
			<div className="mb-2 flex items-center gap-2 text-xs font-medium text-foreground/50 uppercase tracking-wide">
				<span>{category}</span>
				<span>·</span>
				<time dateTime={publishedAt}>{formattedDate}</time>
			</div>

			{/* Title */}
			<h3 className="mb-2 text-base font-semibold leading-snug">
				<Link
					href={`/articles/${slug}`}
					className="hover:underline underline-offset-2"
				>
					{title}
				</Link>
			</h3>

			{/* Excerpt */}
			<p className="text-sm text-foreground/60 leading-relaxed line-clamp-3">
				{excerpt}
			</p>
		</article>
	);
}
