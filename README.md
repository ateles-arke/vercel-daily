# Vercel Daily

A modern news and articles platform built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS 4**, and **pnpm**.

## Stack

- **Framework**: Next.js 16.2.4 (App Router with Server Components)
- **UI**: React 19.2.4 with TypeScript strict mode
- **Styling**: Tailwind CSS 4 + PostCSS
- **Package Manager**: pnpm (with workspace support)
- **Build System**: TypeScript compiler, ESLint v9 (flat config)

## Features

- **Home Page**: Hero section with breaking news and featured articles
- **Article Browse**: Paginated article grid with category browsing
- **Article Detail**: Full-article reading with subscription paywall (first paragraph + gradient fade visible to unsubscribed users)
- **Search**: URL-param driven article search with category filters and debouncing
- **Subscription**: Anonymous browser-session based subscription with paywall gating
- **Dark Mode**: Built-in CSS variable theming supporting light and dark schemes
- **Responsive Design**: Mobile-first responsive layout up to 1320.8px desktop max-width
- **Image Optimization**: Next.js `Image` component with automatic optimization
- **Caching**: Server-side caching with `'use cache'` directive, cache tags, and cache life policies

## Getting Started

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Build

```bash
pnpm build
pnpm start
```

### Linting

```bash
pnpm lint
```

## Project Structure

```text
src/
├── app/                    # Next.js App Router
│   ├── (pages)/           # Page routes with shared layout
│   ├── api/               # API routes (subscription management)
│   ├── layout.tsx         # Root layout with theme/subscription
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles and CSS variables
├── components/
│   ├── features/          # Feature-specific components (article, search, etc.)
│   ├── layout/            # Page structure (header, footer)
│   ├── ui/                # Reusable UI atoms and molecules
│   └── shared/            # Cross-feature components
├── lib/                   # Utilities and helpers
├── services/              # API integrations
├── hooks/                 # Custom React hooks
└── types/                 # TypeScript type definitions
```

## Key Pages

- **Home** (`/`): Breaking news banner, hero section, featured articles
- **Articles** (`/articles`): Browse all articles with pagination
- **Article Detail** (`/articles/[slug]`): Read full article (or paywall if unsubscribed)
- **Search** (`/search`): Find articles by query and category with live URL-param persistence
- **Not Found** (`/404`): Custom 404 page

## API Routes

- `POST /api/subscription`: Create anonymous subscription
- `GET /api/subscription`: Check subscription status
- `DELETE /api/subscription`: Cancel subscription

## Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_API_URL=<external-api-url>
NEXT_PUBLIC_API_BYPASS_TOKEN=<bypass-token>
```

## Architecture Highlights

### Server Components by Default

All components are Server Components by default. Use `'use client'` only for interactive features:

- Theme toggle
- Subscribe button
- Search controls
- Form inputs

### Caching Strategy

- **Breaking news**: Cached for `minutes` with `breaking-news` tag
- **Articles collection**: Cached for `hours` with `articles` tag
- **Search results**: Server-side filtered from cached collection
- **Article detail**: Static generation for top 10 trending articles

### Subscription Model

Anonymous subscriptions stored in browser session cookies. Subscription state resolves server-side in the root layout and streams down via `initialIsSubscribed` prop, avoiding hydration mismatches.

## Styling

Uses Tailwind CSS 4 utility classes with CSS custom properties for theme variables:

```css
--background: #ffffff (light) | #0a0a0a (dark) --foreground: #171717 (light) |
	#ededed (dark);
```

Dark mode is toggled via the `.dark` class applied to `<html>` element.

## References

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [Tailwind CSS 4 Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## License

MIT
