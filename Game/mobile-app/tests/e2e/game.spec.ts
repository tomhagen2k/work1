import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

async function advanceUntil(
  page: Page,
  predicate: () => Promise<boolean>,
  maxSeconds = 20,
) {
  for (let n = 0; n < maxSeconds * 4; n++) {
    if (await predicate()) return;
    await page.clock.runFor(250);
  }
  throw new Error(
    `State not reached: ${JSON.stringify(await page.locator('#app').evaluate((el) => ({ ...(el as HTMLElement).dataset })))}`,
  );
}
async function openGame(page: Page) {
  await page.clock.install({ time: new Date('2026-01-01T00:00:00Z') });
  await page.goto('/');
  await expect(page.locator('canvas')).toBeVisible();
  await expect(page.locator('#app')).toHaveAttribute('data-phase', 'ready');
  await page.clock.pauseAt(new Date('2026-01-01T00:01:00Z'));
}
test('renders the real map, keeps touch targets usable and can finish/restart/save a full delivery run', async ({
  page,
}, testInfo) => {
  test.setTimeout(60_000);
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await openGame(page);
  await expect(
    page.getByRole('main', { name: 'Little Routes', exact: true }),
  ).toBeVisible();
  for (const button of await page.locator('.dpad button, .icon-button').all()) {
    const box = await button.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
    expect(box!.y + box!.height).toBeLessThanOrEqual(
      page.viewportSize()!.height,
    );
  }
  await page.screenshot({ path: testInfo.outputPath('ready.png') });
  await page.getByRole('button', { name: 'Đi phải', exact: true }).click();
  await advanceUntil(
    page,
    async () =>
      (await page.locator('#app').getAttribute('data-phase')) === 'pickup',
  );
  const stopped = await page.locator('#app').getAttribute('data-elapsed-ticks');
  await page.clock.runFor(3000);
  await expect(page.locator('#app')).toHaveAttribute(
    'data-elapsed-ticks',
    stopped!,
  );
  await page.getByRole('button', { name: 'Lấy 2 kiện · Chợ Phiên' }).click();
  await page.clock.runFor(2100);
  await page.getByRole('button', { name: 'Lấy 1 kiện · Xóm Trên' }).click();
  await page.clock.runFor(2100);
  await expect(page.locator('#cargo')).toHaveText('3 / 3');
  await page.getByRole('button', { name: 'Đi lên', exact: true }).click();
  await advanceUntil(
    page,
    async () =>
      (await page.locator('#app').getAttribute('data-from')) === 'c2r1',
  );
  await page.getByRole('button', { name: 'Đi phải', exact: true }).click();
  await advanceUntil(
    page,
    async () =>
      (
        await page.locator('.order-card[data-order="c1-l1-cho"]').textContent()
      )?.includes('Đã giao 2') ?? false,
  );
  await page.getByRole('button', { name: 'Quay đầu', exact: true }).click();
  await advanceUntil(
    page,
    async () =>
      (await page.locator('#app').getAttribute('data-phase')) === 'won',
  );
  await expect(page.getByRole('dialog')).toContainText('Đã giao đủ 3 kiện');
  await page.screenshot({ path: testInfo.outputPath('won.png') });
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem('little-routes.mobile.save.v1') ?? '{}')
          .best['c1-l1'].stars,
    ),
  ).toBe(3);
  await page.getByRole('button', { name: 'Chơi lại', exact: true }).click();
  await expect(page.locator('#app')).toHaveAttribute('data-phase', 'ready');
  await expect(page.locator('#cargo')).toHaveText('0 / 3');
  await expect(page.locator('#clock')).toHaveText('1:30');
  await page.reload();
  await expect(page.locator('canvas')).toBeVisible();
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem('little-routes.mobile.save.v1') ?? '{}')
          .best['c1-l1'].stars,
    ),
  ).toBe(3);
  expect(errors).toEqual([]);
});
test('pauses on demand/rotation, resumes explicitly, and handles real timeout, extension and loss', async ({
  page,
}) => {
  // This executes 120 seconds of real simulation ticks/rendering, with a virtual browser clock.
  test.setTimeout(120_000);
  await openGame(page);
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowDown');
  await page.clock.runFor(1000);
  await page.getByRole('button', { name: 'Tạm dừng', exact: true }).click();
  const paused = await page.locator('#app').getAttribute('data-elapsed-ticks');
  await page.clock.runFor(5000);
  await expect(page.locator('#app')).toHaveAttribute(
    'data-elapsed-ticks',
    paused!,
  );
  await page.getByRole('button', { name: 'Tiếp tục', exact: true }).click();
  const viewport = page.viewportSize()!;
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('#orientation')).toBeVisible();
  await expect(page.locator('#app')).toHaveAttribute('data-phase', 'paused');
  await page.clock.runFor(1000);
  await page.setViewportSize(viewport);
  await expect(page.locator('#app')).toHaveAttribute('data-phase', 'paused');
  await page.getByRole('button', { name: 'Tiếp tục', exact: true }).click();
  await advanceUntil(
    page,
    async () =>
      (await page.locator('#app').getAttribute('data-phase')) === 'timeout',
    100,
  );
  await page
    .getByRole('button', { name: 'Dùng +30 giây', exact: true })
    .click();
  await expect(page.locator('#clock')).toHaveText('0:30');
  await advanceUntil(
    page,
    async () =>
      (await page.locator('#app').getAttribute('data-phase')) === 'timeout',
    35,
  );
  await expect(
    page.getByRole('button', { name: 'Dùng +30 giây', exact: true }),
  ).toHaveCount(0);
  await page.getByRole('button', { name: 'Chịu thua', exact: true }).click();
  await expect(page.locator('#app')).toHaveAttribute('data-phase', 'lost');
});
