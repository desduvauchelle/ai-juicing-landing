import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { localizedPath } from '@/lib/i18n-utils'
import { creator } from '@/lib/creator'
import { CosmicScene } from '@/components/landing/CosmicScene'
import { TypedText } from '@/components/landing/TypedText'
import { ObjectViewer } from '@/components/three/ObjectViewer'
import { LessonLibrary } from '@/components/channel/LessonLibrary'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata({ path: '/channel', locale, title: 'The channel | Learn AI by doing', description: 'Watch AI Juicing lessons right here. Understand how AI works, explore local models and RAG, and learn to write useful prompts with the AI Basics lessons.', image: '/images/channel/iHaS6riS244.webp' })
}
export default async function ChannelPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return <CosmicScene><div className="hub-width channel-page">
    <header className="channel-page-hero"><div><p className="eyebrow">AI Juicing / The channel</p><h1>Less watching the future.<br /><em>More making stuff with it.</em></h1><p>Come along for the experiments, the useful discoveries, and the bits that don’t quite go to plan. Start with the basics, then put them to work.</p><div className="hero-actions"><a className="btn hub-button" href="#lessons">Start learning <span aria-hidden="true">↓</span></a><a className="text-link" href={creator.channelUrl} target="_blank" rel="noopener noreferrer">Visit YouTube ↗</a></div></div><ObjectViewer kind="camera" compact /></header>
    <LessonLibrary />
    <section className="channel-primer"><div className="section-heading"><p className="eyebrow">Before the next rabbit hole</p><h2 data-type-reveal><TypedText text="Three ideas to take with you." /></h2></div><div className="primer-grid">
      <article><span>Models</span><h3>Patterns, not magic.</h3><p>A model learns patterns from examples and uses them to produce an output. A convincing answer still needs checking.</p><a href="https://www.youtube.com/watch?v=iHaS6riS244" target="_blank" rel="noopener noreferrer">Explore the explanation ↗</a></article>
      <article><span>Prompts</span><h3>Give it a useful brief.</h3><p>Say what you need, share the context, and describe the result you want. Review the first attempt and refine your instructions.</p><a href="https://www.youtube.com/watch?v=NKLncaV6esk" target="_blank" rel="noopener noreferrer">Explore prompt writing ↗</a></article>
      <article><span>RAG</span><h3>Bring the source along.</h3><p>Retrieval-augmented generation finds relevant material and gives it to the model as context. It helps ground an answer; it doesn’t guarantee accuracy.</p><a href="https://www.youtube.com/watch?v=SGdpHtES6EU" target="_blank" rel="noopener noreferrer">Explore RAG ↗</a></article>
    </div></section>
    <section className="channel-project-bridge"><div><p className="eyebrow">From watching to making</p><h2>Curious what happens next?</h2><p>Take a look at the tools and experiments growing out of all this tinkering.</p></div><Link className="btn hub-button" href={localizedPath('/projects', locale)}>Explore the projects ↗</Link></section>
  </div></CosmicScene>
}
