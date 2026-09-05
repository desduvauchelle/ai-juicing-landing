import { JsonLd } from '@growth-engine/sdk-client/components'
import { SITE_URL } from '@/lib/sitemap-shared'

/**
 * Stable, site-wide identity data. Content managed by Growth Engine can add
 * page-specific schema separately; this ensures the creator site is still
 * identifiable when that optional configuration is unavailable.
 */
export function SiteJsonLd() {
	return (
		<JsonLd
			data={[
				{
					'@context': 'https://schema.org',
					'@type': 'WebSite',
					name: 'AI Juicing',
					url: SITE_URL,
					description:
						'A home for AI experiments, open-source projects, and notes from building in public.',
					publisher: { '@type': 'Person', name: 'Denis Duvauchelle' },
				},
				{
					'@context': 'https://schema.org',
					'@type': 'Person',
					name: 'Denis Duvauchelle',
					url: SITE_URL,
					sameAs: [
						'https://www.youtube.com/@ai-juicing',
						'https://github.com/desduvauchelle',
					],
				},
			]}
		/>
	)
}
