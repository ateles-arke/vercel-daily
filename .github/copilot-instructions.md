---
name: vercel-daily-workspace
description: "Workspace instructions for Next.js 16 + React 19 greenfield project with TypeScript, Tailwind CSS 4, and pnpm"
---

# Vercel Daily — Workspace Instructions

## Project Overview

**Vercel Daily** is a modern Next.js 16 + React 19 application built with:
- **Framework**: Next.js 16.2.4 (App Router, Server Components by default)
- **UI**: React 19.2.4 with TypeScript strict mode
- **Styling**: Tailwind CSS 4 + PostCSS
- **Package Manager**: pnpm (workspace-capable)
- **Status**: Greenfield template (v0.1.0) — no component/lib structure yet

### ⚠️ Critical: Next.js 16 Breaking Changes

**Before implementing any feature or API usage**, verify against the official documentation in `node_modules/next/dist/docs/`. This version has **breaking changes** to APIs, conventions, and file structure. Do NOT assume patterns from older Next.js versions work here.

**Reference**: See [AGENTS.md](../AGENTS.md) for the breaking changes notice.

---

## Project Structure

```
.
├── app/                          # App Router (RSC by default)
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Index page (/route)
│   └── globals.css              # Global styles
├── public/                       # Static assets (Vercel/Next.js SVGs)
├── .github/                      # Workspace metadata
├── tsconfig.json                # TypeScript strict mode
├── next.config.ts               # Next.js build config (empty, uses defaults)
├── eslint.config.mjs            # ESLint v9 flat config
├── postcss.config.mjs           # PostCSS + Tailwind setup
├── pnpm-workspace.yaml          # Workspace config
└── package.json                 # Dependencies (next, react, tailwind, typescript)
```

### Established Patterns

- **No component abstractions yet** — Define early as codebase grows:
  - `components/` for reusable React components
  - `lib/` for utilities, helpers, types
  - `hooks/` for custom React hooks
  - `app/api/` for API routes (if needed)

---

## Development Workflow

### Setup & Installation

```bash
pnpm install        # Install dependencies
pnpm dev           # Start dev server at http://localhost:3000
pnpm build         # Create production build
pnpm start         # Run production server
pnpm lint          # Run ESLint
```

**Dev environment notes:**
- No `.env.local` visible — establish secrets/config strategy if needed
- Hot reload enabled by default
- Open browser to `http://localhost:3000` to see changes

### Key Build Info

- **Next.js config**: `next.config.ts` (currently minimal, uses all defaults)
- **TypeScript**: Strict mode enabled (`compilerOptions.strict: true`)
- **Path alias**: `@/*` maps to project root (already configured in `tsconfig.json`)
- **Linting**: ESLint v9 flat config format (`eslint.config.mjs`)

---

## React & TypeScript Conventions

### Server Components vs Client Components

**Default: Server Components** (no `'use client'` directive)

```typescript
// ✅ Server Component (default)
export default async function Page() {
  const data = await fetchData(); // Can fetch server-side
  return <div>{data}</div>;
}

// ⚠️ Client Component (explicit opt-in)
'use client';
import { useState } from 'react';
export default function Interactive() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

**Guidelines:**
- Use Server Components by default for data fetching, secrets, large dependencies
- Only use `'use client'` when interactivity is truly needed
- Keep Client Component boundaries narrow (move state up as needed)

### TypeScript Best Practices

- Leverage strict mode (`noImplicitAny`, `strictNullChecks`, etc.)
- Use `@/*` path alias for imports: `import { Component } from '@/components'`
- Export types from a central `types/` or inline in files
- Use `React.ReactNode` for component children props

**Example type pattern:**

```typescript
interface PageProps {
  params: { id: string };
  searchParams?: Record<string, string | string[]>;
}

export default function Page({ params }: PageProps) {
  return <div>ID: {params.id}</div>;
}
```

### Image Optimization

Use `next/image` with optimization flags:

```typescript
import Image from 'next/image';

export default function Hero() {
  return (
    <Image
      src="/screenshot.png"
      alt="Screenshot"
      width={800}
      height={600}
      priority    // For above-the-fold images
    />
  );
}
```

### Font Loading

Use `next/font` for custom fonts (already integrated with Geist):

```typescript
import { Geist_Sans, Geist_Mono } from 'next/font/google';

const sans = Geist_Sans({ subsets: ['latin'] });
const mono = Geist_Mono({ subsets: ['latin'] });
```

---

## Styling with Tailwind CSS 4

### Setup

- **Config**: `tailwind.config.ts` (not yet created—use defaults)
- **PostCSS**: `postcss.config.mjs` (already configured)
- **CSS pipeline**: Global CSS in `app/globals.css`

### Global CSS Variables

The project uses CSS custom properties for theming (in `app/globals.css`):

```css
:root {
  --background: white;
  --foreground: black;
  --font-geist-sans: /* Geist Sans font stack */;
  --font-geist-mono: /* Geist Mono font stack */;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: black;
    --foreground: white;
  }
}
```

### Tailwind Usage

Apply utility classes directly (no custom component classes visible):

```typescript
export default function Card({ children }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4">
      {children}
    </div>
  );
}
```

**Tailwind v4 notes:** Modern `@tailwindcss/postcss` syntax; ensure familiarity with breaking changes from v3.

---

## Linting & Formatting

### ESLint Configuration

- **Config file**: `eslint.config.mjs` (ESLint v9 flat config format)
- **Rules**: `eslint-config-next` + TypeScript support
- **Best practices**: Next.js core-web-vitals + TypeScript rules enforced

**Run linting:**

```bash
pnpm lint
```

**Key rules enforced:**
- Next.js API best practices (`next/no-html-link-for-pages`)
- React best practices (`react/jsx-no-literals`)
- TypeScript type safety (`@typescript-eslint/no-explicit-any`)

### No Prettier Config

Format code manually or add Prettier via `npm install --save-dev prettier prettier-plugin-tailwindcss`.

---

## Common Pitfalls & Guidance

| Issue | Prevention |
|-------|-----------|
| **Breaking Changes** | Always check `node_modules/next/dist/docs/` before using Next.js APIs |
| **Missing `'use client'`** | Remember Server Components are default; interactivity requires explicit directive |
| **Environment setup** | Define `.env.local` strategy if config/secrets needed (not yet established) |
| **No API route structure** | If adding API routes, establish `/app/api` folder early |
| **Library compatibility** | Some npm packages may not work with React 19; check peer dependencies |
| **Tailwind v4 syntax** | Modern syntax differs from v3; review `@tailwindcss/postcss` docs |
| **ESLint flat config** | v9 format incompatible with legacy `.eslintrc.json` plugins |

---

## Recommended Folder Structure (Once Growing)

As features are added, establish conventions early:

```
app/
├── layout.tsx
├── page.tsx
├── globals.css
├── api/                    # API routes (if needed)
│   ├── health/
│   └── ...
├── (auth)/                 # Route groups for logical organization
│   ├── login/
│   └── signup/
└── [slug]/                 # Dynamic routes

