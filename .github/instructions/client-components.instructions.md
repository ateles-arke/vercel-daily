---
name: client-components
description: "When and how to use 'use client' directive in Next.js 16. Guidelines for Client Component boundaries, interactivity, state management, and patterns."
applyTo: "**/*.tsx,**/*.ts"
---

# Client Components

## Default: Server Components

By default, all components in `app/` are **Server Components** (no `'use client'` needed).

```typescript
// ✅ Server Component (default)
// Can access databases, APIs, secrets directly
async function Page() {
  const data = await db.query('SELECT * FROM posts');
  return <div>{data.map(item => <Card key={item.id} {...item} />)}</div>;
}
```

---

## When to Add `'use client'`

Add `'use client'` **only when you need**:
- React hooks (`useState`, `useEffect`, `useContext`)
- Event handlers (`onClick`, `onChange`)
- Browser APIs (`localStorage`, `window`)
- Real-time updates or polling
- Form interactivity

```typescript
// ❌ Unnecessary Client Component
'use client';
export default function Card({ title, content }) {
  return <div>{title}</div>;
}

// ✅ Necessary Client Component
'use client';
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

## Client Component Boundaries

Keep Client Component boundaries as **narrow as possible**. Don't make the whole page a Client Component.

### ❌ Bad Pattern

```typescript
// app/page.tsx — DON'T DO THIS
'use client';

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data').then(r => r.json()).then(setData);
  }, []);

  return <div>{data?.name}</div>;
}
```

**Why?** Fetching data and transforming `page.tsx` to Client Component wastes Server Component benefits.

### ✅ Good Pattern

```typescript
// app/page.tsx — Server Component
import DataDisplay from '@/components/DataDisplay';

export default async function Page() {
  const data = await fetch('/api/data').then(r => r.json());
  return <DataDisplay data={data} />;
}

// components/DataDisplay.tsx — Client Component (minimal)
'use client';
export default function DataDisplay({ data }) {
  return <div>{data.name}</div>;
}
```

**Why?** Separate concerns: fetch server-side, render on client.

---

## Patterns for Client Components

### Pattern 1: Interactive Wrapper

Wrap interactive elements in a small Client Component; keep content a Server Component.

```typescript
// app/posts/page.tsx — Server Component
import PostList from '@/components/PostList';
import FilterControls from '@/components/FilterControls';

export default async function PostsPage() {
  const posts = await fetchPosts();
  
  return (
    <div>
      <FilterControls />
      <PostList posts={posts} />
    </div>
  );
}

// components/FilterControls.tsx — Client Component
'use client';
import { useState } from 'react';

export default function FilterControls() {
  const [filter, setFilter] = useState('');
  
  return (
    <input 
      value={filter} 
      onChange={e => setFilter(e.target.value)} 
      placeholder="Filter..." 
    />
  );
}

// components/PostList.tsx — Server Component
export default function PostList({ posts }: { posts: Post[] }) {
  return posts.map(post => <div key={post.id}>{post.title}</div>);
}
```

### Pattern 2: Form with Server Action

Use Server Actions for form submission (no Client Component needed).

```typescript
// app/posts/create/page.tsx — Server Component
import { createPost } from '@/lib/actions';

export default function CreatePostPage() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Title" required />
      <textarea name="content" placeholder="Content" required />
      <button type="submit">Create</button>
    </form>
  );
}

// lib/actions.ts — Server Action
'use server';
import { db } from '@/lib/db';

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  const content = formData.get('content');
  
  const post = await db.posts.create({ title, content });
  redirect(`/posts/${post.id}`);
}
```

### Pattern 3: Context + Small Client Component

If you need shared state, use Context but keep the Client Component tree small.

```typescript
// providers/ThemeProvider.tsx — Client Component
'use client';
import { createContext, useState } from 'react';

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// app/layout.tsx — Server Component
import { ThemeProvider } from '@/providers/ThemeProvider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

// components/ThemeSwitcher.tsx — Small Client Component
'use client';
import { useContext } from 'react';
import { ThemeContext } from '@/providers/ThemeProvider';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}
```

---

## Common Mistakes

| Mistake | Solution |
|--------|----------|
| Making whole page `'use client'` for one interactive element | Extract interactive part to separate Client Component |
| Using `useState` in Server Component | Move state to Client Component or use Server Actions |
| Calling async functions in `useEffect` | Fetch server-side and pass as props, or use a library like `useSWR` |
| Passing Server-only objects to Client Components | Serialize data first: `JSON.stringify(data)` |
| Forgetting `'use client'` when using hooks | Add directive at top of file |

---

## TypeScript: Client Component Props

Type your Client Component props strictly:

```typescript
'use client';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false 
}: ButtonProps) {
  return (
    <button 
      onClick={onClick} 
      className={`btn btn-${variant}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

---

## References

- [Client Components vs Server Components](https://nextjs.org/docs/app/building-your-application/rendering)
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
- [React use client Directive](https://react.dev/reference/react/use-client)
