import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
	{
		extends: './vite.config.ts',
		test: {
			browser: {
				// Conflicts between VS Code extension and vitest CLI command...
				api: {
					port: 5180,
					strictPort: true,
				},
				enabled: true,
				headless: true,
				name: 'chromium',
				provider: 'playwright',
			},
			exclude: ['test/**/*.node.test.ts'],
			include: ['test/**/*.test.ts'],
			name: 'browser',
		},
	},
	{
		extends: './vite.config.ts',
		test: {
			environment: 'node',
			exclude: ['test/**/*.browser.test.ts'],
			include: ['test/**/*.test.ts'],
			name: 'node',
			root: path.resolve(path.dirname(fileURLToPath(import.meta.url))),
		},
	},
])
