'use client';

import Button from '@/components/ui/atoms/Button';
import { useSubscription } from '@/hooks/useSubscription';

/**
 * Hero subscribe CTA wired to the shared subscription flow.
 * Reuses the global subscription hook so the homepage button behaves
 * the same way as the header/paywall subscribe actions.
 */
export default function HeroSubscribeButton() {
	const { isPending, isSubscribed, subscribe } = useSubscription();

	return (
		<Button
			variant="secondary"
			size="md"
			onClick={() => void subscribe()}
			disabled={isSubscribed}
			isLoading={isPending}
		>
			{isSubscribed ? 'Subscribed' : 'Subscribe'}
		</Button>
	);
}
