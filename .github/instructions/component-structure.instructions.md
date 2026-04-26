---
name: component-structure
description: 'Guidelines for organizing React code in src/, applying atomic design in components/ui, and keeping feature composition clean and reusable.'
applyTo: 'src/components/**/*.tsx,src/app/**/*.tsx'
---

# Component Structure & Atomic Design

## File Organization Under src/

Create reusable components in `src/components/` following atomic design principles.

```text
src/
├── app/
│   └── features/                # Feature-specific route areas
│       ├── news/
│       ├── auth/
│       └── profile/
├── components/
│   ├── ui/                      # Design system components (atomic)
│   │   ├── atoms/
│   │   │   ├── Button.tsx
│   │   │   ├── Icon.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── Label.tsx
│   │   ├── molecules/
│   │   │   ├── SearchField.tsx
│   │   │   ├── CardHeader.tsx
│   │   │   └── FormRow.tsx
│   │   └── organisms/
│   │       ├── Navbar.tsx
│   │       ├── HeroSection.tsx
│   │       └── ArticleList.tsx
│   ├── layout/                  # Layout shells and page wrappers
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── MainLayout.tsx
│   └── shared/                  # Cross-feature reusable components
│       ├── PostCard.tsx
│       ├── UserProfile.tsx
│       └── Breadcrumb.tsx
├── lib/                         # Utilities and helpers
│   ├── utils.ts
│   └── constants.ts
├── services/                    # API integrations
│   └── api.ts
└── types/                       # Shared TypeScript types
    └── index.ts
```

**Folder guidelines:**

- `ui/atoms/`: Small primitives such as buttons, labels, icons, badges, and inputs
- `ui/molecules/`: Combinations of atoms such as search fields, card headers, and form rows
- `ui/organisms/`: Larger reusable sections composed from atoms and molecules such as navbars, hero blocks, and article lists
- `layout/`: Page shells and template-like structures that wrap routes
- `shared/`: Reusable cross-feature components that combine UI and light business logic
- **Never put feature-specific logic in `ui/`** — keep `ui/` purely design-system focused

---

## Component Folder Pattern

Any component with sub-components or hooks **must** use a folder with an `index.tsx` entry point.

```text
src/components/<tier>/<ComponentName>/
├── index.tsx                        ← Default export of the component
├── components/                      ← Private sub-components (only used by this component)
│   └── <SubComponent>/
│       ├── index.tsx
│       └── hooks/
│           └── use<SubComponent>.ts ← Hook scoped to that sub-component
└── hooks/
    └── use<ComponentName>.ts        ← Hook scoped to this component
```

### Rules

- A component that owns a hook **must** place it in a `hooks/` folder inside the component folder
- A component that owns sub-components **must** place them in a `components/` folder inside the component folder
- Sub-components are **private** — never import them from outside the parent component folder
- Always import the parent by folder path: `import Header from '@/components/layout/header'`
- The component `index.tsx` **only** calls the hook and renders UI — no logic inline
- Side effects (`localStorage`, `document`, `matchMedia`, `fetch`) belong in the hook, never in JSX

### Example — Header with ThemeToggle

```text
src/components/layout/header/
├── index.tsx                          ← Header (Server Component)
└── components/
    └── ThemeToggle/
        ├── index.tsx                  ← Renders toggle UI, calls useTheme
        └── hooks/
            └── useTheme.ts            ← All theme state + localStorage logic
```

```typescript
// ✅ hooks/useTheme.ts — owns all theme state and side effects
export function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored ? stored === 'dark' : prefersDark;
    setIsDark(initial);
    document.documentElement.classList.toggle('dark', initial);
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  return { isDark, toggle };
}

// ✅ ThemeToggle/index.tsx — only renders, delegates logic to hook
'use client';
import { useTheme } from './hooks/useTheme';

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  return <button onClick={toggle}>{isDark ? 'Light' : 'Dark'}</button>;
}
```

### When to use a flat file vs. a folder

| Situation                                     | Use                                                                   |
| --------------------------------------------- | --------------------------------------------------------------------- |
| Simple component, no hooks, no sub-components | Single `ComponentName.tsx` file                                       |
| Component has a custom hook                   | `ComponentName/index.tsx` + `ComponentName/hooks/useComponentName.ts` |
| Component has private sub-components          | `ComponentName/index.tsx` + `ComponentName/components/SubComponent/`  |

---

## Naming Conventions

### Components

- **PascalCase for component files**: `Button.tsx`, `UserProfile.tsx`, `PostCard.tsx`
- **Export default**: Component file exports one component as default
- **Match folder structure**: Atomic design hierarchy—simplest at the top

