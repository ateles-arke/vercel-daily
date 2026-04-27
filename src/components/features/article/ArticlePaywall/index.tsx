import SubscribeNowButton from './components/SubscribeNowButton';

interface ArticlePaywallProps {
	initialIsSubscribed: boolean;
	teaserText: string;
}

/**
 * Paywall panel shown to unsubscribed readers on article detail pages.
 * Displays teaser content and a prominent CTA to activate an anonymous subscription.
 * @param {ArticlePaywallProps} props - Teaser text and initial subscription state
 * @returns {React.ReactNode} Paywall content block
 */
export default function ArticlePaywall({
	initialIsSubscribed,
	teaserText,
}: ArticlePaywallProps) {
	return (
		<section className="rounded-3xl border border-foreground/10 bg-foreground/3 p-8 md:p-10">
			<p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/45">
				Subscriber exclusive
			</p>
			<h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
				Continue reading with a subscription.
			</h2>
			<p className="mt-5 text-base leading-8 text-foreground/70 md:text-lg">
				{teaserText}
			</p>

			<div className="mt-8 rounded-2xl border border-foreground/10 bg-background/60 p-6">
				<p className="text-lg font-semibold text-foreground">
					Unlock the full article instantly.
				</p>
				<p className="mt-2 text-sm leading-7 text-foreground/60">
					Subscriptions are anonymous and persist for the current browser session, so refreshing the page keeps your access.
				</p>
				<div className="mt-6">
					<SubscribeNowButton initialIsSubscribed={initialIsSubscribed} />
				</div>
			</div>
		</section>
	);
}