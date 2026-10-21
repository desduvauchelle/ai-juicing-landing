import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	test: {
		server: { deps: { inline: ['@growth-engine/sdk-client'] } },
		globals: true,
		environment: 'node',
		include: ['src/**/*.unit.test.ts'],
		exclude: ['node_modules', '.next'],
	},
})
