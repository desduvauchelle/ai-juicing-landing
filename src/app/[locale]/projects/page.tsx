import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { CosmicScene } from '@/components/landing/CosmicScene'
import { ObjectViewer } from '@/components/three/ObjectViewer'
import { ProjectDirectory } from '@/components/projects/ProjectDirectory'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata({ path: '/projects', locale, title: 'Projects & experiments', description: 'Explore the AI Juicing workbench: local AI tools, creator apps, open code, and curious experiments. Find demos, screenshots, and the code behind each project.' })
}
export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return <CosmicScene><div className="hub-width projects-page">
    <header className="directory-hero"><div><p className="eyebrow">The workbench</p><h1>Curiosity.<br />With a <em>launch button.</em></h1><p>Tools I use. Ideas I couldn’t leave alone. A few experiments that grew legs. Pick something up and see where it takes you.</p></div><ObjectViewer kind="chip" compact /></header>
    <ProjectDirectory locale={locale} />
  </div></CosmicScene>
}
