---
name: create-page
description: "Scaffold a new App Router page with route structure, metadata, and optional nested layout."
---

# Create a New Page

You're about to scaffold a new page in the App Router.

## What do you want to create?

1. **Route path** (e.g., `posts`, `dashboard/analytics`, `[id]` for dynamic)
   - Use relative path from `app/` folder
   - Example: `app/about/page.tsx` → enter `about`

2. **Page type** (choose one)
   - **Simple page** — Basic Server Component with JSX
   - **With metadata** — Add `generateMetadata()` for dynamic title/description
   - **With API data** — Fetch data from `/api/...` endpoint
   - **Dynamic route** — Use `[param]` or `[...path]` for dynamic segments

3. **Include layout?** (yes/no)
   - If yes, creates `app/[path]/layout.tsx` alongside page
   - Use for grouping related pages with shared UI

4. **Add loading state?** (yes/no)
   - Creates `loading.tsx` with Suspense fallback
   - Used while async data is fetching

---

## Example Inputs

**Example 1: Simple page**
```
Route: blog
Type: simple
Layout: no
Loading: no
```
Creates: `app/blog/page.tsx`

**Example 2: Dynamic post page with metadata**
```
Route: blog/[slug]
Type: with metadata
Layout: no
Loading: yes
```
Creates:
- `app/blog/[slug]/page.tsx` (with `generateMetadata()`)
- `app/blog/[slug]/loading.tsx`

**Example 3: Dashboard section with shared layout**
```
Route: dashboard/analytics
Type: with API data
Layout: yes
Loading: yes
```
Creates:
- `app/dashboard/layout.tsx` (shared layout)
- `app/dashboard/analytics/page.tsx` (with data fetch)
- `app/dashboard/analytics/loading.tsx`

---

Once you provide these details, I'll generate the complete file structure with:
✓ Proper TypeScript types (`PageProps`, `LayoutProps`)
✓ Server Components by default
✓ Metadata patterns for SEO
✓ Data fetching (if requested)
✓ Tailwind + dark mode ready styling
✓ Follows `.github/copilot-instructions.md` conventions
