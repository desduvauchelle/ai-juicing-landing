# AI Juicing project catalog

Reviewed September 3, 2026. The catalog is editorial content in `src/lib/projects.ts`; it does not scrape sites at runtime. All twelve user-supplied projects are included. Source links appear on the individual project pages.

| Project | Description source | Media used |
| --- | --- | --- |
| Echo Scribe | https://echo-scribe.ai-juicing.com/ | Three published screenshots under `/screenshots/recorded/` (chat-answer, recording-preview, coaching-feedback); YouTube demo RVOeyxoYHV0 linked by the site |
| Growthinator | https://www.growthinator.com/ (rendered public page) | Captured public landing page; site's YouTube introduction zTgK7mo3LnQ |
| LiveCase | https://www.livecase.com/ (public homepage, feature descriptions, and FAQ) | Captured public homepage, including its illustrated scenario preview; no authenticated learner or author data accessed |
| Recursive Solutions | https://www.recursive-solutions.com/en (current rendered page) | Captured public landing page |
| Tamias | https://github.com/desduvauchelle/tamias#readme | Repository mascot at `src/assets/mascot.png` |
| Tamias OS | https://github.com/desduvauchelle/tamias-os | No media or feature claims: public URL and unauthenticated GitHub API returned 404 |
| Infinite AI Layer | https://github.com/desduvauchelle/infinite-ai-layer#readme | Real model-selection snippet from README; no screenshot found in repository tree |
| Burrowise | https://burrowise-six.vercel.app/ (linked by repository metadata); landing page source and Features component | Captured landing page, clearly captioned as a website preview rather than an application screenshot |
| I’ll Be Back | Repository `src/app/[locale]/page.tsx` and `rules/page.tsx`; root README is generic scaffold documentation | Repository `public/og.png` and `public/ill-be-back-rules-poster.png` |
| GluePasteDev | https://github.com/desduvauchelle/glue-paste-dev#readme | `assets/image.jpg`, labeled as README illustration |
| Prompt Optimizer | https://github.com/desduvauchelle/prompt-optimizer#readme | Text diagram of documented loop; no screenshot found in repository tree |
| AI Juicebar | https://github.com/desduvauchelle/ai-juicing-juicebox#readme | Repository `logo.png`; use README product name, with repository alias explained |

Existing public images were copied locally for stable page loading; large PNG artwork was optimized to WebP. YouTube embeds load only after the visitor presses the load-video control, with an ordinary YouTube link as an alternative. No videos are downloaded or autoplayed. Repository artwork is identified as artwork, not a screenshot.

Tamias OS needs an accessible public description before adding feature claims. AI Juicebar's README mixes a broad feature list with unfinished tasks: the entry does not claim web/document search or automatic Ollama installation is delivered. Infinite AI Layer and GluePasteDev retain their documented alpha status. A public GitHub repository alone is not treated as proof of an open-source license, so catalog categories describe use rather than licensing.

## Project ordering

Newest first uses the public GitHub repository `created_at` timestamp, captured September 3, 2026 from https://api.github.com/users/desduvauchelle/repos?per_page=100&sort=created&direction=desc . Repository creation is a sorting proxy, not a product launch date. Dates are stored locally in `repositoryCreatedAt`, so viewing the directory does not call GitHub.

- echo-scribe: 2026-03-22T07:11:49Z — https://github.com/desduvauchelle/echo-scribe
- tamias: 2026-02-20T18:23:57Z — https://github.com/desduvauchelle/tamias
- infinite-ai-layer: 2026-08-30T05:24:14Z — https://github.com/desduvauchelle/infinite-ai-layer
- burrowise: 2026-08-01T18:31:14Z — https://github.com/desduvauchelle/burrowise
- ill-be-back: 2026-07-25T23:31:26Z — https://github.com/desduvauchelle/I-ll-be-back
- glue-paste-dev: 2026-03-17T17:28:45Z — https://github.com/desduvauchelle/glue-paste-dev
- prompt-optimizer: 2026-03-14T18:51:18Z — https://github.com/desduvauchelle/prompt-optimizer
- ai-juicebar: 2025-01-27T22:39:19Z — https://github.com/desduvauchelle/ai-juicing-juicebox

Growthinator, LiveCase, Recursive Solutions, and Tamias OS have no verified repository creation date in the supplied public sources. They follow dated entries, retaining their existing relative order.
