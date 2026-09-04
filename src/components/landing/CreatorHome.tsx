import { TypedText } from './TypedText'
import { ChannelPreview } from './ChannelPreview'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { ObjectViewer } from '@/components/three/ObjectViewer'
import { CosmicScene } from './CosmicScene'
import Link from 'next/link'
import Image from 'next/image'
import { creator } from '@/lib/creator'
import { localizedPath } from '@/lib/i18n-utils'

export function CreatorHome({ locale, children }: { locale: string; children: React.ReactNode }) {
  return (
    <CosmicScene><div className="creator-home">
      <section className="creator-hero hub-width">
        <div className="hero-copy">
          <p className="eyebrow">A little curiosity. A lot of possibility.</p>
          <h1>Let’s squeeze<br />more out of <span>AI.</span></h1>
          <p className="hero-intro">I’m tinkering, building, and sharing what happens.<br className="desktop-break" /> Welcome to my corner of the AI internet.</p>
          <div className="hero-actions">
            <a href="#projects" className="btn hub-button">Explore the projects <span aria-hidden="true">↗</span></a>
            <Link href={localizedPath('/channel', locale)} className="text-link">Meet the channel <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <ObjectViewer kind="robot" reactive />
      </section>

      <div className="hub-width intro-line"><span>Ideas worth trying.</span><span>Things worth making.</span><span>Everything worth sharing.</span></div>

      <section id="channel" className="hub-width channel-home-teaser">
        <div className="section-heading"><p className="eyebrow">Curiosity, on camera.</p><h2 data-type-reveal><TypedText text="Less watching the future." /><br /><TypedText text="More making stuff with it." /></h2><p>AI basics, practical how-tos, and creator workflows. Pick a playlist and follow along, right here.</p><Link className="btn hub-button" href={localizedPath('/channel', locale)}>Watch & learn <span aria-hidden="true">↗</span></Link></div>
        <ChannelPreview />
      </section>

      <section id="projects" className="hub-width projects-section">
        <div className="section-heading"><p className="eyebrow">The workbench</p><h2 data-type-reveal><TypedText text="Built for the fun of finding out." /></h2><p>A home for my tools, side projects, and open source experiments. Pick something up and make it your own.</p></div>
        <div className="project-shelf home-project-shelf">{creator.projects.filter(project => ['echo-scribe', 'recursive-solutions', 'tamias-os', 'infinite-ai-layer', 'growthinator', 'glue-paste-dev', 'ill-be-back'].includes(project.slug)).map(project => <ProjectCard key={project.slug} project={project} locale={locale} />)}</div>
        <div className="project-shelf-actions"><Link className="btn hub-button" href={localizedPath('/projects', locale)}>Explore all {creator.projects.length} projects <span aria-hidden="true">↗</span></Link><a className="text-link" href={creator.githubUrl} target="_blank" rel="noopener noreferrer">Find me on GitHub ↗</a></div>
      </section>

      <section id="about" className="hub-width creator-about" aria-labelledby="about-heading">
        <div className="creator-about-image">
          <Image src="/images/channel/un31wwPPv_8.webp" alt="Denis on the AI Juicing channel, exploring AI hype versus reality" width={960} height={540} sizes="(max-width: 767px) 100vw, 480px" />
        </div>
        <div className="creator-about-copy">
          <p className="eyebrow">Who am I?</p>
          <h2 id="about-heading">Hi, I’m Denis.</h2>
          <p className="creator-about-intro">I like making things, figuring out how they work, and sharing what I learn.</p>
          <p>AI Juicing is my home for that curiosity. I build tools like Echo Scribe, explore ideas through Recursive Solutions, and make videos that help AI feel a little less mysterious.</p>
          <p>Some experiments become useful tools. Some become lessons. You’ll find both here, along with the code and the things I’m still figuring out.</p>
          <div className="creator-about-links"><Link className="text-link" href={localizedPath('/channel', locale)}>Watch the channel ↗</Link><a className="text-link" href={creator.githubUrl} target="_blank" rel="noopener noreferrer">Explore my code ↗</a></div>
        </div>
      </section>

      <section className="hub-width notes-section"><div className="section-heading"><h2 data-type-reveal><TypedText text="Notes from the rabbit hole." /></h2><p>The useful bits, written down.</p></div>{children}<Link className="text-link" href={localizedPath('/blog', locale)}>Browse all notes <span aria-hidden="true">↗</span></Link></section>
      <section className="hub-width closing-section"><p>Got a good “what if”?</p><h2 data-type-reveal><TypedText text="Let’s make" /><br /><TypedText text="something interesting." /></h2><Link className="btn hub-button" href={localizedPath('/contact', locale)}>Say hello <span aria-hidden="true">↗</span></Link></section>
    </div></CosmicScene>
  )
}
