'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';

interface SubscriptionSnapshot {
	isPending: boolean;
	isSubscribed: boolean;
}

let subscriptionSnapshot: SubscriptionSnapshot = {
	isPending: false,
	isSubscribed: false,
};

const serverSnapshot: SubscriptionSnapshot = {
	isPending: false,
	isSubscribed: false,
};

let hasInitialFetchOccurred = false;
const listeners = new Set<() => void>();

function emit() {
	listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

function getSnapshot() {
	return subscriptionSnapshot;
}

function getServerSnapshot(): SubscriptionSnapshot {
	return serverSnapshot;
}

function updateSnapshot(nextSnapshot: Partial<SubscriptionSnapshot>) {
	subscriptionSnapshot = { ...subscriptionSnapshot, ...nextSnapshot };
	emit();
}

async function readSubscriptionState(): Promise<boolean> {
	const response = await fetch('/api/subscription', { cache: 'no-store' });

	if (!response.ok) {
		return false;
	}

	const payload = (await response.json()) as {
		data?: { isSubscribed?: boolean };
	};

	return payload.data?.isSubscribed === true;
}

/**
 * Shared client hook for subscription state and anonymous subscribe/unsubscribe actions.
 * Uses the app's internal subscription route so the browser never needs direct access
 * to the external API token or response headers.
 * @param {boolean} initialIsSubscribed - Initial server-derived subscription state
 * @returns {{ isSubscribed: boolean; isPending: boolean; subscribe: () => Promise<void>; unsubscribe: () => Promise<void>; }} Subscription state and actions
 */
export function useSubscription(initialIsSubscribed = false) {
	const router = useRouter();
	const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

	const refreshSubscription = useCallback(async () => {
		const isSubscribed = await readSubscriptionState();
		updateSnapshot({ isSubscribed });
	}, []);

	// Fetch subscription state once at app start, never again automatically.
	// This ensures the bell doesn't flash on initial page load or back navigation.
	// State persists via module-level snapshot across all component mounts.
	useEffect(() => {
		if (!hasInitialFetchOccurred) {
			hasInitialFetchOccurred = true;
			void refreshSubscription();
		}
	}, [refreshSubscription]);

	const subscribeToPlan = useCallback(async () => {
		updateSnapshot({ isPending: true });

		try {
			const response = await fetch('/api/subscription', { method: 'POST' });

			if (!response.ok) {
				throw new Error('Failed to subscribe.');
			}

			updateSnapshot({ isSubscribed: true });
			router.refresh();
		} catch (error) {
			console.error(error);
		} finally {
			updateSnapshot({ isPending: false });
		}
	}, [router]);

	const unsubscribeFromPlan = useCallback(async () => {
		updateSnapshot({ isPending: true });

		try {
			const response = await fetch('/api/subscription', { method: 'DELETE' });

			if (!response.ok) {
				throw new Error('Failed to unsubscribe.');
			}

			updateSnapshot({ isSubscribed: false });
			router.refresh();
		} catch (error) {
			console.error(error);
		} finally {
			updateSnapshot({ isPending: false });
		}
	}, [router]);

	return {
		isPending: state.isPending,
		isSubscribed: state.isSubscribed,
		subscribe: subscribeToPlan,
		unsubscribe: unsubscribeFromPlan,
	};
}
