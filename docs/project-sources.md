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
