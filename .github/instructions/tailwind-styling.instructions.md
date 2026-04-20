---
name: tailwind-styling
description: 'Guidelines for styling with Tailwind CSS 4: utility classes, dark mode, CSS variables, custom components, and best practices.'
applyTo: '**/*.tsx,app/globals.css'
---

# Tailwind CSS 4 Styling

## Setup & Configuration

**Current setup:**

- Tailwind CSS 4 via `@tailwindcss/postcss`
- PostCSS pipeline configured (`postcss.config.mjs`)
- Global CSS in `app/globals.css`
- Dark mode support via `@media (prefers-color-scheme: dark)`

**To customize:**
Create `tailwind.config.ts` (currently using defaults):

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
	theme: {
		extend: {
			colors: {
				primary: 'var(--color-primary)',
				secondary: 'var(--color-secondary)',
			},
			spacing: {
				gutter: 'var(--spacing-gutter)',
			},
		},
	},
} satisfies Config;
```

---

## Utility Classes

Always use Tailwind utilities instead of custom CSS:

```typescript
// ✅ Tailwind utilities
export default function Card() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-slate-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Card Title
      </h2>
      <p className="text-gray-600 dark:text-gray-400">Card content</p>
    </div>
  );
}

// ❌ Custom CSS
export default function Card() {
  return <div className="my-card">Card Title</div>;
}

// Where you'd need to add:
// .my-card { /* ... */ }
```

---

## CSS Variables for Theming

Use CSS custom properties for consistent theming:

```css
/* app/globals.css */
:root {
	--background: white;
	--foreground: black;
	--border: #e5e7eb;
	--ring: #3b82f6;
	--color-primary: #3b82f6;
	--color-secondary: #10b981;
}

@media (prefers-color-scheme: dark) {
	:root {
		--background: #0f172a;
		--foreground: #f1f5f9;
		--border: #334155;
		--ring: #60a5fa;
		--color-primary: #60a5fa;
		--color-secondary: #34d399;
	}
}
```

Access in components:

```typescript
export default function Theme() {
  return (
    <div style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      Using CSS variables for theme
    </div>
  );
}
```

Or use Tailwind's `var()` syntax in utilities:

```typescript
export default function Hero() {
  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      Themed content
    </div>
  );
}
```

---

## Dark Mode

### Automatic Detection

Dark mode respects `prefers-color-scheme`:

```typescript
// ✅ Automatic dark mode (preferred)
<div className="bg-white dark:bg-slate-900 text-black dark:text-white">
  Content adapts to user's system preference
</div>
```

### Responsive Breakpoints

Combine dark mode with responsive classes:

```typescript
<div className="
  bg-gray-50 dark:bg-slate-900
  text-gray-900 dark:text-white
  p-4 sm:p-6 lg:p-8
  text-sm sm:text-base lg:text-lg
">
  Responsive + dark-aware
</div>
```

---

## Organizing Styles

### 1. Inline Utility Classes (Preferred)

```typescript
export default function Button() {
  return (
    <button
      className="
        px-4 py-2
        bg-blue-500 hover:bg-blue-600 active:bg-blue-700
        dark:bg-blue-600 dark:hover:bg-blue-700
        text-white font-medium rounded-lg
        transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      Click me
    </button>
  );
}
```

### 2. CSS Components (When Styles Are Complex)

Use `@apply` directive in CSS for repeated patterns:

```css
/* app/globals.css */
@layer components {
	.btn {
		@apply px-4 py-2 rounded-lg font-medium transition-colors;
	}

	.btn-primary {
		@apply bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700;
	}

	.btn-secondary {
		@apply bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white;
	}

	.card {
		@apply bg-white dark:bg-slate-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-slate-700;
	}
}
```

Use in components:

```typescript
export default function Button({ variant = 'primary' }) {
  return <button className={`btn btn-${variant}`}>Click</button>;
}
```

### 3. Alternative: Utility Functions

```typescript
// lib/tailwind.ts
export const buttonStyles = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-slate-700',
};

export const cardStyles = 'bg-white dark:bg-slate-900 rounded-lg shadow-md p-6';

// components/Button.tsx
import { buttonStyles } from '@/lib/tailwind';

export default function Button({ variant = 'primary' }) {
  return (
    <button className={`px-4 py-2 rounded-lg font-medium ${buttonStyles[variant]}`}>
      Click
    </button>
  );
}
```

---

## Common Patterns

### Spacing Scale

```typescript
// Use consistent spacing
<div className="p-4 sm:p-6 lg:p-8">     {/* Padding */}
<div className="mb-4 sm:mb-6 lg:mb-8"> {/* Margin bottom */}
<div className="gap-4 sm:gap-6 lg:gap-8"> {/* Gap */}
```

### Responsive Grid

```typescript
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id} item={item} />)}
</div>
```

### Flexbox Utilities

```typescript
// Center content
<div className="flex items-center justify-center">Content</div>

// Space between
<div className="flex items-center justify-between">
  <div>Left</div>
  <div>Right</div>
</div>

// Column layout
<div className="flex flex-col gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Conditional Classes

```typescript
'use client';
import { useState } from 'react';

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6">
            <h2>Modal Title</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
```

Or use a utility function:

```typescript
const classNames = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(' ');

export default function Button({ isActive }: { isActive: boolean }) {
  return (
    <button
      className={classNames(
        'px-4 py-2 rounded-lg font-medium transition-colors',
        isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'
      )}
    >
      Button
    </button>
  );
}
```

---

## Important: Tailwind v4 Breaking Changes

Tailwind CSS 4 has changes from v3:

| Feature       | v3                   | v4                       |
| ------------- | -------------------- | ------------------------ |
| **Import**    | `@tailwind base;`    | `@import "tailwindcss";` |
| **Nesting**   | `:hover:` → `hover:` | Still use `hover:`       |
| **JS Config** | CommonJS             | ESM (`.mjs`)             |
| **Colors**    | Limited palette      | Extended palette         |
| **Filters**   | Separate values      | Integrated               |

Current setup uses v4 syntax, so you're good. Don't copy v3 patterns from old docs.

---

## Best Practices

| Do                                                        | Don't                                        |
| --------------------------------------------------------- | -------------------------------------------- |
| ✓ Use Tailwind utilities for styling                      | ✗ Write custom CSS for common patterns       |
| ✓ Extract repeated patterns to `@apply` or functions      | ✗ Copy-paste long utility strings            |
| ✓ Use CSS variables for theme values                      | ✗ Hardcode colors                            |
| ✓ Keep classes readable with line breaks for long strings | ✗ Put all utilities on one line              |
| ✓ Use arbitrary values for one-off needs: `w-[200px]`     | ✗ Add to `tailwind.config.ts` for single use |
| ✓ Responsive first: mobile → tablet → desktop             | ✗ Mobile-only design                         |
| ✓ Test dark mode during development                       | ✗ Forget dark variants                       |
| ✓ Use Tailwind's color palette                            | ✗ Use inconsistent custom colors             |

---

## References

- [Tailwind CSS 4 Docs](https://tailwindcss.com/docs)
- [Configuration](https://tailwindcss.com/docs/configuration)
- [Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Reusing Styles](https://tailwindcss.com/docs/reusing-styles)