```typescript
// ✅ src/components/ui/atoms/Button.tsx
export default function Button({ children, variant }: ButtonProps) {
  return <button className={`btn btn-${variant}`}>{children}</button>;
}

// ✅ src/components/ui/molecules/SearchField.tsx
export default function SearchField({ placeholder, onSearch }: SearchFieldProps) {
  return <input type="text" placeholder={placeholder} onChange={onSearch} />;
}

// ✅ src/components/shared/PostCard.tsx
export default function PostCard({ post }: { post: Post }) {
  return <article>{post.title}</article>;
}

// ❌ src/components/PostCardComponent.tsx — avoid redundant naming
// ❌ src/components/post-card.tsx — use PascalCase for components
```

### Utils & Helpers

```typescript
// src/lib/utils.ts
export function formatDate(date: Date): string {
	return date.toLocaleDateString();
}

export function classNames(...classes: (string | undefined)[]): string {
	return classes.filter(Boolean).join(' ');
}

// src/lib/constants.ts
export const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
export const ITEMS_PER_PAGE = 10;
```

---

## TypeScript Patterns

### Component Props

Define props interfaces clearly:

```typescript
// ✅ Explicit props interface
interface ButtonProps {
  /** Button text or content */
  children: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'danger';
  /** Disabled state */
  disabled?: boolean;
  /** Optional className for Tailwind */
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${className || ''}`}
    >
      {children}
    </button>
  );
}

// ❌ Avoid: Implicit any or overly generic props
export default function Button(props: any) {
  // Type information lost
}
```

### Server vs Client Props

Be explicit about component type:

```typescript
// ✅ Server Component (async, direct data fetching)
async function PostList({ categoryId }: { categoryId: string }) {
  const posts = await db.posts.findMany({ categoryId });
  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

// ✅ Client Component (interactive, not async)
'use client';

interface PostListProps {
  posts: Post[];
  onPostClick?: (post: Post) => void;
}

export default function PostList({ posts, onPostClick }: PostListProps) {
  const [selected, setSelected] = useState<Post | null>(null);

  return (
    <div>
      {posts.map(post => (
        <PostCard
          key={post.id}
          post={post}
          onSelect={() => {
            setSelected(post);
            onPostClick?.(post);
          }}
        />
      ))}
    </div>
  );
}
```

---

## Reusability & Composition

### Build Composable Components

```typescript
// ✅ Composable Button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  const baseClass = 'font-medium rounded transition';
  const variantClass = variant === 'primary' ? 'bg-blue-500' : 'bg-gray-300';
  const sizeClass = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }[size];

  return (
    <button
      className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    />
  );
}

// ✅ Use it flexibly
<Button variant="primary" size="lg">Large Primary Button</Button>
<Button variant="secondary" onClick={handleClick}>Secondary Button</Button>
```

### Control Complexity with Variants

```typescript
// ✅ Use discriminated unions for complex components
interface CardProps {
  type: 'post' | 'user' | 'product';
}

interface PostCardProps extends CardProps {
  type: 'post';
  post: Post;
  onDelete?: (id: string) => void;
}

interface UserCardProps extends CardProps {
  type: 'user';
  user: User;
}

type CardVariant = PostCardProps | UserCardProps;

export default function Card(props: CardVariant) {
  switch (props.type) {
    case 'post':
      return <div>{props.post.title}</div>;
    case 'user':
      return <div>{props.user.name}</div>;
  }
}
```

---

## Common Patterns

### Forwarding Refs (for UI components)

```typescript
'use client';
import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, ...props }, ref) => (
    <div>
      {label && <label>{label}</label>}
      <input ref={ref} className={`input ${className}`} {...props} />
    </div>
  )
);

Input.displayName = 'Input';
export default Input;
```

### Compound Components

```typescript
// ✅ For complex, cohesive components
interface CardProps {
  children: React.ReactNode;
}

function Card({ children }: CardProps) {
  return <div className="card">{children}</div>;
}

function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="card-header">{children}</div>;
}

function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="card-body">{children}</div>;
}

