# WebSuite Monorepo

WebSuite is a Bun + Turbo monorepo with:

- `apps/web`: Next.js (App Router) + Tailwind CSS v4 + shadcn/ui
- `apps/mobile`: Expo Router + React Native + NativeWind v4 (Tailwind CSS v3)
- `packages/backend`: shared backend/domain code for web and mobile
- `packages/typescript-config`: shared TypeScript config presets

## Repository Structure

```text
.
├── apps/
│   ├── web/                 # Next.js web app
│   └── mobile/              # Expo React Native app
├── packages/
│   ├── backend/             # Shared logic/types
│   └── typescript-config/   # Shared TS configs
├── turbo.json               # Turbo task pipeline
└── package.json             # Root workspace scripts
```

## Prerequisites

- Bun `1.3.x`
- Node.js `>= 20` (used by Expo/tooling)
- Xcode + iOS Simulator (for iOS)
- Android Studio/Emulator (for Android, optional)

## Install Dependencies

From repo root:

```bash
bun install
```

## Run Apps

### Run all dev tasks (Turbo)

```bash
bun run dev
```

### Run web only

```bash
bun run web:dev
```

### Run mobile only

```bash
bun run mobile:dev
```

In the Expo terminal:

- press `i` for iOS simulator
- press `a` for Android emulator
- press `r` to reload

## Quality Commands

From root:

```bash
bun run check
bun run typecheck
bun run build
```

Per app:

- `apps/web`: `bun run check`, `bun run typecheck`
- `apps/mobile`: `bun run check`, `bun run typecheck`

## Mobile Styling Notes (NativeWind)

- NativeWind is configured in:
  - `apps/mobile/babel.config.js`
  - `apps/mobile/metro.config.js`
  - `apps/mobile/tailwind.config.ts`
  - `apps/mobile/global.css`
- `global.css` is imported in `apps/mobile/app/_layout.tsx`.
- If styles do not appear, restart Expo with cache clear:

```bash
cd apps/mobile
bun run dev -- --clear
```

## Shared Code Usage

- Put cross-platform domain/backend code in `packages/backend/src`.
- Import it in apps via `@websuite/backend`.
- Keep platform-specific UI inside each app (`apps/web`, `apps/mobile`).
