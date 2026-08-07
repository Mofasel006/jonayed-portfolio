# Setup, Development & Deployment Guide

This document explains how to run the portfolio locally, how the project is organized, how to manage assets, and how to deploy it to Vercel, Netlify, or any static host.

## Quick Start (Local Development)

**Prerequisites:** [Node.js](https://nodejs.org/) 20+ and [pnpm](https://pnpm.io/) (npm also works: replace `pnpm` with `npm`).

```bash
# 1. Install dependencies
pnpm install

# 2. Start the development server (hot reload enabled)
pnpm dev

# 3. Open http://localhost:3000 in your browser
```

### Other Commands

| Command | Purpose |
|---|---|
| `pnpm dev` | Start Vite dev server with HMR on port 3000 |
| `pnpm build` | Production build (optimized bundles, minified) |
| `pnpm check` | TypeScript type-check across the whole project |
| `pnpm format` | Format code with Prettier |
| `pnpm preview` | Serve the production build locally for testing |

## Project Architecture

```
client/src/
├── components/
│   ├── three/StructureScene.tsx   ← Hero 3D suspension bridge (R3F)
│   ├── sections/                  ← Hero, About, Experience, Projects,
│   │                              ←   Skills, Awards, Contact
│   ├── MagneticButton.tsx         ← Magnetic hover buttons
│   ├── Reveal.tsx                 ← LetterStagger / MaskReveal / Reveal
│   ├── SmoothScroll.tsx           ← Lenis provider (framer-motion Lenis)
│   ├── Nav.tsx / Footer.tsx       ← Site chrome
│   └── Interstitial.tsx           ← Cinematic measurement strips
├── hooks/useElementSize.ts        ← ResizeObserver-based canvas sizing
├── lib/data.ts                    ← All content (profile, projects, skills)
├── pages/Home.tsx                 ← Section composition
├── App.tsx                        ← Routes + dark theme + Lenis wiring
└── index.css                      ← Blueprint Atelier design tokens
```

**Key technical decisions**

- **React Three Fiber** renders the hero bridge, the About morphing wireframe, and the Skills 3D tag cloud. Each canvas is wrapped in a `MeasuredCanvas` component that uses `ResizeObserver` (with an rAF safety net) to guarantee the WebGL buffer always matches the container size — a common failure point when combining R3F with smooth-scroll libraries.
- **Lenis** (via framer-motion) provides buttery inertial scrolling, and every section uses Framer Motion `whileInView` scroll-triggered animations (letter stagger, mask reveals, stagger grids).
- The horizontal projects gallery uses `useScroll` + `useTransform` to map vertical scroll into horizontal translation (progress 0 → 100 %), with per-card depth-parallax image springs.
- Performance: dpr capped at 1.5, fog culling, memoized geometry via `useMemo`, only `transform`/`opacity` animations, and `prefers-reduced-motion` is respected by the CSS transitions layer.

## Managing Assets

Large media (images, logos) are served from hosted storage, not stored in the repository.

- Original files live in `/home/ubuntu/webdev-static-assets/` (outside the repo).
- Upload any new asset with: `manus-upload-file --webdev <file>`
- Reference it with the returned path exactly, e.g. `<img src="/manus-storage/brand-logo_b1645213.png" />`
- Content (text, projects, skills, awards) is centralized in `client/src/lib/data.ts` — edit it there rather than digging through components.
- To swap a project photo, replace the `image` URL in the corresponding entry of the `PROJECTS` array.

## Deployment

### Option A — Built-in hosting (recommended)

The project ships with managed hosting: create a checkpoint, then click **Publish** in the top-right of the Management UI. Custom domains, analytics, and HTTPS are handled automatically.

### Option B — Vercel

```bash
pnpm install
pnpm build
```

1. Create a project at [vercel.com/new](https://vercel.com/new).
2. Connect your Git repository (or upload the built `dist/public` folder as a static site).
3. If importing the repo directly, set:
   - Build Command: `pnpm build`
   - Output Directory: `dist/public`
   - Install Command: `pnpm install`
4. Click Deploy. Vercel will pick up the configuration automatically on push.

### Option C — Netlify

```bash
pnpm build
```

1. Run the build command above — the static site is in `dist/public`.
2. Drag-and-drop the `dist/public` folder at [app.netlify.com/drop](https://app.netlify.com/drop), or connect your Git repo with:
   - Build Command: `pnpm build`
   - Publish Directory: `dist/public`
3. Deploy.

### Any Static Host (GitHub Pages, Cloudflare Pages, S3)

Upload the contents of `dist/public` as the web root. The site is a pure single-page application — no server required. If you get 404s on client-side routes, configure a 404 → `index.html` rewrite (GitHub Pages: add a `404.html` copy of `index.html`).

## Troubleshooting

- **Blank / black 3D scene:** ensure your browser supports WebGL; check that the container element is visible when the canvas mounts (the canvas sizes itself to its parent via ResizeObserver).
- **Slow scroll feel on some pages:** Lenis can be disabled by editing `client/src/components/SmoothScroll.tsx` if you prefer native scrolling.
- **Type errors after dependency updates:** run `pnpm check` — React 19 + TS 5 is required.
