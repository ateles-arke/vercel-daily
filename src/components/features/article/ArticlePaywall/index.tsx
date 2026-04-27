import SubscribeNowButton from './components/SubscribeNowButton';

interface ArticlePaywallProps {
	initialIsSubscribed: boolean;
}

/**
 * Paywall panel shown to unsubscribed readers on article detail pages.
 * Displays a CTA to activate an anonymous subscription.
 * @param {ArticlePaywallProps} props - Initial subscription state
 * @returns {React.ReactNode} Paywall content block
 */
export default function ArticlePaywall({
	initialIsSubscribed,
}: ArticlePaywallProps) {
	return (
		<section className="rounded-3xl border border-foreground/10 bg-foreground/3 p-8 md:p-10">
			<p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/45">
				Subscriber exclusive
			</p>
			<h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
				Continue reading with a subscription.
			</h2>

			<div className="mt-8 rounded-2xl border border-foreground/10 bg-background/60 p-6">
				<p className="text-base font-semibold text-foreground">
					Unlock the full article instantly.
				</p>
				<p className="mt-2 text-xs leading-6 text-foreground/60 md:text-sm">
					Subscriptions are anonymous and persist for the current browser
					session, so refreshing the page keeps your access.
				</p>
				<div className="mt-6">
					<SubscribeNowButton initialIsSubscribed={initialIsSubscribed} />
				</div>
			</div>
		</section>
	);
}
