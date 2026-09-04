import type { Metadata } from 'next'
import { getBlogPosts } from '@growth-engine/sdk-server'
import { BlogCard } from '@growth-engine/sdk-client/components'
import { getDb, safeQuery } from '@/lib/db'
import { localePrefix } from '@/lib/i18n-utils'
import { buildPageMetadata } from '@/lib/seo'
import { CreatorHome } from '@/components/landing/CreatorHome'

export const revalidate = 60

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	// Homepage canonical is the (locale-aware) site root; title is the brand itself.
	return buildPageMetadata({
		path: '',
		locale,
		title: 'AI Juicing | Build, experiment, share',
		description: 'A home for AI experiments, open source projects, and notes from building in public. Follow the curiosity with AI Juicing.',
		brand: false,
	})
}

export default async function HomePage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const posts = await safeQuery([], () => getBlogPosts(getDb(), { locale, limit: 3 }))

	return (
    <CreatorHome locale={locale}>
      {posts.length === 0 ? (
        <div className="notes-empty"><span aria-hidden="true">↳</span><p>Fresh notes are on the way. In the meantime, there’s plenty of curiosity to go around.</p></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {posts.map((post) => (
            <BlogCard key={post.id} slug={post.slug} title={post.title} content={post.content} heroImageUrl={post.heroImageUrl} seoDesc={post.seoDesc} createdAt={post.createdAt} locale={locale} localePrefix={localePrefix(locale)} />
          ))}
        </div>
      )}
    </CreatorHome>
  )
}
