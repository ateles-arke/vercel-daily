---
name: create-component
description: "Generate a new reusable React component with TypeScript, props interface, and optional 'use client' directive."
---

# Create a New Component

You're about to generate a new reusable React component.

## What do you want to create?

1. **Component name** (e.g., `Button`, `UserCard`, `PostList`)
   - Use PascalCase
   - Will create `components/[category]/[Name].tsx`

2. **Component category** (choose one)
   - **ui** — Presentational, framework-agnostic (Button, Card, Input, Modal)
   - **layout** — Page structure (Header, Footer, Sidebar, MainLayout)
   - **features** — Business-specific (PostCard, UserProfile, Dashboard)
   - **forms** — Form components (LoginForm, CreatePostForm, ContactForm)

3. **Component type** (choose one)
   - **Presentational (Server)** — Pure UI, no state, Server Component
   - **Interactive (Client)** — Uses `useState`, `useEffect`, Client Component
   - **Container** — Fetches data, renders children Server Component
   - **Form Handler** — Form submission with validation, Client Component

4. **Props** (describe what it accepts)
   - Examples: "title, description, onClick", "user: User, isActive: boolean"
   - I'll generate a proper TypeScript interface

5. **Styling** (choose one)
   - **Tailwind utilities** — Direct className usage
   - **@apply CSS classes** — Custom CSS classes for reuse
   - **CSS modules** — Scoped styling (optional)

6. **Special features?** (optional, comma-separated)
   - `dark-mode` — Support both light/dark colors
   - `responsive` — Mobile-first responsive design
   - `animations` — Hover, transition effects
   - `accessibility` — ARIA labels, keyboard navigation
   - `variants` — Multiple visual states (primary, secondary, danger)

---

## Example Inputs

**Example 1: Simple UI component**
```
Name: Button
Category: ui
Type: Presentational
Props: children, variant: 'primary' | 'secondary', disabled: boolean
Styling: Tailwind utilities
Features: dark-mode, variants
```

**Example 2: Interactive form component**
```
Name: CommentForm
Category: features
Type: Form Handler
Props: postId: string, onSubmit: (text: string) => void
Styling: Tailwind utilities
Features: validation, dark-mode
```

**Example 3: Data container**
```
Name: UserProfile
Category: features
Type: Container
Props: userId: string
Styling: @apply CSS classes
Features: responsive, dark-mode, animations
```

---

Once you provide these details, I'll generate:
✓ Proper TypeScript props interface
✓ `'use client'` directive (if interactive)
✓ Tailwind styling (dark mode included)
✓ JSDoc comments for props
✓ Accessibility best practices
✓ Follows `component-structure.instructions.md` patterns
✓ Ready-to-use in your app
