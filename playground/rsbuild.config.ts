import { defineConfig } from '@rsbuild/core';
import { pluginUmd } from '../src';

export default defineConfig({
	plugins: [pluginUmd()],
});
