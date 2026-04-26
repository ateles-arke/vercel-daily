'use client';

import type { ReactNode } from 'react';
import Button from '@/components/ui/atoms/Button';
import { cn } from '@/lib/cn';
import { useBackButton } from './hooks/useBackButton';

interface BackButtonProps {
	label?: string;
	className?: string;
}

function ArrowLeftIcon(): ReactNode {
	return (
		<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
			<path
				d="M15 18l-6-6 6-6M9 12h12"
				stroke="currentColor"
				strokeWidth="1.75"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export default function BackButton({
	label = 'Back',
	className,
}: BackButtonProps) {
	const { goBack } = useBackButton();

	return (
		<Button
			type="button"
			variant="secondary"
			size="sm"
			onClick={goBack}
			className={cn('gap-2 rounded-full px-4 py-2 text-sm', className)}
		>
			<ArrowLeftIcon />
			<span>{label}</span>
		</Button>
	);
}
