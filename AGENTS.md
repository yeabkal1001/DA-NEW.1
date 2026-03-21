# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is the **Digital Addis** website — a marketing/agency site for an Ethiopian digital agency. It is a Next.js 16 (App Router) project using React 19, TypeScript, Tailwind CSS v3, and shadcn/ui components. The project uses `pnpm` as the package manager (a `pnpm-lock.yaml` is present alongside `package-lock.json`).

## Commands

```bash
# Development server (uses Turbopack by default via next.config.js)
pnpm dev

# Production build
pnpm build

# Start production server (after build)
pnpm start

# Lint
pnpm lint
```

There is no test suite configured in this project.

## Architecture

### Routing (Next.js App Router)
All routes live under `app/`. Each route has a `page.tsx` and `layout.tsx`. Dynamic routes use bracket notation:
- `app/page.tsx` — home page (the main single-page experience)
- `app/about/`, `app/blog/`, `app/contact/`, `app/projects/`, `app/services/` — sub-pages
- `app/blog/[id]/`, `app/projects/[id]/` — dynamic detail pages

`app/layout.tsx` is the root layout. It wraps all pages with `ThemeProvider` (dark/light via `next-themes`), `PageLoader`, and `ErrorBoundary`.

### Source code split (`src/` vs `app/`)
- `app/` — Next.js routing layer only (pages and layouts)
- `src/sections/` — Large page sections rendered in `app/page.tsx` (Hero, Services, Team, etc.)
- `src/components/` — Reusable components including the full shadcn/ui library under `src/components/ui/`
- `src/hooks/` — Custom hooks (see below)
- `src/lib/` — Utility singletons (`utils.ts`, `gsapManager.ts`, `webVitals.ts`)

### Path aliases (tsconfig.json)
```
@/*            → ./*            (repo root)
@/components/* → ./src/components/*
@/lib/*        → ./src/lib/*
@/hooks/*      → ./src/hooks/*
@/src/*        → ./src/*
```

### Animation architecture (GSAP + ScrollTrigger)
GSAP with ScrollTrigger is the primary animation library. Key patterns:
- `gsap.registerPlugin(ScrollTrigger)` is called at module level inside a `typeof window !== 'undefined'` guard to avoid SSR errors.
- All GSAP contexts must be cleaned up via `ctx.revert()` in `useEffect` return functions.
- `src/lib/gsapManager.ts` exports a singleton `gsapManager` for namespace-based context/ScrollTrigger lifecycle management — prefer this over managing contexts manually when building new animated sections.
- `src/hooks/useScrollAnimation.ts` provides `useScrollAnimation(callback, deps)` which returns a `ref` and handles context cleanup automatically.
- The home page (`app/page.tsx`) owns global ScrollTrigger cleanup and debounced resize refresh. Individual sections should not call `ScrollTrigger.getAll().kill()` globally.

### Home page section loading strategy
`app/page.tsx` uses Next.js `dynamic()` for all below-fold sections (everything except `Navbar` and `HeroSequence`). Each section uses `ssr: true` with a skeleton fallback to avoid layout shift. Only `Navbar` and `HeroSequence` are statically imported (critical path).

### HeroSequence canvas animation
`src/sections/HeroSequence.tsx` is the most complex component. It renders a frame-by-frame animation of ~48 WebP images (every 4th of 192 original frames) onto a `<canvas>`. Loading is prioritised: first 5 frames load synchronously, remaining frames load via `requestIdleCallback` in batches of 3. The scroll-scrub is driven by a GSAP timeline pinned to `containerRef` with `height: 500vh`.

### UI Components (shadcn/ui)
All primitive UI components are in `src/components/ui/` and are shadcn/ui components. The `cn()` utility (`src/lib/utils.ts`) merges Tailwind classes using `clsx` + `tailwind-merge` — always use `cn()` for conditional class merging.

### Theming
- Tailwind is configured with CSS variable-based theming (`hsl(var(--border))` etc.) with dark mode via the `class` strategy.
- The brand accent color is `lime` = `#CCFF00`, used extensively throughout the site.
- CSS variables are defined in `app/globals.css`.
- `ThemeProvider` defaults to `light` with `enableSystem`.

### Performance hooks (`src/hooks/`)
| Hook | Purpose |
|---|---|
| `useDeviceCapabilities` | Detects mobile, device memory, CPU cores, connection speed |
| `useReducedMotion` | Reads `prefers-reduced-motion` media query |
| `useScrollAnimation` | GSAP context scoped to a ref with auto-cleanup |
| `useIntersectionObserver` | Visibility detection for lazy triggering |
| `usePerformanceMonitor` | Component render timing and health checks |

When building new animated sections, always check `useDeviceCapabilities` and `useReducedMotion` to conditionally disable or simplify animations on low-end/accessibility-sensitive devices.

### Image optimization
- Use `src/components/OptimizedImage.tsx` (a wrapper around Next.js `<Image>`) for all content images rather than native `<img>` tags.
- The `/public/images/image sequence/` directory holds the hero frame WebP assets.
- `next.config.js` allows remote images from `images.unsplash.com` and `*.public.blob.vercel-storage.com`.