components/                 # Reusable React components
├── ui/                     # Atomic design: buttons, cards, etc.
│   └── Button.tsx
├── layout/                 # Layout components
│   └── Header.tsx
└── features/               # Feature-specific components

lib/                        # Utilities and helpers
├── utils.ts
├── api-client.ts
└── constants.ts

hooks/                      # Custom React hooks
└── useAsync.ts

types/                      # Shared TypeScript types
└── index.ts
```

---

## File-Level Instructions

Additional context-specific guidance is available in `.github/instructions/`:

| Instruction | Applies To | Topics |
|-------------|-----------|--------|
| [app-routes.instructions.md](.github/instructions/app-routes.instructions.md) | `app/**/page.tsx`, `layout.tsx`, `route.ts` | Page components, layouts, API routes, dynamic routes, special files |
| [client-components.instructions.md](.github/instructions/client-components.instructions.md) | `**/*.tsx` (React files) | When to use `'use client'`, boundaries, patterns, Server Actions |
| [component-structure.instructions.md](.github/instructions/component-structure.instructions.md) | `components/**/*.tsx` | File organization, naming, TypeScript props, reusability patterns |
| [tailwind-styling.instructions.md](.github/instructions/tailwind-styling.instructions.md) | `**/*.tsx`, `globals.css` | Utility classes, dark mode, CSS variables, Tailwind v4 patterns |

These instructions are automatically loaded when working on matching files.

---

## Custom Prompts

Quick-start templates for scaffolding new code. Use these with `/` slash commands:

| Prompt | Use Case | Input Required |
|--------|----------|-----------------|
| [`/create-page`](.github/prompts/create-page.prompt.md) | Generate new App Router pages, layouts, dynamic routes | Route path, page type, options |
| [`/create-component`](.github/prompts/create-component.prompt.md) | Scaffold reusable React components with proper types | Component name, category, props |
| [`/api-endpoint`](.github/prompts/api-endpoint.prompt.md) | Create API route handlers with validation & error handling | Path, methods, request/response types |

**Quick start example:**
```
Type: /create-page
Enter: Route: posts, Type: with API data, Layout: no, Loading: yes
→ Generates: app/posts/page.tsx with data fetching + loading.tsx
```

---

## References & Documentation

- **Next.js 16 Docs**: [nextjs.org/docs](https://nextjs.org/docs) — **Must-read for breaking changes**
- **React 19**: [react.dev](https://react.dev)
- **Tailwind CSS 4**: [tailwindcss.com](https://tailwindcss.com/docs)
- **TypeScript**: [typescriptlang.org](https://www.typescriptlang.org/docs)
- **ESLint v9**: [eslint.org](https://eslint.org/docs/latest)

---

## Agent Guidance

### For Code Generation
1. **Check Next.js docs** for current API signatures before implementing
2. **Use Server Components by default** — only add `'use client'` when needed
3. **Leverage TypeScript strict mode** — use proper type annotations
4. **Path alias imports**: `import { foo } from '@/lib/utils'` (not relative paths)
5. **Tailwind-first styling** — utility classes, not CSS modules (unless needed)

### For Refactoring
1. Establish `components/`, `lib/`, `hooks/` early if scaling
2. Extract shared logic to `lib/` utilities
3. Enforce Server Component boundaries
4. Test linting: `pnpm lint` before committing

### Testing & Validation
- **Build check**: `pnpm build` (verifies TypeScript + Next.js compilation)
- **Linting**: `pnpm lint` (ESLint rules)
- **Dev preview**: `pnpm dev` then navigate to `http://localhost:3000`

---

**Last Updated**: April 2026  
**Maintained By**: Development Team  
**Status**: Active — Greenfield Phase
