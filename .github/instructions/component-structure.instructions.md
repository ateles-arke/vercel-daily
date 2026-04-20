---
name: component-structure
description: 'Guidelines for organizing and structuring React components: folder layout, naming conventions, TypeScript patterns, and reusability.'
applyTo: 'components/**/*.tsx,app/**/*.tsx'
---

# Component Structure

## File Organization

Create a `components/` folder to organize reusable components.

```
components/
├── ui/                          # Atomic, reusable UI elements
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── Modal.tsx
├── layout/                      # Layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Sidebar.tsx
│   └── MainLayout.tsx
├── features/                    # Feature-specific components (business logic)
│   ├── PostCard.tsx
│   ├── PostList.tsx
│   └── PostFilters.tsx
└── forms/                       # Form components
    ├── LoginForm.tsx
    ├── CreatePostForm.tsx
    └── ContactForm.tsx
```

**Guidelines:**

- `ui/`: Presentational, framework-agnostic components (Button, Card, Input)
- `layout/`: Page structure components (Header, Sidebar, MainLayout)
- `features/`: Business-specific components (PostCard uses Post data)
- `forms/`: Form components with validation/submission logic

---

## Naming Conventions

### Components

- **PascalCase for component files**: `Button.tsx`, `UserProfile.tsx`, `PostCard.tsx`
- **Export default**: Component file exports one component as default
- **Match folder structure**: If deeply nested, use shorter names

```typescript
// ✅ components/ui/Button.tsx
export default function Button({ children, variant }: ButtonProps) {
  return <button className={`btn btn-${variant}`}>{children}</button>;
}

// ✅ components/features/PostCard.tsx
export default function PostCard({ post }: { post: Post }) {
  return <article>{post.title}</article>;
}

// ❌ components/PostCardComponent.tsx — avoid redundant naming
// ❌ components/post-card.tsx — use PascalCase for components
```

### Utils & Helpers

- **camelCase for utility files**: `utils.ts`, `helpers.ts`, `constants.ts`
- **Named exports for utilities**

```typescript
// lib/utils.ts
export function formatDate(date: Date): string {
	return date.toLocaleDateString();
}

export function classNames(...classes: (string | undefined)[]): string {
	return classes.filter(Boolean).join(' ');
}

// lib/constants.ts
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
