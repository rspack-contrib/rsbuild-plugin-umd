import { writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';
import { createRsbuild, loadConfig } from '@rsbuild/core';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

test('should generate UMD bundle with default export correctly', async ({
	page,
}) => {
	const rsbuild = await createRsbuild({
		cwd: __dirname,
		rsbuildConfig: (await loadConfig({ cwd: __dirname })).content,
	});

	await rsbuild.build();
	const { server, urls } = await rsbuild.preview();

	// Browser env
	await page.goto(urls[0]);
	const test = page.locator('#test');
	await expect(test).toHaveText('2');

	// Node.js env
	writeFileSync(
		join(__dirname, 'dist/package.json'),
		JSON.stringify({ type: 'commonjs' }),
	);
	const double = require('./dist/index.js');
	expect(double(1)).toEqual(2);

	await server.close();
});
