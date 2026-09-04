import Link from 'next/link'
import { localizedPath } from '@/lib/i18n-utils'
import type { CreatorProject } from '@/lib/projects'
import { ProjectMedia } from './ProjectMedia'

export function ProjectCard({ project, locale, priority = false }: { project: CreatorProject; locale: string; priority?: boolean }) {
  const path = localizedPath(`/projects/${project.slug}`, locale)
  return <article className="shelf-card" data-accent={project.accent}>
    <Link className="shelf-image-link" href={path} aria-label={`Explore ${project.name}`} tabIndex={-1}><ProjectMedia project={project} priority={priority} /></Link>
    <div className="shelf-card-body">
      <div className="shelf-meta"><span>{project.category}</span>{project.status && <span>{project.status}</span>}</div>
      <h3><Link href={path}>{project.name}<span aria-hidden="true">↗</span></Link></h3>
      <p>{project.description}</p>
      <div className="shelf-card-bottom"><span>{project.tags.slice(0, 2).join(' / ')}</span><Link href={path} aria-label={`Read about ${project.name}`}>Take a look <span aria-hidden="true">→</span></Link></div>
    </div>
  </article>
}
