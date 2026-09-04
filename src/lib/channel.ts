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
