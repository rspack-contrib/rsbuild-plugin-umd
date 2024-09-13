import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test } from '@playwright/test';
import { createRsbuild, loadConfig } from '@rsbuild/core';

test('should generate UMD and web bundle correctly', async ({ page }) => {
	const rsbuild = await createRsbuild({
		cwd: __dirname,
		rsbuildConfig: (await loadConfig({ cwd: __dirname })).content,
	});

	await rsbuild.build();

	const { server, urls } = await rsbuild.preview();

	// Browser env
	await page.goto(`${urls[0]}/umd`);

	const test = page.locator('#test');
	await expect(test).toHaveText('2');

	expect(existsSync(join(__dirname, 'dist/static/js/index.js'))).toBeTruthy();

	// Node.js env
	writeFileSync(
		join(__dirname, 'dist/package.json'),
		JSON.stringify({ type: 'commonjs' }),
	);
	const { double } = require('./dist/umd/index.js');
	expect(double(1)).toEqual(2);

	await server.close();
});
