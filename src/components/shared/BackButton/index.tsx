'use client';

import Image from 'next/image';
import Button from '@/components/ui/atoms/Button';
import { cn } from '@/lib/cn';
import { useBackButton } from './hooks/useBackButton';

interface BackButtonProps {
	label?: string;
	className?: string;
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
			<Image
				src="/icons/arrow-left.svg"
				alt=""
				width={16}
				height={16}
				aria-hidden="true"
				className="dark:invert"
			/>
			<span>{label}</span>
		</Button>
	);
}
