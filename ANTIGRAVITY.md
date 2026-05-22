# ANTIGRAVITY.md

This file provides specialized guidance to **Antigravity** (and other AI coding agents) when working with code in this repository.

> [!NOTE]
> For a fully-rendered, comprehensive guidebook integrated with our interactive internal browser UI, visit the local page `/wiki/antigravity-agent-guide` or read the dynamic wiki file:
> [.antigravity/repowiki/en/content/Antigravity Agent Guide.md](file:///c:/Users/yeabs/OneDrive/Documents/Projects/DA-NEW.1/.antigravity/repowiki/en/content/Antigravity%20Agent%20Guide.md)

---

## 🚀 Technical Summary

* **Platform:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v3
* **Accent Theme:** HSL-based lime green (`#CCFF00`) accent highlights on deep dark backgrounds.
* **Animations:** GSAP + ScrollTrigger + Canvas scrubbing sequences (Hero).

---

## 🛠️ Key Execution Safeguards

### 1. GSAP Lifecycle Hooks
Always register a context unmount callback (`ctx.revert()`) inside React's `useEffect` to prevent animation memory leaks or trigger overlaps:
```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    // Timelines here
  }, elementRef);
  return () => ctx.revert();
}, []);
```
*Prefer utilizing `useScrollAnimation` or `gsapManager` instead of raw ScrollTriggers.*

### 2. Device Adaptability
Consult `useDeviceCapabilities()` and `useReducedMotion()` before running heavy canvas scrubbing sequences. Degrade to static, clean styles on accessibility-sensitive or resource-constrained devices.

### 3. Dynamic Route Promises in Next.js 16
`params` is an asynchronous `Promise` inside pages and dynamic metadata generators. Await them first:
```typescript
const { slug } = await params;
```

### 4. Custom Components & Styling
* **Tailwind merging:** Always conditionalize class structures via the `cn()` utility from `@/lib/utils`.
* **Optimized Media:** Use `<OptimizedImage>` (`src/components/OptimizedImage.tsx`) instead of raw HTML `<img>` tags.

---

## ⚡ Command Workflow

* **Safe Compilation Checking:** Dev servers (`pnpm dev`) lock the output folders on Windows, triggering `EPERM` errors on build attempts. Check TS compilation correctness safely via:
  ```bash
  npx tsc --noEmit
  ```
* **Linting:** Next.js 16 CLI does not support `next lint` directly (it tries to parse the keyword as a directory path). Verify errors visually or via TypeScript compiler outputs.
