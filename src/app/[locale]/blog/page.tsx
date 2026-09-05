import type { Metadata } from 'next'
import { getBlogPosts, getBlogAuthors, getBlogTopics } from '@growth-engine/sdk-server'
import { BlogList, TopicChips } from '@growth-engine/sdk-client/components'
import { getDictionary } from '@/i18n'
import { getDb, safeQuery } from '@/lib/db'
import { BLOG_POSTS_PER_PAGE } from '@/lib/blog-pagination'
import { localePrefix, localizedPath } from '@/lib/i18n-utils'
import { buildPageMetadata } from '@/lib/seo'
import { AuthorChips } from '@/components/blog/AuthorChips'

export const revalidate = 60

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const dict = await getDictionary(locale)
	return buildPageMetadata({
		path: '/blog',
		locale,
		title: 'AI notes, experiments, and builds',
		description:
			'Notes from the AI Juicing workbench: practical AI experiments, open-source projects, creator workflows, and what I learn while building in public.',
	})
}

export default async function BlogPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	const [posts, authors, topics] = await Promise.all([
		safeQuery([], () => getBlogPosts(getDb(), { locale, limit: 0 })),
		safeQuery([], () => getBlogAuthors(getDb())),
		safeQuery([], () => getBlogTopics(getDb(), locale)),
	])

	return (
		<main className="container mx-auto px-4 py-12">
			<h1 className="text-4xl font-bold text-center mb-2">{dict['blog.heading']}</h1>
			<p className="text-center text-base-content/60 mb-10">
				{dict['blog.subtitle']}
			</p>
			<section className="max-w-2xl mx-auto mb-10 text-base-content/70" aria-labelledby="notes-intro">
				<h2 id="notes-intro" className="text-xl font-semibold text-base-content mb-2">
					What these notes are for
				</h2>
				<p>
					This is where I write down the useful parts of building with AI: the experiments
					that held up, the workflows worth keeping, and the open-source projects still
					being figured out. Treat each note as a practical starting point, then test it
					against your own work.
				</p>
			</section>

			<TopicChips
				topics={topics}
				locale={locale}
				localePrefix={localePrefix(locale)}
				label={dict['blog.topics.label']}
			/>

			<AuthorChips
				authors={authors}
				locale={locale}
				label={dict['blog.filter.by.author']}
			/>

			<BlogList
				posts={posts}
				locale={locale}
				localePrefix={localePrefix(locale)}
				authors={authors}
				page={1}
				postsPerPage={BLOG_POSTS_PER_PAGE}
				paginationBasePath={localizedPath('/blog', locale)}
				translations={{
					noPostsMessage: dict['blog.no.posts'],
					clearSearchLabel: dict['blog.clear.search'],
					searchPlaceholder: dict['blog.search.placeholder'],
				}}
			/>
		</main>
	)
}
