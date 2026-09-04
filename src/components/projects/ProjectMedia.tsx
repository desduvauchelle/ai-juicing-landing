import Image from 'next/image'
import type { CreatorProject } from '@/lib/projects'

export function ProjectMedia({ project, priority = false }: { project: CreatorProject; priority?: boolean }) {
  return (
    <div className={`project-media project-media-${project.accent} ${project.image?.fit === 'contain' ? 'project-media-contained' : ''}`}>
      {project.image ? <Image src={project.image.src} alt={project.image.alt} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 620px" className={project.image.fit === 'contain' ? 'media-contain' : 'media-cover'} priority={priority} /> : project.snippet ? (
        <div className="project-code"><span>{project.snippet.label}</span><pre><code>{project.snippet.text}</code></pre></div>
      ) : <div className="project-preview-pending"><span aria-hidden="true">T / OS</span><p>More soon.</p></div>}
    </div>
  )
}
