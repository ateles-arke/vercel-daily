'use client';

import Button from '@/components/ui/atoms/Button';
import { useSubscription } from '@/hooks/useSubscription';

interface SubscribeNowButtonProps {
	initialIsSubscribed: boolean;
}

/**
 * Client CTA used inside the article paywall.
 * Triggers anonymous subscription and refreshes the current route on success.
 * @param {SubscribeNowButtonProps} props - Initial server-derived subscription state
 * @returns {React.ReactNode} Subscription CTA button
 */
export default function SubscribeNowButton({
	initialIsSubscribed,
}: SubscribeNowButtonProps) {
	const { isPending, isSubscribed, subscribe } = useSubscription(
		initialIsSubscribed,
	);

	return (
		<Button
			type="button"
			variant="primary"
			size="lg"
			onClick={() => {
				void subscribe();
			}}
			isLoading={isPending}
			className="rounded-full px-6"
		>
			{isSubscribed ? 'Refreshing access...' : 'Subscribe for full access'}
		</Button>
	);
}