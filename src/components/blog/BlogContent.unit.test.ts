import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { BlogContent } from '@growth-engine/sdk-client/components'
import type { BlogPost } from '@growth-engine/sdk-client'

describe('blog article rendering', () => {
	it.each([
		'["AI agent harness","AI tools explained"]',
		['AI agent harness', 'AI tools explained'],
	])('renders stored keywords without crashing (%j)', (keywords) => {
		// Turso stores keywords as JSON text; the server SDK returns that raw
		// value even though the client type describes the parsed array.
		const post = {
			id: 'regression-post',
			slug: 'ai-didnt-get-smarter-it-got-hands',
			title: 'AI Didn\'t Get Smarter. It Got Hands.',
			content: 'A model can use **tools**. [Read more](/blog)',
			language: 'en',
			keywords,
		} as BlogPost

		const html = renderToStaticMarkup(createElement(BlogContent, {
			html: post.content,
			post,
			canonicalUrl: `https://www.ai-juicing.com/blog/${post.slug}`,
		}))

		expect(html).toContain('<strong>tools</strong>')
		expect(html).toContain('href="/blog"')
		expect(html).toContain('"keywords":"AI agent harness, AI tools explained"')
		expect(html).toContain('"@type":"BlogPosting"')
	})
})
