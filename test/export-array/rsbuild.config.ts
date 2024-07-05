import { defineConfig } from '@rsbuild/core';
import { pluginUmd } from '@rsbuild/plugin-umd';
import { getRandomPort } from '../helper';

export default defineConfig({
	plugins: [
		pluginUmd({
			name: 'myLib',
			export: ['default', 'subModule'],
		}),
	],
	html: {
		template: './src/index.html',
	},
	tools: {
		htmlPlugin: true,
	},
	server: {
		port: getRandomPort(),
	},
});
