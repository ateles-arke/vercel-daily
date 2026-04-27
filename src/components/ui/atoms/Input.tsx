'use client';

import React from 'react';
import { cn } from '@/lib/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	/**
	 * Optional field label rendered above the input.
	 */
	label?: string;

	/**
	 * Optional helper text shown below the input.
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
	 * Additional class names for the input element.
	 */
	className?: string;
}

/**
 * Generic text input atom for form fields across the application.
 * Keeps visual treatment consistent while allowing standard input props.
 * @param {InputProps} props - Native input props plus optional helper text
 * @returns {React.ReactNode} Styled input field with optional helper text
 */
export default function Input({
	label,
	helperText,
	wrapperClassName,
	labelClassName,
	className,
	id,
	...props
}: InputProps) {
	const generatedId = React.useId();
	const inputId = id ?? generatedId;
	const helperTextId = helperText ? `${inputId}-helper` : undefined;

	return (
		<div className={cn('space-y-2', wrapperClassName)}>
			{label && (
				<label
					htmlFor={inputId}
					className={cn(
						'text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50',
						labelClassName,
					)}
				>
					{label}
				</label>
			)}
			<input
				id={inputId}
				{...props}
				aria-describedby={helperTextId}
				className={cn(
					'h-12 w-full rounded-2xl border border-foreground/15 bg-background px-4 text-sm text-foreground outline-none transition focus:border-foreground/40',
					className,
				)}
			/>
			{helperText && (
				<p id={helperTextId} className="text-xs text-foreground/50">
					{helperText}
				</p>
			)}
		</div>
	);
}