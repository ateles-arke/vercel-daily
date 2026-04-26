import { useRouter } from 'next/navigation';

export function useBackButton() {
	const router = useRouter();

	function goBack() {
		if (window.history.length > 1) {
			router.back();
			return;
		}

		router.push('/');
	}

	return { goBack };
}