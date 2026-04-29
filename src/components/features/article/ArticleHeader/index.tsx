import Image from 'next/image';
import { format, isValid, parseISO } from 'date-fns';
import type { ArticleDetail } from '@/types/api';

interface ArticleHeaderProps {
	article: ArticleDetail;
}

function formatPublishedDate(publishedAt: string): string {
	const parsedDate = parseISO(publishedAt);
	return isValid(parsedDate)
		? format(parsedDate, 'MMMM d, yyyy')
		: 'Unknown date';
}

function getInitials(name: string): string {
	return name
		.split(' ')
		.map((part) => part[0])
		.filter(Boolean)
		.slice(0, 2)
		.join('')
		.toUpperCase();
}

export default function ArticleHeader({ article }: ArticleHeaderProps) {
	const formattedDate = formatPublishedDate(article.publishedAt);
	const initials = getInitials(article.author.name);

	return (
		<header className="mb-10 border-b border-foreground/10 pb-10">
			<div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-foreground/55">
				<span className="rounded-full bg-foreground/5 px-3 pl-0 py-1 text-foreground/70">
					{article.category}
				</span>
				<time dateTime={article.publishedAt}>{formattedDate}</time>
			</div>

			<h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
				{article.title}
			</h1>

			<p className="mt-5 max-w-3xl text-lg leading-8 text-foreground/70">
				{article.excerpt}
			</p>

			<div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-foreground/65">
				<div className="flex items-center gap-3">
					{article.author.avatar ? (
						<Image
							src={article.author.avatar}
							alt={article.author.name}
							width={40}
							height={40}
							className="rounded-full border border-foreground/10 object-cover"
						/>
					) : (
						<div className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 text-xs font-semibold text-foreground/70">
							{initials}
						</div>
					)}
					<div>
						<p className="font-medium text-foreground">{article.author.name}</p>
						<p className="text-foreground/50">Author</p>
					</div>
				</div>

				{article.tags.length > 0 && (
					<ul className="flex flex-wrap items-center gap-2">
						{article.tags.map((tag) => (
							<li
								key={tag}
								className="rounded-full border border-foreground/10 px-3 py-1 text-xs font-medium text-foreground/60"
							>
								{tag}
							</li>
						))}
					</ul>
				)}
			</div>

			<div className="relative mt-10 aspect-video overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/5">
				<Image
					src={article.image}
					alt={article.title}
					fill
					priority
					className="object-cover"
					sizes="(max-width: 1024px) 100vw, 900px"
				/>
			</div>
		</header>
	);
}
