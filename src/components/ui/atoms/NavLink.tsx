'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

/**
 * Styled navigation link with active state detection.
 * Links to routes with visual indication of active page.
 * Uses Next.js Link for client-side navigation with pathname detection.
 * @param {NavLinkProps} props - Link destination and text content
 * @returns {React.ReactNode} The styled navigation link element
 */
export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors hover:text-foreground/80 ${
        isActive
          ? 'text-foreground'
          : 'text-foreground/60'
      }`}
    >
      {children}
    </Link>
  );
}
