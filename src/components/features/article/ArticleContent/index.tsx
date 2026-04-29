import Image from 'next/image';
import type { ArticleContentBlock } from '@/types/api';

interface ArticleContentProps {
	content: ArticleContentBlock[];
}

const ALLOWED_HREF_PROTOCOLS = ['https:', 'http:'];

function isSafeHref(href: string): boolean {
	try {
		const url = new URL(href);
		return ALLOWED_HREF_PROTOCOLS.includes(url.protocol);
	} catch {
		// Relative URLs (no protocol) are safe
		return href.startsWith('/') || href.startsWith('#');
	}
}

function renderInlineText(text: string) {
	const parts = text.split(/(\[[^\]]+\]\([^\)]+\)|`[^`]+`)/g);

	return parts.map((part, index) => {
		const linkMatch = part.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
		if (linkMatch) {
			const [, label, href] = linkMatch;

			if (!isSafeHref(href)) {
				return <span key={`unsafe-${index}`}>{label}</span>;
			}

			return (
				<a
					key={`${href}-${index}`}
					href={href}
					target="_blank"
					rel="noreferrer"
					className="font-medium text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-foreground/70"
				>
					{label}
				</a>
			);
		}

		if (part.startsWith('`') && part.endsWith('`')) {
			return (
				<code
					key={`code-${index}`}
					className="rounded-md bg-foreground/6 px-1.5 py-0.5 font-mono text-[0.95em] text-foreground"
				>
					{part.slice(1, -1)}
				</code>
			);
		}

		return part;
	});
}

function hasRenderableImageSource(src: string): boolean {
	return src.trim().length > 0;
}

export default function ArticleContent({ content }: ArticleContentProps) {
	return (
		<div className="prose prose-neutral max-w-none text-foreground dark:prose-invert prose-headings:tracking-tight prose-p:text-foreground/80 prose-p:leading-8 prose-li:text-foreground/80 prose-strong:text-foreground">
			{content.map((block, index) => {
				switch (block.type) {
					case 'paragraph':
						return (
							<p
								key={`paragraph-${index}`}
								className="mb-6 text-base leading-8"
							>
								{renderInlineText(block.text)}
							</p>
						);

					case 'heading': {
						const HeadingTag = block.level >= 3 ? 'h3' : 'h2';
						return (
							<HeadingTag
								key={`heading-${index}`}
								className="mt-12 mb-4 text-2xl font-semibold tracking-tight text-foreground"
							>
								{block.text}
							</HeadingTag>
						);
					}

					case 'unordered-list':
						return (
							<ul
								key={`unordered-list-${index}`}
								className="mb-8 space-y-3 pl-6"
							>
								{block.items.map((item, itemIndex) => (
									<li
										key={`unordered-item-${itemIndex}`}
										className="text-base leading-8"
									>
										{renderInlineText(item)}
									</li>
								))}
							</ul>
						);

					case 'ordered-list':
						return (
							<ol key={`ordered-list-${index}`} className="mb-8 space-y-3 pl-6">
								{block.items.map((item, itemIndex) => (
									<li
										key={`ordered-item-${itemIndex}`}
										className="text-base leading-8"
									>
										{renderInlineText(item)}
									</li>
								))}
							</ol>
						);

					case 'image':
						if (!hasRenderableImageSource(block.src)) {
							return null;
						}

						return (
							<figure
								key={`image-${index}`}
								className="my-10 overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5"
							>
								<Image
									src={block.src}
									alt={block.alt ?? ''}
									width={1200}
									height={675}
									className="h-auto w-full object-cover"
									sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
								/>
								{block.caption && (
									<figcaption className="px-4 py-3 text-sm text-foreground/55">
										{block.caption}
									</figcaption>
								)}
							</figure>
						);
				}
			})}
		</div>
	);
}
