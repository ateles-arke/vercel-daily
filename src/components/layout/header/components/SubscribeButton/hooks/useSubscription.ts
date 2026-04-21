import { useCallback, useSyncExternalStore } from 'react';

function subscribeToStorage(callback: () => void) {
	window.addEventListener('storage', callback);
	return () => window.removeEventListener('storage', callback);
}

function getSnapshot() {
	return localStorage.getItem('subscribed') === 'true';
}

function getServerSnapshot() {
	return false;
}

export function useSubscription() {
	const isSubscribed = useSyncExternalStore(subscribeToStorage, getSnapshot, getServerSnapshot);

	const subscribe = useCallback(() => {
		localStorage.setItem('subscribed', 'true');
		window.dispatchEvent(new Event('storage'));
	}, []);

	const unsubscribe = useCallback(() => {
		localStorage.setItem('subscribed', 'false');
		window.dispatchEvent(new Event('storage'));
	}, []);

	return { isSubscribed, subscribe, unsubscribe };
}
