import { useState } from 'react';

function getInitialSubscription(): boolean {
	if (typeof window === 'undefined') return false;
	return localStorage.getItem('subscribed') === 'true';
}

export function useSubscription() {
	const [isSubscribed, setIsSubscribed] = useState(() => {
		if (typeof window === 'undefined') return false;
		return getInitialSubscription();
	});

	function subscribe() {
		setIsSubscribed(true);
		localStorage.setItem('subscribed', 'true');
	}

	function unsubscribe() {
		setIsSubscribed(false);
		localStorage.setItem('subscribed', 'false');
	}

	return { isSubscribed, subscribe, unsubscribe };
}
