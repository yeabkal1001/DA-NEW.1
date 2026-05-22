# Antigravity Agent Guide

Welcome, **Antigravity**! This guide is tailored specifically for your AI capabilities, toolsets, and workflow patterns when maintaining, refactoring, or extending the Digital Addis marketing agency codebase.

Rely on the guidelines, architectural safeguards, and environment command instructions in this document to achieve premium, high-fidelity, and correct implementations.

---

## 🚀 Workspace Overview

Digital Addis is a highly-interactive, responsive Next.js 16 (App Router) showcase site built for a premier Ethiopian digital agency.

### Core Stack
* **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
* **Styling:** Tailwind CSS v3 + CSS Variable-based theming (HSL)
* **Components:** Custom shadcn/ui components (`src/components/ui/`)
* **Animations:** GSAP (GreenSock) + ScrollTrigger + Canvas-frame sequences

---

## 🛠️ Antigravity Core Safeguards

When writing or modifying files, you must strictly adhere to the following code patterns and performance protocols:

### 1. GSAP Lifecycle & Memory Leak Mitigation
GSAP timelines and ScrollTriggers can easily leak memory or create overlapping animation triggers in React if not safely unmounted.
* **Cleanup Rule:** Always revert GSAP contexts inside your `useEffect` unmount functions:
  ```typescript
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Your GSAP timelines go here
    }, containerRef);
    
    return () => ctx.revert(); // CRITICAL: Ensures complete cleanup
  }, []);
  ```
* **Singleton Preference:** Prefer using the centralized `gsapManager` (`src/lib/gsapManager.ts`) or the custom `useScrollAnimation` hook rather than registering ScrollTriggers manually.
* **Global Triggers:** Do not trigger global `ScrollTrigger.getAll().kill()` events within secondary sections. Let the parent homepage (`app/page.tsx`) manage global resizes.

### 2. Device Adaptability & Accessibility Hook Integrations
We support standard Ethiopian mobile network constraints and lower-end hardware profiles:
* **Capabilities Check:** Always consult `useDeviceCapabilities` and `useReducedMotion` before initializing rendering sequences or heavy DOM scrubs.
* **Simplification Rule:** If the user prefers reduced motion, or if the device exhibits low CPU cores, memory limits, or slow network speeds, drop high-overhead canvas scripts or GSAP timelines and degrade gracefully to crisp, static layouts.

### 3. Dynamic Routing in Next.js 16
In Next.js 16, route parameters in pages and dynamic segment metadata generators are **Promises**. 
* **Correct Parameter Pattern:** You must always await `params` before accessing nested properties:
  ```typescript
  export default async function WikiArticlePage({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params; // MANDATORY: Await params
    // ...
  }
  ```

### 4. Conditional Classes & Styling
* **Tailwind Merges:** Always conditionalize or merge Tailwind classes using our custom `cn` utility imported from `@/lib/utils` to prevent duplicate or conflicting styling rules.
  ```typescript
  import { cn } from '@/lib/utils';
  
  const className = cn("text-foreground", active && "text-primary");
  ```

### 5. Media & Image Rendering
* **No Raw `<img>` Tags:** Always wrap images in the custom `<OptimizedImage>` component (`src/components/OptimizedImage.tsx`) to trigger Next.js optimized asset loaders and prevent layout shifts.

---

## ⚡ Command & Environment Instructions

### 1. Verification Checking
* **The EPERM Port Lock:** Because the active local dev server (`pnpm dev`) locks the `.next/` build directory, running a full production `pnpm build` will fail with an `EPERM` operation not permitted error on Windows.
* **Safe Type checking:** To safely verify code compilation, syntax, imports, and type correctness without crashing the dev server, execute:
  ```bash
  npx tsc --noEmit
  ```
  This guarantees that all TypeScript typings are correct without encountering EPERM directory conflicts.

### 2. Linting
* **CLI Limitations:** The version of Next.js 16 in this repository does not include the built-in `lint` action inside its binary commands (i.e. `next lint` will attempt to parse `lint` as a directory and fail).
* **Syntax Checks:** Rely on `npx tsc --noEmit` and your own token verification routines to check for logical and import errors.

---

## 📂 Slug Mapping Architecture

The `/wiki` route scans files recursively in `.qoder/repowiki/en/content/`. 
If you add new documentation or update existing markdown files, ensure that they are placed in this folder. Hyphenated, lowercased URLs map dynamically:

* `Getting Started.md` ➡️ `/wiki/getting-started`
* `Animation System/Animation System.md` ➡️ `/wiki/animation-system` (resolves to folder-named main index files automatically)
* `Architecture Overview/Architecture Overview.md` ➡️ `/wiki/architecture-overview`
