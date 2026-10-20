import { expect, test } from '@playwright/test';

test('built assets render and drive without Vite runtime or an internet connection', async ({
  page,
  context,
}, testInfo) => {
  const errors: string[] = [];
  const external: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) => {
    if (
      new URL(request.url()).hostname &&
      new URL(request.url()).hostname !== '127.0.0.1'
    )
      external.push(request.url());
  });
  await page.goto('/');
  await expect(page.locator('canvas')).toBeVisible();
  await expect(page.locator('#app')).toHaveAttribute('data-phase', 'ready');
  expect(await page.locator('script[src]').getAttribute('src')).toMatch(
    /^\/assets\/index-/,
  );
  await context.setOffline(true);
  await page.getByRole('button', { name: 'Đi phải', exact: true }).click();
  await expect(page.locator('#app')).toHaveAttribute('data-phase', 'playing');
  await expect
    .poll(async () =>
      Number(await page.locator('#app').getAttribute('data-distance')),
    )
    .toBeGreaterThan(40);
  await page.screenshot({ path: testInfo.outputPath('built-playing.png') });
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});
