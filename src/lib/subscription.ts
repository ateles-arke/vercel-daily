export const SUBSCRIPTION_TOKEN_COOKIE = 'subscription-token';
export const SUBSCRIPTION_STATUS_COOKIE = 'subscription-status';
export const SUBSCRIPTION_STATUS_ACTIVE = 'active';

export const subscriptionCookieOptions = {
	httpOnly: true,
	sameSite: 'lax' as const,
	secure: process.env.NODE_ENV === 'production',
	path: '/',
};

interface CookieValue {
	value: string;
}

interface CookieReader {
	get(name: string): CookieValue | undefined;
}

/**
 * Reads subscription token and active status from cookies.
 * @param {CookieReader} cookieStore - Request cookie store
 * @returns {{ token: string | null; isSubscribed: boolean }} Subscription cookie state
 */
export function getSubscriptionStateFromCookies(cookieStore: CookieReader): {
	token: string | null;
	isSubscribed: boolean;
} {
	const token = cookieStore.get(SUBSCRIPTION_TOKEN_COOKIE)?.value ?? null;
	const hasActiveStatus =
		cookieStore.get(SUBSCRIPTION_STATUS_COOKIE)?.value ===
		SUBSCRIPTION_STATUS_ACTIVE;
	const isSubscribed = Boolean(token) && hasActiveStatus;

	return { token, isSubscribed };
}
