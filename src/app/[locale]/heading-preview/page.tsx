import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { HeadingPreview } from '@/components/typography/HeadingPreview'

export const metadata: Metadata = { title: 'Neon heading preview', robots: { index: false, follow: false } }

export default function Page() {
  if (process.env.NODE_ENV !== 'development') notFound()
  return <HeadingPreview />
}
