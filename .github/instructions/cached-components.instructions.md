---
name: cached-components
description: 'Guidelines for using the Next.js 16 Cache Components feature: use cache directive, cacheLife, cacheTag, and fetch behavior.'
applyTo: 'src/**/*.tsx,src/**/*.ts'
---

# Cache Components (Next.js 16)

## Prerequisites

`cacheComponents: true` must be set in `next.config.ts`. This project already has it enabled.

```typescript
// next.config.ts
const nextConfig: NextConfig = {
	cacheComponents: true,
};
```

---

## Core Principle

With Cache Components, **cache is declared at the component or function level**, not on individual `fetch` calls. Do **not** use `next: { revalidate }` on `fetch` when `'use cache'` is in scope — they conflict.

---

## `'use cache'` Directive

Add `'use cache'` at the top of an `async` component or function body to cache its output.

```typescript
// Component level
async function BreakingNewsSection() {
  'use cache';
  cacheLife('minutes');
  cacheTag('breaking-news');

  const data = await getBreakingNews(); // fetch inside has no next.revalidate
  return <Banner headline={data?.headline} />;
}

// Function level (data fetching utility)
export async function getBreakingNews() {
  'use cache';
  cacheLife('minutes');
  cacheTag('breaking-news');
  const res = await fetch(`${BASE_URL}/breaking-news`, { headers });
  // ...
}
```

> Place `'use cache'` at the **component** level when the cache boundary should wrap rendering.
> Place it at the **function** level when multiple components share the same cached data source.

---

## `cacheLife` — Cache Duration Profiles

Use built-in profiles or define custom ones in `next.config.ts`.

| Profile     | Stale (client) | Revalidate (server) | Use for                          |
| ----------- | -------------- | ------------------- | -------------------------------- |
| `'seconds'` | 0s             | ~15s                | Near-realtime data               |
| `'minutes'` | ~5min          | ~1min               | Breaking news, live scores       |
| `'hours'`   | ~5min          | ~1h                 | Article lists, catalogs          |
| `'days'`    | ~5min          | ~1d                 | Mostly-static content            |
| `'weeks'`   | ~5min          | ~1wk                | Reference data                   |
| `'max'`     | ~5min          | never               | Immutable content (build assets) |

```typescript
import { cacheLife } from 'next/cache';

async function Component() {
	'use cache';
	cacheLife('hours'); // ← always call immediately after 'use cache'
	// ...
}
```

---

## `cacheTag` — On-Demand Invalidation

Tag cached outputs so they can be purged programmatically (e.g., from a webhook or Server Action).

```typescript
import { cacheTag } from 'next/cache';

async function BreakingNewsSection() {
	'use cache';
	cacheLife('minutes');
	cacheTag('breaking-news'); // ← tag this cache entry
	// ...
}
```

Invalidate from a Server Action or Route Handler:

```typescript
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';

export async function POST() {
	revalidateTag('breaking-news'); // purges all entries tagged 'breaking-news'
	return Response.json({ revalidated: true });
}
```

---

## Constraints

### Do NOT use inside `'use cache'` scope

- `cookies()`, `headers()` — read them **outside** the cached scope and pass as arguments
- `searchParams` — same rule; pass the resolved value as a prop/argument

```typescript
// ❌ Wrong
async function CachedComponent() {
  'use cache';
  const cookieStore = await cookies(); // Error!
}

// ✅ Correct
async function Page() {
  const theme = (await cookies()).get('theme')?.value;
  return <CachedComponent theme={theme} />;
}

async function CachedComponent({ theme }: { theme?: string }) {
  'use cache';
  // use theme as a plain argument — it becomes part of the cache key
}
```

### Props must be serializable

Cache keys are derived from serialized props. Supported: primitives, plain objects, arrays, Dates, Maps, Sets. **Not supported:** class instances, functions, Symbols, WeakMaps.

Pass Server Actions / `children` as **pass-through** (don't read or call them inside the cached scope):

```typescript
async function CachedWrapper({ children }: { children: ReactNode }) {
  'use cache';
  cacheLife('hours');
  const data = await fetch('/api/data');
  return (
    <div>
      <StaticHeader data={data} />
      {children} {/* dynamic — passed through, not cached */}
    </div>
  );
}
```

---

## Choosing Where to Place `'use cache'`

| Scenario                                         | Placement                                                  |
| ------------------------------------------------ | ---------------------------------------------------------- |
| Entire component output is cacheable and public  | Component body                                             |
| Multiple components share the same API data      | Data-fetching function                                     |
| Component receives runtime props (user-specific) | Do not cache, or cache with those props as part of the key |
| Component uses `cookies()` / `headers()`         | Extract values outside, pass as args, then cache           |

---

## `fetch` inside `'use cache'`

When `'use cache'` is active, `fetch` calls **do not need** `next: { revalidate }`. Remove it to avoid model conflicts:

```typescript
// ❌ Redundant / conflicting
const res = await fetch(url, { next: { revalidate: 60 } });

// ✅ Correct — cache lifecycle managed by 'use cache' + cacheLife
const res = await fetch(url, { headers });
```