function CardFooter({ children }: { children: React.ReactNode }) {
  return <div className="card-footer">{children}</div>;
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;

// Usage:
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

---

## Asset Management: SVG & Image Components

### SVG Strategy

**All SVG assets must be:**

1. Stored as files in `/public/icons/` directory
2. Rendered using Next.js `<Image>` component from `next/image`
3. **Never** used as inline `<svg>` JSX in components

**Why this pattern:**

- Separates concerns: visualizations live in files, not component code
- Enables Next.js image optimization automatically
- Reduces component code size and complexity
- Maintains a single source of truth for icon updates
- Improves performance with lazy loading and format optimization

### Organizing SVG Files

```text
/public/icons/
├── logo.svg                    ← Brand logo (18×18)
├── sun.svg                     ← Light mode icon (16×16)
├── moon.svg                    ← Dark mode icon (16×16)
├── bell.svg                    ← Notification bell outline (16×16)
├── bell-filled.svg             ← Notification bell filled (16×16)
├── bell-off.svg                ← Notification bell off (14×14)
└── warning.svg                 ← Alert/breaking news (15×15)
```

**Naming conventions:**

- Use lowercase with hyphens: `my-icon.svg` (not `MyIcon.svg` or `my_icon.svg`)
- Use descriptive names: `bell-filled.svg` (not `icon1.svg`)
- Include variants: `bell.svg`, `bell-filled.svg`, `bell-off.svg`
- Document dimensions in viewBox (for reference)

### Using Images in Components

```typescript
// ✅ Simple icon usage
import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex items-center gap-4">
      <Image
        src="/icons/logo.svg"
        alt="Vercel Daily logo"
        width={18}
        height={18}
      />
      <h1>Vercel Daily</h1>
    </header>
  );
}

// ✅ State-dependent icon (e.g., theme toggle)
'use client';
import Image from 'next/image';
import { useTheme } from './hooks/useTheme';

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <button onClick={toggle} aria-label="Toggle theme">
      <Image
        src={isDark ? '/icons/moon.svg' : '/icons/sun.svg'}
        alt={isDark ? 'Moon icon' : 'Sun icon'}
        width={16}
        height={16}
      />
    </button>
  );
}

// ✅ Icon with variants (e.g., subscription bell)
'use client';
import Image from 'next/image';
import { useSubscription } from './hooks/useSubscription';

export default function SubscribeButton() {
  const { isSubscribed, toggleSubscription } = useSubscription();

  return (
    <button onClick={toggleSubscription} aria-label="Manage subscription">
      <Image
        src={
          isSubscribed
            ? '/icons/bell-filled.svg'
            : '/icons/bell.svg'
        }
        alt={isSubscribed ? 'Subscribed' : 'Unsubscribed'}
        width={16}
        height={16}
      />
    </button>
  );
}
```

### Image Props & Sizing

Always specify `width` and `height` for static SVGs:

```typescript
// ✅ Always include dimensions
<Image
  src="/icons/logo.svg"
  alt="Logo"
  width={18}
  height={18}
/>

// ✅ Use original SVG dimensions (preserved in viewBox as reference)
// Logo SVG: viewBox="0 0 18 18" → width={18} height={18}
// Bell SVG: viewBox="0 0 16 16" → width={16} height={16}

// ❌ Avoid omitting dimensions
<Image src="/icons/logo.svg" alt="Logo" />

// ❌ Avoid inline SVGs
<svg viewBox="0 0 18 18">
  <path d="..." />
</svg>
```

### When to Create a New Icon

If no icon exists in `/public/icons/`:

1. Create the SVG file with a descriptive name
2. Define the viewBox with exact dimensions (e.g., `viewBox="0 0 16 16"`)
3. Keep the SVG minimal (strip unnecessary metadata, use simple shapes)
4. Export it as `/public/icons/my-icon.svg`
5. Update this section with the new icon reference

**Bad SVG example:**

```xml
<!-- ❌ Too much metadata, mixed content -->
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ... many attributes>
  <defs>...</defs>
  <style>...</style>
  <g id="layer1">...</g>
</svg>
```

**Good SVG example:**

```xml
<!-- ✅ Clean, minimal, proper viewBox -->
<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 1c.5 0 1 .5 1 1v3h3c.5 0 1 .5 1 1s-.5 1-1 1h-3v3c0 .5-.5 1-1 1s-1-.5-1-1v-3H4c-.5 0-1-.5-1-1s.5-1 1-1h3V2c0-.5.5-1 1-1z" />
</svg>
```

---

## Import Paths

Always use path aliases for imports:

```typescript
// ✅ Use @/* alias
import Button from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import type { Post } from '@/types';

// ❌ Avoid relative imports
import Button from '../../../components/ui/Button';
```

---

## Best Practices

| Do                                                | Don't                                         |
| ------------------------------------------------- | --------------------------------------------- |
| ✓ Keep components focused (single responsibility) | ✗ Create "god components" with too much logic |
| ✓ Extract magic strings to constants              | ✗ Hardcode values in JSX                      |
| ✓ Type all props explicitly                       | ✗ Use `any` or `explicit: false`              |
| ✓ Prefer composition over inheritance             | ✗ Use class components or mixins              |
| ✓ Memoize expensive computations with `useMemo`   | ✗ Recalculate on every render                 |
| ✓ Keep Client Component boundaries narrow         | ✗ Mark entire pages as `'use client'`         |
| ✓ Document complex props with JSDoc               | ✗ Leave props undocumented                    |

---

## References

- [React Docs: Components](https://react.dev/learn/your-first-component)
- [TypeScript Handbook: Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)
- [Composition vs Inheritance](https://react.dev/learn/thinking-in-react)
