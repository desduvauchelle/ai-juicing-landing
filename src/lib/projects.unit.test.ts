import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { projects, getProject, filterProjects, sortProjectsByNewest } from './projects'

describe('project directory', () => {
  it('sorts newest first without mutating inputs, keeping undated projects last', () => {
    const base = projects[0]
    const input = [
      { ...base, slug: 'unknown', repositoryCreatedAt: undefined },
      { ...base, slug: 'older', repositoryCreatedAt: '2025-01-01T00:00:00Z' },
      { ...base, slug: 'newer', repositoryCreatedAt: '2026-01-01T00:00:00Z' },
      { ...base, slug: 'invalid', repositoryCreatedAt: 'invalid' },
    ]
    expect(sortProjectsByNewest(input).map(p => p.slug)).toEqual(['newer', 'older', 'unknown', 'invalid'])
    expect(input[0].slug).toBe('unknown')
  })
  it('puts the selected projects first and preserves the remaining order', () => {
    expect(projects.map(p => p.slug)).toEqual([
      'tucky', 'recursive-solutions', 'tamias-os', 'infinite-ai-layer',
      'burrowise', 'ill-be-back', 'glue-paste-dev', 'prompt-optimizer',
      'tamias', 'ai-juicebar', 'growthinator', 'livecase',
    ])
  })
  it('finds projects across names and tags regardless of whitespace or case', () => {
    expect(filterProjects(projects, '  TUCKY   MACOS ', 'All projects').map(p => p.slug)).toEqual(['tucky'])
    expect(filterProjects(projects, 'Ollama', 'All projects').map(p => p.slug)).toContain('ai-juicebar')
  })
  it('combines the category and search query without leaking other categories', () => {
    expect(filterProjects(projects, 'AI', 'Developer tools').every(p => p.category === 'Developer tools')).toBe(true)
    expect(filterProjects(projects, 'Tucky', 'Business')).toEqual([])
    expect(filterProjects(projects, 'zzzz-no-match', 'All projects')).toEqual([])
  })
  it('resets to all twelve supplied projects and rejects unknown detail slugs', () => {
    expect(filterProjects(projects, '', 'All projects')).toHaveLength(12)
    expect(filterProjects(projects, 'LiveCase', 'Apps & tools').map(p => p.slug)).toEqual(['livecase'])
    expect(getProject('missing-project')).toBeUndefined()
    expect(new Set(projects.map(p => p.slug)).size).toBe(projects.length)
  })
  it('has valid local media and public destinations for every project', () => {
    for (const project of projects) {
			expect(project.website || project.sourceUrl || project.status).toBeTruthy()
      for (const url of [project.website, project.sourceUrl, ...project.sources.map(s => s.url)].filter(Boolean)) {
        expect(new URL(url!).protocol).toBe('https:')
      }
      for (const image of [project.image, ...(project.gallery || [])].filter(Boolean)) {
        expect(existsSync(join(process.cwd(), 'public', image!.src))).toBe(true)
        expect(image!.alt.length).toBeGreaterThan(10)
      }
      if (project.video) expect(project.video.youtubeId).toMatch(/^[\w-]{11}$/)
    }
  })
})
