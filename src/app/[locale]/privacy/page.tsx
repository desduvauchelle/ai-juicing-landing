import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { legalContent } from '@/lib/legal-content'
import { LegalDocument } from '@/components/legal/LegalDocument'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata({ path: '/privacy', locale, title: legalContent.privacy.title, description: legalContent.privacy.intro })
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return <LegalDocument page="privacy" locale={locale} />
}
