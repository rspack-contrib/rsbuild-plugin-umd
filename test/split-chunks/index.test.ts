import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test } from '@playwright/test';
import { createRsbuild, loadConfig } from '@rsbuild/core';

test('should allow to configure split chunks with UMD plugin', async ({
  page,
}) => {
  const rsbuild = await createRsbuild({
    cwd: __dirname,
    rsbuildConfig: (await loadConfig({ cwd: __dirname })).content,
  });

  await rsbuild.build();
  const { server, urls } = await rsbuild.preview();

  expect(existsSync(join(__dirname, 'dist/index.js'))).toBeTruthy();
  expect(existsSync(join(__dirname, 'dist/lib-react.js'))).toBeTruthy();

  // Browser env
  await page.goto(urls[0]);
  const test = page.locator('#test');
  await expect(test).toHaveText('2');

  await server.close();
});
