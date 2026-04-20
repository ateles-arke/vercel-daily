<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

---

## workspace Instructions

For complete project context, agent conventions, and development guidance, see [`.github/copilot-instructions.md`](./.github/copilot-instructions.md).

### Quick Reference

- **Stack**: Next.js 16.2.4 + React 19.2.4 + TypeScript + Tailwind CSS 4 + pnpm
- **Status**: Greenfield (v0.1.0) — no component/lib structure yet
- **Default Environment**: Server Components, strict TypeScript, dark mode ready
- **Build Commands**: `pnpm dev` (dev), `pnpm build`, `pnpm lint`
- **Key Pitfall**: Always check `node_modules/next/dist/docs/` for API specifics

### Navigation

| Section                                                                                                        | Purpose                                   |
| -------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| [Project Overview](./.github/copilot-instructions.md#project-overview)                                         | Tech stack, breaking changes warning      |
| [Development Workflow](./.github/copilot-instructions.md#development-workflow)                                 | Setup, build, dev commands                |
| [React & TypeScript Conventions](./.github/copilot-instructions.md#react--typescript-conventions)              | Server Components, type patterns, imports |
| [Tailwind CSS 4](./.github/copilot-instructions.md#styling-with-tailwind-css-4)                                | Styling, CSS variables, dark mode         |
| [Pitfalls & Guidance](./.github/copilot-instructions.md#common-pitfalls--guidance)                             | Common mistakes to avoid                  |
| [Folder Structure Recommendation](./.github/copilot-instructions.md#recommended-folder-structure-once-growing) | Scalability patterns                      |
