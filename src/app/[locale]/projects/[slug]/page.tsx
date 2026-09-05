import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { projects, getProject } from '@/lib/projects'
import { localizedPath } from '@/lib/i18n-utils'
import { buildPageMetadata } from '@/lib/seo'
import { ProjectMedia } from '@/components/projects/ProjectMedia'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { ProjectVideo } from '@/components/projects/ProjectVideo'

type Params = { locale: string; slug: string }
export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })) }
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params
  const project = getProject(slug)
  if (!project) notFound()
  return buildPageMetadata({ path: `/projects/${slug}`, locale, title: project.name, description: project.description, image: project.image?.src })
}
export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params
  const project = getProject(slug)
  if (!project) notFound()
  const related = [...projects.filter(item => item.slug !== slug && item.category === project.category), ...projects.filter(item => item.slug !== slug && item.category !== project.category)].slice(0, 2)
  return <div className="hub-width project-detail" data-accent={project.accent}>
    <Link className="text-link project-back" href={localizedPath('/projects', locale)}>← All projects</Link>
    <header className="project-detail-header"><div><p className="eyebrow">{project.category}</p><h1>{project.name}</h1><p className="project-deck">{project.description}</p></div><div className="project-destinations">
      {project.website && <a className="btn hub-button" href={project.website} target="_blank" rel="noopener noreferrer">Visit website ↗</a>}
      {project.sourceUrl && <a className={project.website ? 'text-link' : 'btn hub-button'} href={project.sourceUrl} target="_blank" rel="noopener noreferrer">{project.slug === 'tamias-os' ? 'Repository link' : 'Explore the code'} ↗</a>}
      {project.video && <a className="text-link" href="#demo">Watch the demo ↓</a>}
    </div></header>
    <figure className="project-feature-image"><ProjectMedia project={project} priority />{project.image && <figcaption>{project.image.caption}</figcaption>}</figure>
    <div className="project-story"><section><h2>What’s the idea?</h2><p>{project.about}</p>{project.highlights.length > 0 && <><h2>What you can explore</h2><ul>{project.highlights.map(item => <li key={item}>{item}</li>)}</ul></>}{project.note && <p className="project-note">{project.note}</p>}</section><aside className="project-facts"><h2>A few useful details</h2><dl><div><dt>Filed under</dt><dd>{project.category}</dd></div><div><dt>Made for exploring</dt><dd>{project.tags.join(' / ')}</dd></div>{project.status && <div><dt>Stage</dt><dd>{project.status}</dd></div>}</dl>{project.sources.length > 0 && <><h2>From the project</h2>{project.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>)}</>}</aside></div>
    {project.video && <section id="demo" className="project-demo"><h2>See it in action.</h2><ProjectVideo {...project.video} /></section>}
    {project.gallery && <section className="project-gallery-section"><h2>A closer look.</h2><div className={`project-gallery ${project.gallery.length === 1 ? 'project-gallery-single' : ''}`}>{project.gallery.map(item => <figure key={item.src}><a href={item.src} target="_blank" rel="noopener noreferrer" aria-label={`Open image: ${item.alt}`}><Image src={item.src} alt={item.alt} width={900} height={750} className="gallery-image" /></a><figcaption>{item.caption}</figcaption></figure>)}</div></section>}
    <section className="related-projects"><div className="related-heading"><h2>Keep following the curiosity.</h2><Link className="text-link" href={localizedPath('/projects', locale)}>All projects ↗</Link></div><div className="project-shelf">{related.map(item => <ProjectCard key={item.slug} project={item} locale={locale} />)}</div></section>
  </div>
}
