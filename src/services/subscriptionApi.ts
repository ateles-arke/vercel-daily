import { API_BYPASS_TOKEN, buildBypassUrl } from '@/lib/api-constants';

const BASE_URL = process.env.NEWS_API_BASE_URL!;

function createHeaders(subscriptionToken?: string): HeadersInit {
	return {
		accept: 'application/json',
		'x-vercel-protection-bypass': API_BYPASS_TOKEN,
		...(subscriptionToken ? { 'x-subscription-token': subscriptionToken } : {}),
	};
}

async function fetchSubscriptionEndpoint(
	path: string,
	init: RequestInit = {},
	subscriptionToken?: string,
): Promise<Response> {
	const url = `${BASE_URL}${path}`;
	const headers = createHeaders(subscriptionToken);
	let response = await fetch(url, {
		...init,
		cache: 'no-store',
		headers: {
			...headers,
			...(init.headers ?? {}),
		},
	});

	if (!response.ok && response.status === 401) {
		response = await fetch(buildBypassUrl(url, API_BYPASS_TOKEN), {
			...init,
			cache: 'no-store',
			headers: {
				...headers,
				...(init.headers ?? {}),
			},
		});
	}

	return response;
}

/**
 * Creates an anonymous subscription token.
 * @returns {Promise<string>} New subscription token returned in response headers
 */
export async function createSubscriptionToken(): Promise<string> {
	const response = await fetchSubscriptionEndpoint('/subscription/create', {
		method: 'POST',
	});

	if (!response.ok) {
		throw new Error(
			`[Subscription API] Create failed with ${response.status}: ${response.statusText}`,
		);
	}

	const token = response.headers.get('x-subscription-token');

	if (!token) {
		throw new Error('[Subscription API] Missing x-subscription-token header');
	}

	return token;
}

/**
 * Activates a subscription for the given token.
 * @param {string} token - Anonymous subscription token
 * @returns {Promise<void>} Resolves when activation succeeds
 */
export async function activateSubscription(token: string): Promise<void> {
	const response = await fetchSubscriptionEndpoint(
		'/subscription',
		{ method: 'POST' },
		token,
	);

	if (!response.ok) {
		throw new Error(
			`[Subscription API] Activation failed with ${response.status}: ${response.statusText}`,
		);
	}
}

/**
 * Checks whether the current token represents an active subscription.
 * Treats 200 responses as subscribed even when the body shape varies.
 * @param {string} token - Anonymous subscription token
 * @returns {Promise<boolean>} Whether the token is currently subscribed
 */
export async function getSubscriptionStatus(token: string): Promise<boolean> {
	const response = await fetchSubscriptionEndpoint(
		'/subscription',
		{ method: 'GET' },
		token,
	);

	if (!response.ok) {
		return false;
	}

	try {
		const payload = (await response.json()) as Record<string, unknown>;
		const data =
			payload.data && typeof payload.data === 'object'
				? (payload.data as Record<string, unknown>)
				: payload;

		if (typeof data.isSubscribed === 'boolean') {
			return data.isSubscribed;
		}

		if (typeof data.subscribed === 'boolean') {
			return data.subscribed;
		}

		if (typeof data.active === 'boolean') {
			return data.active;
		}
	} catch {
		return true;
	}

	return true;
}

/**
 * Cancels the subscription for the given token.
 * Missing/not found subscriptions are treated as already unsubscribed.
 * @param {string} token - Anonymous subscription token
 * @returns {Promise<void>} Resolves when unsubscribe completes
 */
export async function deleteSubscription(token: string): Promise<void> {
	const response = await fetchSubscriptionEndpoint(
		'/subscription',
		{ method: 'DELETE' },
		token,
	);

	if (!response.ok && response.status !== 404) {
		throw new Error(
			`[Subscription API] Delete failed with ${response.status}: ${response.statusText}`,
		);
	}
}
