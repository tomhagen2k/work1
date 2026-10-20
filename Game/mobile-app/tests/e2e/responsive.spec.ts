import { expect, test } from '@playwright/test';

test.use({ hasTouch: true });
test('touch layout, safe-area insets, visibility boundary and a warm offline session', async ({
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
  const cdp = await context.newCDPSession(page);
  await cdp.send('Emulation.setSafeAreaInsetsOverride', {
    insets: { left: 44, right: 24, bottom: 21, top: 0 },
  });
  for (const [width, height] of [
    [568, 320],
    [667, 375],
    [844, 390],
    [932, 430],
    [1024, 768],
  ]) {
    await page.setViewportSize({ width: width!, height: height! });
    await expect(page.locator('#orientation')).toBeHidden();
    expect(
      await page
        .locator('.game-shell')
        .evaluate((el) => parseFloat(getComputedStyle(el).paddingLeft)),
    ).toBe(44);
    for (const button of await page
      .locator('.dpad button, .icon-button')
      .all()) {
      const rect = await button.boundingBox();
      expect(rect).not.toBeNull();
      expect(rect!.width).toBeGreaterThanOrEqual(44);
      expect(rect!.height).toBeGreaterThanOrEqual(44);
      expect(rect!.x).toBeGreaterThanOrEqual(44);
      expect(rect!.x + rect!.width).toBeLessThanOrEqual(width! - 24);
      expect(rect!.y + rect!.height).toBeLessThanOrEqual(height! - 21);
    }
    await page.screenshot({
      path: testInfo.outputPath(`safe-${width}x${height}.png`),
    });
  }
  await cdp.send('Emulation.setSafeAreaInsetsOverride', { insets: {} });
  await page.getByRole('button', { name: 'Đi phải', exact: true }).tap();
  await expect(page.locator('#app')).toHaveAttribute('data-phase', 'playing');
  // Synthetic visibility event tests the browser adapter. Native backgrounding is a separate check.
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', {
      configurable: true,
      value: true,
    });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect(page.locator('#app')).toHaveAttribute('data-phase', 'paused');
  const paused = await page.locator('#app').getAttribute('data-elapsed-ticks');
  await page.evaluate(() => {
    Reflect.deleteProperty(document, 'hidden');
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect(page.locator('#app')).toHaveAttribute(
    'data-elapsed-ticks',
    paused!,
  );
  await context.setOffline(true);
  await page.getByRole('button', { name: 'Tiếp tục', exact: true }).tap();
  await expect(page.locator('#app')).toHaveAttribute('data-phase', 'playing');
  await expect
    .poll(() => page.locator('#app').getAttribute('data-elapsed-ticks'))
    .not.toBe(paused);
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});
