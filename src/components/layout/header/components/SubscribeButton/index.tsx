'use client';

import { useState } from 'react';
import { useSubscription } from './hooks/useSubscription';

export default function SubscribeButton() {
  const { isSubscribed, subscribe, unsubscribe } = useSubscription();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => isSubscribed ? setShowMenu(prev => !prev) : subscribe()}
        aria-label={isSubscribed ? 'Subscription options' : 'Subscribe'}
        className={`relative rounded-md p-2 transition-colors hover:bg-foreground/5 ${
          isSubscribed ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'
        }`}
      >
        {/* Bell icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={isSubscribed ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>

        {/* Subscribed indicator dot */}
        {isSubscribed && (
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-foreground" />
        )}
      </button>

      {showMenu && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
          {/* Dropdown */}
          <div className="absolute right-0 z-20 mt-1 w-44 overflow-hidden rounded-md border border-(--header-border) bg-(--header-bg) shadow-md">
            <div className="border-b border-(--header-border) px-3 py-2 text-xs font-medium text-foreground/50">
              Notifications
            </div>
            <button
              onClick={() => { unsubscribe(); setShowMenu(false); }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-500 transition-colors hover:bg-foreground/5"
            >
              {/* Bell off icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5" />
                <path d="M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                <path d="m2 2 20 20" />
              </svg>
              Unsubscribe
            </button>
          </div>
        </>
      )}
    </div>
  );
}

