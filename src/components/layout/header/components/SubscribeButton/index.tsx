'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useSubscription } from './hooks/useSubscription';

/**
 * Subscription status button with dropdown menu.
 * Bell icon indicates subscription state. Unsubscribed users can subscribe via button.
 * Subscribed users see filled bell and can manage subscription via dropdown menu.
 * Persists subscription preference to session cookies.
 * @returns {React.ReactNode} The subscription control button and optional dropdown
 */
export default function SubscribeButton() {
	const { isSubscribed, subscribe, unsubscribe } = useSubscription();
	const [showMenu, setShowMenu] = useState(false);

	return (
		<div className="relative">
			<button
				onClick={() =>
					isSubscribed ? setShowMenu((prev) => !prev) : subscribe()
				}
				aria-label={isSubscribed ? 'Subscription options' : 'Subscribe'}
				className={`relative rounded-md p-2 transition-colors hover:bg-foreground/5 ${
					isSubscribed
						? 'text-foreground'
						: 'text-foreground/60 hover:text-foreground'
				}`}
			>
				{/* Bell icon */}
				<Image
					src={isSubscribed ? '/icons/bell-filled.svg' : '/icons/bell.svg'}
					alt={isSubscribed ? 'Subscribed' : 'Subscribe'}
					width={16}
					height={16}
					className="dark:invert"
				/>

				{/* Subscribed indicator dot */}
				{isSubscribed && (
					<span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-foreground" />
				)}
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
							Notifications
						</div>
						<button
							onClick={() => {
								unsubscribe();
								setShowMenu(false);
							}}
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
