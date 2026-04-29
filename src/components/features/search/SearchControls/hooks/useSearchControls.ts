'use client';

import { FormEvent, startTransition, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

interface UseSearchControlsOptions {
	initialQuery: string;
	initialCategory: string;
}

/**
 * Manages query/category inputs for the search page.
 * Persists state to URL params so results remain shareable and server-rendered.
 * Debounces free-text updates and allows explicit submit for short queries.
 * @param {UseSearchControlsOptions} options - Initial values derived from URL params
 * @returns Search control state and handlers
 */
export function useSearchControls({
	initialQuery,
	initialCategory,
}: UseSearchControlsOptions) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();
	const [query, setQuery] = useState(initialQuery);
	const [category, setCategory] = useState(initialCategory);
	const [isPending, startNavigationTransition] = useTransition();

	function updateUrl(nextQuery: string, nextCategory: string) {
		const params = new URLSearchParams(searchParams.toString());
		const normalizedQuery = nextQuery.trim();
		const normalizedCategory = nextCategory.trim();

		if (normalizedQuery) {
			params.set('query', normalizedQuery);
		} else {
			params.delete('query');
		}

		if (normalizedCategory) {
			params.set('category', normalizedCategory);
		} else {
			params.delete('category');
		}

		const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
		startNavigationTransition(() => replace(nextUrl));
	}

	const debouncedUpdate = useDebouncedCallback(
		(nextQuery: string, nextCategory: string) => {
			updateUrl(nextQuery, nextCategory);
		},
		300,
	);

	function handleQueryChange(nextQuery: string) {
		setQuery(nextQuery);
		const normalizedQuery = nextQuery.trim();

		if (normalizedQuery.length === 0 || normalizedQuery.length >= 3) {
			debouncedUpdate(nextQuery, category);
		}
	}

	function handleCategoryChange(nextCategory: string) {
		setCategory(nextCategory);
		debouncedUpdate.cancel();
		startTransition(() => updateUrl(query, nextCategory));
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		debouncedUpdate.cancel();
		updateUrl(query, category);
	}

	return {
		query,
		category,
		isPending,
		handleQueryChange,
		handleCategoryChange,
		handleSubmit,
	};
}
