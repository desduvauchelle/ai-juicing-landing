'use client'
import { useLayoutEffect, useState } from 'react'
import { ScrollTrigger } from '@/hooks/useGsap'
import { projects, projectCategories, filterProjects } from '@/lib/projects'
import { ProjectCard } from './ProjectCard'

export function ProjectDirectory({ locale }: { locale: string }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All projects')
  const visible = filterProjects(projects, query, category)
  // Filtering moves existing cards; update their entrance positions before paint.
  useLayoutEffect(() => { ScrollTrigger.refresh() }, [query, category])
  return <section className="directory-list" aria-label="Project directory">
    <h2 className="sr-only">Explore the projects</h2>
    <div className="directory-toolbar">
      <div className="project-filters" role="group" aria-label="Filter projects by category">{['All projects', ...projectCategories].map(label => <button key={label} type="button" aria-pressed={category === label} onClick={() => setCategory(label)}>{label}</button>)}</div>
      <label className="project-search"><span className="sr-only">Search projects</span><input type="search" placeholder="Find your next rabbit hole…" value={query} onChange={event => setQuery(event.target.value)} /></label>
    </div>
    <p className="directory-count" role="status">{visible.length} {visible.length === 1 ? 'project' : 'projects'}{query.trim() ? ` matching “${query.trim()}”` : ' to explore'} · Newest repositories first · Undated projects last</p>
    {visible.length ? <div className="project-shelf">{visible.map(project => <ProjectCard key={project.slug} project={project} locale={locale} />)}</div> : <div className="directory-empty"><h2>No projects found.</h2><p>Try another word or explore the whole workbench.</p><button type="button" className="btn hub-button" onClick={() => { setQuery(''); setCategory('All projects') }}>Show all projects</button></div>}
  </section>
}
