# Monorepo rules

This is a Turbo monorepo with Bun workspaces.

## Structure

- `apps/web` — Next.js web application (App Router, Tailwind CSS v4, shadcn/ui)
- `apps/mobile` — Expo React Native app (Expo Router, NativeWind v5, Tailwind CSS v4)
- `packages/backend` — Shared backend logic, types, and contracts (used by web + mobile)
- `packages/typescript-config` — Shared TypeScript configurations

## Next.js (apps/web) rules

- Use the App Router structure with `page.tsx` files in route directories.
- Client components must be explicitly marked with `'use client'` at the top of the file.
- Use kebab-case for directory names (e.g., `components/auth-form`) and PascalCase for component files.
- Prefer named exports over default exports, i.e. `export function Button() { /* ... */ }` instead of `export default function Button() { /* ... */ }`.
- Minimize `'use client'` directives:
  - Keep most components as React Server Components (RSC)
  - Only use client components when you need interactivity and wrap in `Suspense` with fallback UI
  - Create small client component wrappers around interactive elements
- Avoid unnecessary `useState` and `useEffect` when possible:
  - Use server components for data fetching
  - Use React Server Actions for form handling
  - Use URL search params for shareable state

### Do

- use Shadcn/UI Components from the /ui folder
- use TailwindCSS v4.
- use `toast` from sonner instead of alert()
- use `useCallback` where necessary

### Don't

- do not use `useEffect` when not needed, find a better solution
- do not create markdowns
- do not run your own commands. ask the user to install whatever necessary package needed
- do not ask to start development command.
- do not use `bun run dev`, `bun run build`, `bun run start`
- do not migrate or generate updated database schemas.
- do not add new dependencies without approval
- do not use alert()
- do not use raw button, input, etc
- do not use TailwindCSS v3

### Commands

#### Checking Code (Runs without linter and fixes files)

- bun run format

#### Fixing Code (Runs the linter and fixes files)

- bun run check

Note: Always lint and typecheck updated files.

### Safety and permissions

Allowed without prompt:

- read files, list files

Ask first:

- package installs,
- git push
- deleting files, chmod
- running full build or end to end suites

### Project structure

- see `apps/web/app` for web routes
- see `apps/mobile/app` for mobile routes
- web components live in `apps/web/components`
- see `packages/backend` for shared backend logic
- shadcn/ui components live in `apps/web/components/ui`

### When stuck

- ask a clarifying question, propose a short plan, or open a draft PR with notes
- do not push large speculative changes without confirmation
