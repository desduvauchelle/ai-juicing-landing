import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	async redirects() {
		return [
			{
				source: '/projects/echo-scribe',
				destination: '/projects/tucky',
				permanent: true,
			},
			{
				source: '/:locale/projects/echo-scribe',
				destination: '/:locale/projects/tucky',
				permanent: true,
			},
		]
	},
	serverExternalPackages: [
		'@growth-engine/sdk-server',
		'@libsql/client',
		'libsql',
		'drizzle-orm',
	],
}

export default nextConfig
