'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useSubscription } from './hooks/useSubscription';

interface SubscribeButtonProps {
	initialIsSubscribed?: boolean;
}

/**
 * Subscription status button with dropdown menu.
 * Bell icon indicates subscription state. Unsubscribed users can subscribe via button.
 * Subscribed users see filled bell and can manage subscription via dropdown menu.
 * Persists subscription state via server-backed session cookies.
 * @returns {React.ReactNode} The subscription control button and optional dropdown
 */
export default function SubscribeButton({
	initialIsSubscribed = false,
}: SubscribeButtonProps) {
	const { isPending, isSubscribed, subscribe, unsubscribe } =
		useSubscription(initialIsSubscribed);
	const [showMenu, setShowMenu] = useState(false);
	const iconSrc = isSubscribed ? '/icons/bell-filled.svg' : '/icons/bell.svg';
	const buttonLabel = isSubscribed ? 'Subscription options' : 'Subscribe';

	return (
		<div className="relative">
			<button
				type="button"
				onClick={() => {
					if (isSubscribed) {
						setShowMenu((prev) => !prev);
						return;
					}

					void subscribe();
				}}
				aria-label={buttonLabel}
				disabled={isPending}
				className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/30 text-foreground transition-colors hover:bg-foreground/5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-foreground/40 dark:hover:bg-foreground/10"
			>
				<Image
					src={iconSrc}
					alt=""
					aria-hidden="true"
					width={18}
					height={18}
					className="dark:invert"
				/>
			</button>

			{showMenu && (
				<>
					{/* Backdrop */}
					<div
						className="fixed inset-0 z-10"
						onClick={() => setShowMenu(false)}
					/>
					{/* Dropdown */}
					<div className="absolute right-0 z-20 mt-1 w-44 overflow-hidden rounded-md border border-(--header-border) bg-(--header-bg) shadow-md">
						<div className="border-b border-(--header-border) px-3 py-2 text-xs font-medium text-foreground/50">
							Subscription
						</div>
						<button
							type="button"
							onClick={() => {
								void unsubscribe();
								setShowMenu(false);
							}}
							disabled={isPending}
							className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-500 transition-colors hover:bg-foreground/5"
						>
							{/* Bell off icon */}
							<Image
								src="/icons/bell-off.svg"
								alt="Unsubscribe"
								width={14}
								height={14}
								className="dark:invert"
							/>
							Unsubscribe
						</button>
					</div>
				</>
			)}
		</div>
	);
}
