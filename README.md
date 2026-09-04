# AI Juicing

Built with [Growth Engine](https://github.com/recursive-solutions-ai).

## Baseline

Scaffolded from `recursive-solutions-ai/growth-engine-create-client-app` v0.1.83
(commit `4fe2a7e63b87a0030fb453069bcbf3c4ae7d7773`).
Project slug: `ai-juicing-landing`. The original template functionality is retained.

`.env.local` is already created with empty credentials and is ignored by Git.
The site can run locally without credentials; live blog content, forms, and CRM
require the Brain and Turso settings below.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Local verification

- Production build and TypeScript check passed.
- All 111 template unit tests passed.
- Homepage verified in a browser at `http://localhost:3101` with credentials unset.
- Known baseline tooling issue: `npm run lint` uses `next lint`, which is unavailable
  in the pinned Next.js 16 release. The pre-commit lint-staged command also references
  ESLint without a declared ESLint dependency/configuration.
- For a local production preview, use `npm run start -- --hostname localhost --port 3101`.
  Binding explicitly to `127.0.0.1` caused a locale rewrite redirect loop in this setup.

## Environment Variables

Set these in `.env.local` (never commit this file):

```
BRAIN_API_URL=http://localhost:3000
BRAIN_API_KEY=brain_live_...
TURSO_DATABASE_URL=libsql://...
TURSO_AUTH_TOKEN=eyJ...
```

| Variable | Purpose |
|----------|---------|
| `BRAIN_API_URL` | URL of the Brain instance (`http://localhost:3000` for dev, production URL for prod) |
| `BRAIN_API_KEY` | API key for authenticating with the Brain |
| `TURSO_DATABASE_URL` | Your Turso SQLite database URL |
| `TURSO_AUTH_TOKEN` | Auth token for your Turso database |

All four are server-only — do **not** prefix with `NEXT_PUBLIC_`.

| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | _(optional)_ Google Analytics 4 Measurement ID (e.g. `G-XXXXXXXXXX`). No tracking if omitted |

## Project Structure

| Path | Purpose |
|------|---------|
| `src/app/api/rs/[...route]/route.ts` | SDK route handler — connects to Brain and Turso |
| `src/app/layout.tsx` | Root layout with `GrowthEngineProvider` |
| `src/app/page.tsx` | Landing page with latest blog posts |
| `src/app/blog/` | Blog listing and detail pages |
| `src/app/[locale]/contact/page.tsx` | Contact page using the pre-seeded `contact-form` |
| `src/app/[locale]/forms/[slug]/page.tsx` | Dynamic form page — renders any form by slug |
| `src/components/` | Reusable UI components |
| `next.config.ts` | Next.js config with `serverExternalPackages` |

## Forms

Every new tenant gets a **default "Contact Us" form** (slug: `contact-form`) seeded during onboarding. The template includes two pages that work out of the box:

- **`/contact`** — Dedicated contact page with business info sidebar
- **`/forms/[slug]`** — Dynamic page that renders any form by its slug

You can create additional forms in the Brain portal. To use SDK hooks in custom components:

```tsx
import { useForm, submitForm } from '@growth-engine/sdk-client'

const { form, schema, loading } = useForm('contact-form')
const result = await submitForm('contact-form', formData)
```

### Generated types (optional)

For compile-time TypeScript safety, pull form schemas locally:

```bash
pnpm pull-forms
```

This generates `src/generated/forms.ts` with Zod schemas, TypeScript types, and slug constants. Commit this file so other developers get the types immediately.

```bash
# Custom output path
npx growth-engine-pull-forms --output src/types/forms.ts
```

See [FORMS.md](../FORMS.md) for the full forms guide including email notifications, confirmation emails, and CRM integration.

## SDK Reference

| Hook / Function | What it does |
|---|---|
| `useContent('blog')` | Fetches blog posts from your Turso DB |
| `useBusinessConfig()` | Fetches business config from your Turso DB |
| `useForms()` | Fetches all active forms |
| `useForm(slug)` | Fetches a form definition with Zod schema |
| `submitForm(slug, data)` | Validates and submits form data |
| `triggerBlogGen({ topic })` | Triggers AI blog generation via the Brain |
| `triggerSocialSync()` | Triggers social media sync via the Brain |
| `useJobStatus(jobId)` | Polls job progress |
| `useSDKStatus()` | Checks SDK version compatibility |

## Animations (GSAP)

GSAP is pre-installed with scroll-triggered reveal animations on the landing page (Hero, Features, CTA). Two hooks are available in `src/hooks/useGsap.ts`:

### `useScrollReveal(options?)` — one-liner scroll animations

```tsx
import { useScrollReveal } from '@/hooks/useGsap'

// Fade + slide up on scroll
const ref = useScrollReveal<HTMLDivElement>()
<div ref={ref}>I animate in on scroll</div>

// Stagger children (e.g. a grid of cards)
const gridRef = useScrollReveal<HTMLDivElement>({ y: 40, stagger: 0.15 })
<div ref={gridRef}>
  <div>Card 1</div>  {/* each child staggers in */}
  <div>Card 2</div>
  <div>Card 3</div>
</div>
```

Options: `y`, `x`, `opacity`, `duration`, `delay`, `stagger`, `start`, `ease`

### `useGsap(callback, scope, deps)` — full GSAP control

```tsx
import { useRef } from 'react'
import { useGsap, gsap } from '@/hooks/useGsap'

const container = useRef<HTMLDivElement>(null)
useGsap(() => {
  gsap.from('.card', { opacity: 0, y: 40, stagger: 0.1, duration: 0.6 })
  gsap.to('.hero-bg', { scale: 1.05, scrollTrigger: { trigger: '.hero-bg', scrub: true } })
}, container, [])

<div ref={container}>...</div>
```

Cleanup is automatic — GSAP context reverts when the component unmounts.

## Google Analytics

Analytics is built in but only activates when you set a GA4 Measurement ID.

### Enable tracking

Add your Measurement ID to `.env.local`:

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

If this variable is not set, no analytics scripts are loaded — zero overhead.

### Built-in events

These events are tracked automatically:

| Event | Trigger | Description |
|-------|---------|-------------|
| `cta_click` | User clicks the CTA button | Measures call-to-action engagement |
| `contact_view` | User visits the contact page | Measures contact page interest |
| `contact_form_submit` | User submits the contact form | Measures contact form conversions |

### Custom event tracking

Use the `trackEvent` helper to track additional events in your components:

```tsx
import { trackEvent } from '@/components/analytics/GoogleAnalytics'

// Track a form submission
async function handleSubmit(data: FormData) {
  const result = await submitForm('contact', data)
  if (result.ok) {
    trackEvent('form_submit', { form_slug: 'contact' })
  }
}

// Track any custom event
trackEvent('newsletter_signup', { source: 'footer' })
```

`trackEvent` is safe to call even when GA is not configured — it does nothing if the GA script hasn't loaded.

### Viewing events in Google Analytics

1. Go to [Google Analytics](https://analytics.google.com)
2. Navigate to **Reports > Engagement > Events**
3. Your custom events (`cta_click`, `contact_view`, `form_submit`, etc.) will appear alongside standard GA4 events

## Deploying to Vercel

1. Push this repo to GitHub
2. Import in Vercel
3. Add the four environment variables in project settings (use your production Brain URL for `BRAIN_API_URL`)
4. Deploy

## Updating the SDK

```bash
npm install github:recursive-solutions-ai/growth-engine-sdk-client#sdk-vLATEST
npm install github:recursive-solutions-ai/growth-engine-sdk-server#sdk-vLATEST
```

Check `useSDKStatus()` or the Brain admin portal for the latest version.

## Creating a New Client Site

To scaffold another site like this one:

```bash
npx --package=github:recursive-solutions-ai/growth-engine-create-client-app -- create-client-app
```

## Creator hub

The homepage now introduces AI Juicing as a personal AI channel and project hub.
Edit `src/lib/creator.ts` to update the channel URL, add a GitHub profile, and
publish project cards (name, description, category, URL, optional source URL).
The project shelf uses an explicit empty state until real projects are supplied.
Existing blog queries, contact/forms routes, legal pages, locale URL handling,
and the Light/Dark/Auto theme selector remain available. New creator copy is English.

Hero artwork: `public/images/ai-juicing-hero.png`, created with the built-in imagegen tool.
Prompt: square premium 3D still life for AI Juicing, a translucent lime half floating
above a chrome citrus press, a few glass cubes and lime droplets, charcoal background,
soft studio light, lime/silver/charcoal palette, no text, logos, UI, or borders.

### Interactive 3D objects

The homepage contains actual Three.js mesh models: the robot mascot, a camera
for the channel, and a neural-network chip for the project workbench. These are
procedural geometry with modeled depth, sides, and backs; the robot is a stylized
interpretation of the supplied branding, not an exact reconstruction.

- All 3D objects are shown without labels or toolbars. Drag to rotate; right-drag to move. Keyboard users can focus any canvas, use left/right arrows, and press Home to reset.
- Edit geometry and materials in `src/components/three/models.ts`.
- `viewer-runtime.ts` owns rendering, lights, OrbitControls, scrolling, and disposal.
- The homepage mascot opts into `reactive` motion: bounded mouse-following turns, scroll tilt and lift, and gentle idle floating. Dragging temporarily takes priority; ambient motion resumes after release. Pause and reduced-motion preferences disable these reactions.
- `ObjectViewer.tsx` lazy-loads each scene as it approaches the viewport.
- Offscreen or hidden-tab scenes stop rendering. Pixel ratio is capped.
- Pause motion and OS reduced-motion preferences stop automatic motion; direct
  manipulation remains available. Wheel scrolling stays with the webpage.
- The raster mascot is only a loading/unsupported-WebGL fallback.
- The existing wordmark, section copy, routes, and destination links are retained.

Verification: production build and TypeScript passed; 114 tests passed, including
three tests that validate real model depth and self-contained binary GLB exports.
Browser checks covered geometry rendering, side/back rotation, drag interaction,
spin/reset, zoom, and responsive layout.

Controls reference: https://threejs.org/docs/#OrbitControls

### Project catalog

The homepage features four projects; `/projects` lists all twelve with search and category filters. Each entry has a `/projects/[slug]` page with an overview, links, and available media. The project routes are included in the sitemap and use the existing locale and metadata helpers.

Edit `src/lib/projects.ts` to add or update a project. Images live in `public/images/projects/`. Sources and availability notes are in `docs/project-sources.md`. Public content is captured at editing time, with no live scraper or API credentials needed to serve these pages. Tamias OS currently has a transparent placeholder because its supplied repository returns a public 404.

### Channel learning page

`/channel` contains the two public educational playlists, two additional how-to videos, lesson summaries, and practice prompts. One embedded player supports lesson selection and manual Previous/Next navigation. The header, footer, and homepage link into the page. Edit `src/lib/channel.ts` to update the collection; provenance and embedding details are in `docs/channel-sources.md`. The camera object now appears on this page.
