import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';
import { createRsbuild, loadConfig } from '@rsbuild/core';

const __dirname = dirname(fileURLToPath(import.meta.url));

test('should allow to configure split chunks with UMD plugin', async ({
	page,
}) => {
	const rsbuild = await createRsbuild({
		cwd: __dirname,
		rsbuildConfig: (await loadConfig({ cwd: __dirname })).content,
	});

	await rsbuild.build();
	const { server, urls } = await rsbuild.preview();

	expect(existsSync(join(__dirname, 'dist/static/js/index.js'))).toBeTruthy();
	expect(
		existsSync(join(__dirname, 'dist/static/js/lib-react.js')),
	).toBeTruthy();

	// Browser env
	await page.goto(urls[0]);
	const test = page.locator('#test');
	await expect(test).toHaveText('2');

	await server.close();
});
