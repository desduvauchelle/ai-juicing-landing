export const projectCategories = ['Apps & tools', 'Developer tools', 'Experiments', 'Business'] as const
export type ProjectCategory = typeof projectCategories[number]
export interface ProjectImage {
  src: string
  alt: string
  caption: string
  fit?: 'contain' | 'cover'
}
export interface CreatorProject {
  slug: string
  repositoryCreatedAt?: string
  name: string
  category: ProjectCategory
  description: string
  about: string
  highlights: string[]
  tags: string[]
  accent: 'cyan' | 'pink' | 'yellow'
  website?: string
  sourceUrl?: string
  status?: string
  note?: string
  image?: ProjectImage
  gallery?: ProjectImage[]
  video?: { youtubeId: string; title: string }
  snippet?: { label: string; text: string }
  sources: { label: string; url: string }[]
}
const github = 'https://github.com/desduvauchelle/'
// Reviewed against the public sites and repositories on 2026-09-03.
// Local editorial data: no runtime scraping or external credentials required.
const projectCatalog: CreatorProject[] = [
  {
    repositoryCreatedAt: '2026-03-22T07:11:49Z',
    slug: 'echo-scribe', name: 'Echo Scribe', category: 'Apps & tools', accent: 'cyan',
    description: 'Speak your thoughts. Keep the context. Voice typing, meeting transcripts, and a searchable memory of your work, on your Mac.',
    about: 'Echo Scribe starts with a hotkey: speak and polished text lands wherever your cursor is. It also brings meeting transcripts, voice notes, and screen recordings into a local library you can search and ask questions about.',
    highlights: ['Dictate into the apps you already use, with optional AI formatting.', 'Record meetings or narrated screen walkthroughs when you choose.', 'Search your saved work and ask questions with links back to the sources.'],
    tags: ['macOS', 'Voice to text', 'Local AI'], website: 'https://echo-scribe.ai-juicing.com/', sourceUrl: github + 'echo-scribe',
    image: { src: '/images/projects/echo-scribe.png', alt: 'Echo Scribe answering a question about past meetings with cited sources', caption: 'Inside Echo Scribe: asking questions about saved work.', fit: 'contain' },
    gallery: [
      { src: '/images/projects/echo-recording.png', alt: 'Echo Scribe screen recording preview with editing and export controls', caption: 'Review and export a screen recording.' },
      { src: '/images/projects/echo-coaching.png', alt: 'Echo Scribe meeting coaching feedback showing covered and missed points', caption: 'Review meeting feedback against a call guide.' },
    ],
    video: { youtubeId: 'RVOeyxoYHV0', title: 'Echo Scribe demo' },
    sources: [{ label: 'Echo Scribe website', url: 'https://echo-scribe.ai-juicing.com/' }],
  },
  {
    slug: 'growthinator', name: 'Growthinator', category: 'Apps & tools', accent: 'pink',
    description: 'An AI audience for your next YouTube video. Explore ideas, write scripts, and get feedback before you hit record.',
    about: 'Growthinator puts channel context and audience personas into the content creation process. It helps shape ideas into scripts, gather simulated audience feedback, preview titles and thumbnails, and turn a video into content for other channels.',
    highlights: ['Build audience personas around your channel and creative style.', 'Develop scripts with feedback before filming.', 'Preview packaging and repurpose scripts into social posts and other formats.'],
    tags: ['YouTube', 'Writing', 'Creator tools'], website: 'https://www.growthinator.com/',
    image: { src: '/images/projects/growthinator.jpg', alt: 'Growthinator website introducing AI audience feedback for YouTube creators', caption: 'The Growthinator website.' },
    video: { youtubeId: 'zTgK7mo3LnQ', title: 'Growthinator introduction' },
    sources: [{ label: 'Growthinator website', url: 'https://www.growthinator.com/' }],
  },
  {
    slug: 'livecase', name: 'LiveCase', category: 'Apps & tools', accent: 'cyan',
    description: 'Learning that puts you in the story. Turn teaching materials into interactive simulations with AI characters, decisions, and feedback.',
    about: 'LiveCase helps educators and trainers turn PDFs, slide decks, and case studies into decision-based learning experiences. Learners meet characters, explore evidence, and make choices as a scenario unfolds. Authors can start with AI, choose a ready-made case, or work with the studio to build an experience.',
    highlights: ['Practice conversations with AI characters through text and voice.', 'Build branching scenarios with questions, media, and personalized feedback.', 'Share sessions through a link, QR code, or LMS, then use learner decisions and progress to guide the debrief.'],
    tags: ['Education', 'AI role-play', 'Simulations'], website: 'https://www.livecase.com/',
    image: { src: '/images/projects/livecase.webp', alt: 'LiveCase homepage showing teaching documents becoming an interactive AI scenario', caption: 'The LiveCase website: from teaching materials to an interactive learning experience.' },
    sources: [{ label: 'LiveCase website', url: 'https://www.livecase.com/' }],
  },
  {
    slug: 'recursive-solutions', name: 'Recursive Solutions', category: 'Business', accent: 'yellow',
    description: 'Practical AI for real businesses. Connected growth systems, custom tools, and automation built around how a team actually works.',
    about: 'Recursive Solutions combines AI consulting with hands-on implementation. Its Lucy platform brings websites, content, SEO, lead capture, CRM, and analytics together, alongside bespoke agents and automations for the repetitive work between systems.',
    highlights: ['Connect the website, content, leads, and CRM through Lucy.', 'Build custom tools and automations around existing workflows.', 'Map the problem, build the system, and keep refining it after launch.'],
    tags: ['Automation', 'AI consulting', 'Growth'], website: 'https://www.recursive-solutions.com/',
    image: { src: '/images/projects/recursive-solutions.jpg', alt: 'Recursive Solutions website with growth systems overview and time savings calculator', caption: 'The Recursive Solutions website.' },
    sources: [{ label: 'Recursive Solutions website', url: 'https://www.recursive-solutions.com/' }],
  },
  {
    repositoryCreatedAt: '2026-02-20T18:23:57Z',
    slug: 'tamias', name: 'Tamias', category: 'Developer tools', accent: 'yellow',
    description: 'An AI sidekick in your terminal. Bring your models, connect tools, and move from a conversation to getting things done.',
    about: 'Tamias is an agentic chat interface powered by Bun and the Vercel AI SDK. A background daemon manages conversations and tool connections, while a terminal interface and web dashboard let you work with multiple AI providers.',
    highlights: ['Configure multiple providers and choose a model for your chat.', 'Connect MCP servers and built-in filesystem or terminal tools.', 'Manage recurring jobs, conversations, and configuration from the CLI or dashboard.'],
    tags: ['Terminal', 'AI agents', 'MCP'], sourceUrl: github + 'tamias',
    image: { src: '/images/projects/tamias.webp', alt: 'The Tamias chipmunk mascot from the project repository', caption: 'The Tamias mascot, from the repository.', fit: 'contain' },
    sources: [{ label: 'Tamias README', url: github + 'tamias#readme' }],
  },
  {
    slug: 'tamias-os', name: 'Tamias OS', category: 'Experiments', accent: 'cyan',
    description: 'Another project from the workbench. A public overview is on the way.',
    about: 'Tamias OS belongs on this project shelf, but its public story is not available yet. Check back for a walkthrough and a closer look at what it does.',
    highlights: [], tags: ['On the workbench'], status: 'Preview coming soon', sourceUrl: github + 'tamias-os',
    note: 'The supplied repository is not publicly accessible at the moment.',
    sources: [{ label: 'Supplied repository link', url: github + 'tamias-os' }],
  },
  {
    repositoryCreatedAt: '2026-08-30T05:24:14Z',
    slug: 'infinite-ai-layer', name: 'Infinite AI Layer', category: 'Developer tools', accent: 'cyan',
    description: 'One interface for many kinds of AI. A Rust and TypeScript SDK connecting local models, cloud providers, and terminal agents.',
    about: 'Infinite AI Layer gives applications a consistent API for explicitly chosen AI connections. Matching Rust and TypeScript contracts cover text, streaming, structured output, embeddings, transcription, and supported terminal agents. The host app keeps control of state and tool execution.',
    highlights: ['Connect local runtimes, cloud APIs, Codex CLI, and Claude Code CLI.', 'Choose the connection and model explicitly for each request.', 'Handle normalized responses, errors, usage, and data boundaries across providers.'],
    tags: ['Rust', 'TypeScript', 'AI SDK'], sourceUrl: github + 'infinite-ai-layer', status: 'Alpha',
    note: 'The API is still evolving. Packages are currently installed from a checkout, rather than npm or crates.io.',
    snippet: { label: 'From the TypeScript quick start', text: 'const selectedModel = {\n  connectionId: "local",\n  modelId: "qwen3:8b",\n};' },
    sources: [{ label: 'Infinite AI Layer README', url: github + 'infinite-ai-layer#readme' }],
  },
  {
    repositoryCreatedAt: '2026-08-01T18:31:14Z',
    slug: 'burrowise', name: 'Burrowise', category: 'Apps & tools', accent: 'yellow',
    description: 'A memory for deeper work. Capture spoken thinking and turn it into searchable knowledge that points back to its sources.',
    about: 'Burrowise is a local-first knowledge project for founders and teams. Its workflow connects voice capture, original audio and transcripts, reviewed notes, and cited search or chat, so useful context can carry across interviews and decisions.',
    highlights: ['Capture spoken insights while preserving original audio and source text.', 'Organize sessions with summaries, tags, and notes to review.', 'Search or chat across the knowledge base with source references.'],
    tags: ['Knowledge', 'Voice capture', 'Local-first'], sourceUrl: github + 'burrowise', website: 'https://burrowise-six.vercel.app/',
    image: { src: '/images/projects/burrowise.jpg', alt: 'Burrowise landing page describing voice capture and a searchable memory system', caption: 'The public Burrowise landing page, including its illustrated product preview.' },
    sources: [{ label: 'Burrowise website', url: 'https://burrowise-six.vercel.app/' }, { label: 'Burrowise repository', url: github + 'burrowise' }],
  },
  {
    repositoryCreatedAt: '2026-07-25T23:31:26Z',
    slug: 'ill-be-back', name: 'I’ll Be Back', category: 'Experiments', accent: 'pink',
    description: 'A card game with a poker face. Beat the rank, build the count, and bluff your way to an empty hand.',
    about: 'I’ll Be Back is a shedding card game for two to six players, with a browser game against the machine and a printable rules poster. A draw does not prove you were stuck: it can set up an immediate comeback from any legal cards in your hand.',
    highlights: ['Beat the active rank while matching the number of cards in play.', 'Add matching ranks to increase the count and change the next move.', 'Play the browser game or take the rules to a real card table.'],
    tags: ['Card game', 'Bluffing', 'Print & play'], website: 'https://ill-be-back-card-game.denis755177.chatgpt.site/', sourceUrl: github + 'I-ll-be-back',
    image: { src: '/images/projects/ill-be-back.webp', alt: 'I’ll Be Back card game artwork with a robot hand holding playing cards', caption: 'Original card game artwork from the repository.' },
    gallery: [{ src: '/images/projects/ill-be-back-rules.webp', alt: 'I’ll Be Back printable rules poster', caption: 'The rules poster. Open the image for a closer look.' }],
    sources: [{ label: 'Game homepage source', url: github + 'I-ll-be-back/blob/main/src/app/%5Blocale%5D/page.tsx' }, { label: 'Game rules source', url: github + 'I-ll-be-back/blob/main/src/app/%5Blocale%5D/rules/page.tsx' }],
  },
  {
    repositoryCreatedAt: '2026-03-17T17:28:45Z',
    slug: 'glue-paste-dev', name: 'GluePasteDev', category: 'Developer tools', accent: 'yellow',
    description: 'Turn a board full of coding tasks into AI coding sessions. Write a card, press play, and follow the work as it happens.',
    about: 'GluePasteDev connects a Kanban board to Claude Code. Cards run through planning and execution in sequence, with progress updates and comments that carry your feedback into the next attempt.',
    highlights: ['Organize tasks by project, with tags and per-project settings.', 'Run a single card or work through the board sequentially.', 'Follow progress and leave feedback on the card for another attempt.'],
    tags: ['Kanban', 'Claude Code', 'macOS'], sourceUrl: github + 'glue-paste-dev', status: 'Alpha',
    image: { src: '/images/projects/glue-paste-dev.jpg', alt: 'GluePasteDev repository illustration of a character organizing a coding backlog', caption: 'The original GluePasteDev README illustration.' },
    note: 'The README describes an alpha. Drag-and-drop reordering and an embedded terminal are listed as next steps.',
    sources: [{ label: 'GluePasteDev README', url: github + 'glue-paste-dev#readme' }],
  },
  {
    repositoryCreatedAt: '2026-03-14T18:51:18Z',
    slug: 'prompt-optimizer', name: 'Prompt Optimizer', category: 'Developer tools', accent: 'pink',
    description: 'Give your prompts a feedback loop. Generate, evaluate, rewrite, and compare the results across iterations.',
    about: 'Prompt Optimizer is a web app for refining AI prompts against an objective. You supply test cases and evaluation criteria, choose generation and evaluation models through OpenRouter, then follow how the prompt and its scores change over successive rounds.',
    highlights: ['Define test inputs and questions for an AI evaluator.', 'Run repeated generation, evaluation, and rewriting cycles.', 'Compare outputs and track prompt history against your criteria.'],
    tags: ['Prompts', 'Evaluation', 'OpenRouter'], sourceUrl: github + 'prompt-optimizer',
    snippet: { label: 'The optimization loop', text: 'Generate\n    ↓\nEvaluate\n    ↓\nRewrite → Repeat' },
    sources: [{ label: 'Prompt Optimizer README', url: github + 'prompt-optimizer#readme' }],
  },
  {
    repositoryCreatedAt: '2025-01-27T22:39:19Z',
    slug: 'ai-juicebar', name: 'AI Juicebar', category: 'Experiments', accent: 'cyan',
    description: 'Beyond the chat box. A playground for local AI, co-writing, and connected prompt sequences.',
    about: 'AI Juicebar, hosted in the ai-juicing-juicebox repository, explores a collection of AI tools in an Electron app. It connects to Ollama and keeps chat history in local app storage, with a canvas for experimenting beyond a single chat conversation.',
    highlights: ['Connect to a local or remote Ollama server.', 'Experiment with chat, co-authoring, and prompt sequences.', 'Explore and extend the canvas-based interface.'],
    tags: ['Local AI', 'Ollama', 'Electron'], sourceUrl: github + 'ai-juicing-juicebox', status: 'Early experiment',
    image: { src: '/images/projects/juicebar.webp', alt: 'AI Juicebar logo from the ai-juicing-juicebox repository', caption: 'The AI Juicebar logo from the repository.', fit: 'contain' },
    note: 'An early experiment. The README still lists document search, web search, and automatic Ollama installation as work to do.',
    sources: [{ label: 'AI Juicebar README', url: github + 'ai-juicing-juicebox#readme' }],
  },
]
/** Repository age is a consistent proxy, not a claimed product launch date. */
export function sortProjectsByNewest(items: CreatorProject[]) {
  const timestamp = (project: CreatorProject) => {
    const value = Date.parse(project.repositoryCreatedAt || '')
    return Number.isFinite(value) ? value : Number.NEGATIVE_INFINITY
  }
  return [...items].sort((a, b) => {
    const left = timestamp(a), right = timestamp(b)
    return left === right ? 0 : left > right ? -1 : 1
  })
}
// Editorial priorities take precedence over repository age.
const featuredSlugs = ['echo-scribe', 'recursive-solutions', 'tamias-os', 'infinite-ai-layer']
export const projects = sortProjectsByNewest(projectCatalog).sort((a, b) => {
  const priority = (slug: string) => {
    const index = featuredSlugs.indexOf(slug)
    return index === -1 ? featuredSlugs.length : index
  }
  return priority(a.slug) - priority(b.slug)
})

export function getProject(slug: string) {
  return projects.find(project => project.slug === slug)
}
export function filterProjects(items: CreatorProject[], query: string, category: string) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  return items.filter(project => {
    const text = [project.name, project.description, project.category, ...project.tags].join(' ').toLowerCase()
    return (category === 'All projects' || project.category === category) && words.every(word => text.includes(word))
  })
}
