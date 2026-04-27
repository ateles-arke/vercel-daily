'use client';

import React from 'react';
import { cn } from '@/lib/cn';

interface SelectOption {
	label: string;
	value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	/**
	 * Optional field label rendered above the select.
	 */
	label?: string;

	/**
	 * Optional helper text shown below the select.
	 */
	helperText?: string;

	/**
	 * Additional class names for the outer wrapper element.
	 */
	wrapperClassName?: string;

	/**
	 * Additional class names for the label element.
	 */
	labelClassName?: string;

	/**
	 * Additional class names for the select element.
	 */
	className?: string;

	/**
	 * Options rendered by the select.
	 */
	options: SelectOption[];
}

/**
 * Generic select atom for dropdown fields across the application.
 * Keeps label, helper text, and visual treatment consistent with other form atoms.
 * @param {SelectProps} props - Native select props plus label, helper text, and options
 * @returns {React.ReactNode} Styled select field with options
 */
export default function Select({
	label,
	helperText,
	wrapperClassName,
	labelClassName,
	className,
	options,
	id,
	...props
}: SelectProps) {
	const generatedId = React.useId();
	const selectId = id ?? generatedId;
	const helperTextId = helperText ? `${selectId}-helper` : undefined;

	return (
		<div className={cn('space-y-2', wrapperClassName)}>
			{label && (
				<label
					htmlFor={selectId}
					className={cn(
						'text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50',
						labelClassName,
					)}
				>
					{label}
				</label>
			)}
			<select
				id={selectId}
				{...props}
				aria-describedby={helperTextId}
				className={cn(
					'h-12 w-full rounded-2xl border border-foreground/15 bg-background px-4 text-sm text-foreground outline-none transition focus:border-foreground/40',
					className,
				)}
			>
				{options.map((option) => (
					<option key={`${selectId}-${option.value}`} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			{helperText && (
				<p id={helperTextId} className="text-xs text-foreground/50">
					{helperText}
				</p>
			)}
		</div>
	);
}