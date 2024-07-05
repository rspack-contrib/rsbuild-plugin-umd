import { defineConfig } from '@rsbuild/core';
import { pluginUmd } from '../src';

export default defineConfig({
	plugins: [
		pluginUmd({
			name: 'myLib',
		}),
	],
	html: {
		template: './src/index.html',
	},
	tools: {
		htmlPlugin: true,
	},
});
