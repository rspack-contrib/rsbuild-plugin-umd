import { defineConfig } from '@rsbuild/core';
import { pluginUmd } from '../../dist';
import { getRandomPort } from '../helper';

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
	server: {
		port: getRandomPort(),
	},
});
