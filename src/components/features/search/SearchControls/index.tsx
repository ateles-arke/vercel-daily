'use client';

import Button from '@/components/ui/atoms/Button';
import Input from '@/components/ui/atoms/Input';
import Select from '@/components/ui/atoms/Select';
import { SearchResultsSkeleton } from '@/components/features/search/SearchPageSkeleton';
import { useSearchControls } from './hooks/useSearchControls';

interface SearchControlsProps {
	categories: string[];
	initialQuery: string;
	initialCategory: string;
	children?: React.ReactNode;
}

/**
 * Interactive search controls for the search page.
 * Uses URL params as the source of truth so searches persist across refreshes.
 * @param {SearchControlsProps} props - Available categories and initial URL-derived values
 * @returns {React.ReactNode} Search form with input, category filter, and submit button
 */
export default function SearchControls({
	categories,
	initialQuery,
	initialCategory,
	children,
}: SearchControlsProps) {
	const {
		query,
		category,
		isPending,
		handleQueryChange,
		handleCategoryChange,
		handleSubmit,
	} = useSearchControls({
		initialQuery,
		initialCategory,
	});

	const categoryOptions = [
		{ label: 'All categories', value: '' },
		...categories.map((option) => ({ label: option, value: option })),
	];

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="rounded-3xl border border-foreground/10 bg-foreground/3 p-4 md:p-5"
			>
				<div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_13rem_auto] md:items-start">
					<Input
						id="search-query"
						label="Search articles"
						type="search"
						value={query}
						onChange={(event) => handleQueryChange(event.target.value)}
						placeholder="Search by title, excerpt, or category"
						helperText="Auto-search starts after 3 characters. Press Enter or click Search for shorter queries."
					/>

					<Select
						id="search-category"
						label="Category"
						value={category}
						onChange={(event) => handleCategoryChange(event.target.value)}
						options={categoryOptions}
					/>

					<div className="space-y-2">
						<div aria-hidden="true" className="h-4" />
						<Button
							type="submit"
							variant="primary"
							className="h-12 rounded-2xl px-5"
						>
							Search
						</Button>
					</div>
				</div>
			</form>

			{children && (isPending ? <SearchResultsSkeleton /> : children)}
		</>
	);
}
