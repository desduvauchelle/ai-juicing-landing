export interface ChannelLesson {
  id: string
  title: string
  topic: string
  seconds: number
  summary: string
  tryIt: string
}
export interface ChannelSeries {
  slug: string
  name: string
  label: string
  description: string
  playlistId?: string
  lessons: ChannelLesson[]
}
// Public YouTube playlist order, titles, and video metadata reviewed 2026-09-03.
// Summaries and optional practice prompts are editorial additions, not transcripts.
export const channelSeries: ChannelSeries[] = [
  {
    slug: 'ai-basics', name: 'AI Basics', label: 'Start here',
    description: 'Get comfortable with the ideas behind AI, try running it locally, and learn how to give it useful context and instructions.',
    playlistId: 'PLzzixGKRRklWVEN20-z3-hYEyGc6w9jf2',
    lessons: [
      { id: 'iHaS6riS244', title: 'Understand how AI works using a simple dot.', topic: 'How AI works', seconds: 260,
        summary: 'An approachable introduction to models, patterns, and next-word prediction, using points on a graph instead of heavy maths.',
        tryIt: 'Explain what an AI model does in one sentence. Include why a confident answer can still be wrong.' },
      { id: '8QPkHVkSpN8', title: 'Host AI Locally: Ultimate Guide with unexpected benefits', topic: 'AI on your computer', seconds: 186,
        summary: 'A walkthrough of running AI on your own computer with Jan, and the privacy and cost reasons to explore local models.',
        tryIt: 'Pick one task you would prefer to keep on your computer. Think about what data that task uses.' },
      { id: 'SGdpHtES6EU', title: 'What is RAG in AI - Plain and simple.', topic: 'Give AI useful context', seconds: 156,
        summary: 'RAG adds a retrieval step: find relevant information, then give it to the model as context for an answer. This lesson explains the idea with examples.',
        tryIt: 'Choose a document you know well. What question would you ask, and which passage should support the answer?' },
      { id: 'NKLncaV6esk', title: 'Start simple, finish like a pro', topic: 'Write better prompts', seconds: 320,
        summary: 'Treat AI like an eager intern: begin with a clear request, review the result, and improve the instructions a little at a time.',
        tryIt: 'Write a simple request. Then improve it by adding an audience, useful context, and the format you want.' },
    ],
  },
  {
    slug: 'creator-prompts', name: 'AI Prompts - YouTube Gen AI', label: 'Make something',
    description: 'Turn the basics into a repeatable creator workflow: develop titles, write descriptions, and explore thumbnail ideas with AI.',
    playlistId: 'PLzzixGKRRklU-QzcrHcGR8b579JjP6PCJ',
    lessons: [
      { id: 'zYYg5Eaobw0', title: 'Prompt Tactics for Viral Youtube Title Hits', topic: 'YouTube titles', seconds: 934,
        summary: 'Build a prompt for generating YouTube title options, with your topic and audience guiding the creative direction.',
        tryIt: 'Generate five title options for one video. Choose the clearest promise you can actually deliver in the video.' },
      { id: 'rTbiNaZVfG0', title: 'AI-Powered YouTube Success: Quickly Craft Perfect Descriptions', topic: 'Video descriptions', seconds: 557,
        summary: 'Explore a prompt-based process for drafting video descriptions and reducing repetitive work in your publishing routine.',
        tryIt: 'Draft a description from your video outline. Check the facts, links, and wording before publishing.' },
      { id: 'RdBC7UBt580', title: 'AI Secrets for Effortless YouTube Thumbnails Revealed', topic: 'Thumbnail ideas', seconds: 514,
        summary: 'Use a reusable prompt to develop thumbnail concepts and give the design process a clearer starting point.',
        tryIt: 'Ask for three thumbnail concepts for the same video. Check whether each one communicates a single clear idea.' },
    ],
  },
  {
    slug: 'more-how-tos', name: 'More from the channel', label: 'Keep exploring',
    description: 'Two more videos to help you understand AI’s limits and get comfortable building with it. A selection from the channel, outside the playlists above.',
    lessons: [
      { id: 'un31wwPPv_8', title: "The Truth About AI: What It Can (and Can't) Do", topic: 'Capabilities & limits', seconds: 366,
        summary: 'Look at AI through three everyday uses: making sense of existing material, creating a first draft, and improving something you already have.',
        tryIt: 'Pick a task from your week. Is it about understanding, creating, or improving? Decide what you will check yourself.' },
      { id: 'YxjtH2aO0zg', title: 'STOP Vibe Coding until you understand Github concept', topic: 'GitHub for AI builders', seconds: 297,
        summary: 'Learn the ideas behind repositories, pull/edit/commit/push, merge conflicts, and worktrees before your next AI coding project.',
        tryIt: 'Find the commit history in one of the projects on this site. Look at how a single change is recorded.' },
    ],
  },
]
export function lessonDuration(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}
export function seriesMinutes(series: ChannelSeries) {
  return Math.ceil(series.lessons.reduce((sum, lesson) => sum + lesson.seconds, 0) / 60)
}
export function lessonEmbedUrl(id: string) {
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0&playsinline=1`
}
