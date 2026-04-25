'use client';

import React from 'react';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	/**
	 * Visual style variant
	 * - primary: Bold, filled background (CTA)
	 * - secondary: Outlined, transparent background
	 * @default 'primary'
	 */
	variant?: ButtonVariant;

	/**
	 * Button size
	 * - sm: Small (compact)
	 * - md: Medium (standard)
	 * - lg: Large (prominent)
	 * @default 'md'
	 */
	size?: ButtonSize;

	/**
	 * Display as block element (full width)
	 * @default false
	 */
	fullWidth?: boolean;

	/**
	 * Loading state (disables button, shows spinner)
	 * @default false
	 */
	isLoading?: boolean;

	/**
	 * Disabled state
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Optional right icon (SVG image from public/icons/)
	 * Pass an <Image> component with src pointing to public/icons/
	 * Icon color tip:
	 * - primary button (light bg in dark mode, dark bg in light mode): use className="invert dark:invert-0"
	 * - secondary button (transparent bg, foreground text): use className="dark:invert"
	 * @example
	 * import Image from 'next/image';
	 * // On primary button:
	 * <Button variant="primary" rightIcon={<Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="invert dark:invert" />}>
	 *   Browse articles
	 * </Button>
	 */
	rightIcon?: React.ReactNode;

	children: React.ReactNode;
}

/**
 * Generic button component with variant and size support.
 * Supports light/dark theme via CSS variables.
 * Two variants: primary (filled) and secondary (outlined).
 * @param {ButtonProps} props - Button configuration
 * @returns {React.ReactNode} The styled button element
 */
export default function Button({
	variant = 'primary',
	size = 'md',
	fullWidth = false,
	isLoading = false,
	disabled = false,
	rightIcon,
	className = '',
	children,
	...props
}: ButtonProps) {
	// Base styles
	const baseStyles =
		'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

	// Size variants
	const sizeStyles = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-base',
		lg: 'px-6 py-3 text-lg',
	};

	// Variant styles - primary
	const primaryStyles =
		'bg-foreground text-background hover:bg-foreground/90 dark:bg-foreground dark:text-background dark:hover:bg-foreground/80 focus-visible:ring-foreground';

	// Variant styles - secondary
	const secondaryStyles =
		'border border-foreground/30 text-foreground hover:bg-foreground/5 dark:border-foreground/40 dark:text-foreground dark:hover:bg-foreground/10 focus-visible:ring-foreground';

	const variantStyles = variant === 'primary' ? primaryStyles : secondaryStyles;
	const widthStyles = fullWidth ? 'w-full' : '';

	const combinedClassName =
		`${baseStyles} ${sizeStyles[size]} ${variantStyles} ${widthStyles} ${className}`.trim();

	return (
		<button
			{...props}
			disabled={disabled || isLoading}
			className={combinedClassName}
			aria-busy={isLoading}
		>
			{isLoading && (
				<svg
					className="mr-2 h-4 w-4 animate-spin"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					/>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
			)}
			{children}
			{rightIcon && <span className="ml-2 flex items-center">{rightIcon}</span>}
		</button>
	);
}
