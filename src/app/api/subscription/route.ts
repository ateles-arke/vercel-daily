import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import {
	SUBSCRIPTION_STATUS_ACTIVE,
	SUBSCRIPTION_STATUS_COOKIE,
	SUBSCRIPTION_TOKEN_COOKIE,
	getSubscriptionStateFromCookies,
	subscriptionCookieOptions,
} from '@/lib/subscription';
import {
	activateSubscription,
	createSubscriptionToken,
	deleteSubscription,
	getSubscriptionStatus,
} from '@/services/subscriptionApi';

function clearSubscriptionCookies(response: NextResponse) {
	response.cookies.delete(SUBSCRIPTION_TOKEN_COOKIE);
	response.cookies.delete(SUBSCRIPTION_STATUS_COOKIE);
}

function setSubscribedCookies(response: NextResponse, token: string) {
	response.cookies.set(SUBSCRIPTION_TOKEN_COOKIE, token, subscriptionCookieOptions);
	response.cookies.set(
		SUBSCRIPTION_STATUS_COOKIE,
		SUBSCRIPTION_STATUS_ACTIVE,
		subscriptionCookieOptions,
	);
}

export async function GET() {
	const cookieStore = await cookies();
	const { token, isSubscribed } = getSubscriptionStateFromCookies(cookieStore);

	if (!token) {
		return NextResponse.json({ success: true, data: { isSubscribed: false } });
	}

	const isActive = await getSubscriptionStatus(token);
	const response = NextResponse.json({
		success: true,
		data: { isSubscribed: isActive },
	});

	if (isActive) {
		setSubscribedCookies(response, token);
	} else if (isSubscribed) {
		clearSubscriptionCookies(response);
	}

	return response;
}

export async function POST() {
	try {
		const cookieStore = await cookies();
		let { token } = getSubscriptionStateFromCookies(cookieStore);

		if (!token) {
			token = await createSubscriptionToken();
		}

		await activateSubscription(token);

		const response = NextResponse.json({
			success: true,
			data: { isSubscribed: true },
		});
		setSubscribedCookies(response, token);

		return response;
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				error: {
					code: 'SUBSCRIPTION_FAILED',
					message:
						error instanceof Error
							? error.message
							: 'Failed to activate subscription.',
				},
			},
			{ status: 500 },
		);
	}
}

export async function DELETE() {
	const cookieStore = await cookies();
	const { token } = getSubscriptionStateFromCookies(cookieStore);

	try {
		if (token) {
			await deleteSubscription(token);
		}

		const response = NextResponse.json({
			success: true,
			data: { isSubscribed: false },
		});
		clearSubscriptionCookies(response);

		return response;
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				error: {
					code: 'UNSUBSCRIPTION_FAILED',
					message:
						error instanceof Error
							? error.message
							: 'Failed to unsubscribe.',
				},
			},
			{ status: 500 },
		);
	}
}