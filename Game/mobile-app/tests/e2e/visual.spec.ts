import { readFile, writeFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

test('C1L1 keeps the original scene/camera and panels share the paused game', async ({
  page,
}, info) => {
  await page.goto('/');
  await expect(page.locator('canvas')).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('#app')).toHaveAttribute('data-phase', 'ready');
  expect(
    await page.evaluate(() =>
      document.fonts.check('900 14px Nunito', 'Hợp tác xã'),
    ),
  ).toBe(true);
  const viewport = page.viewportSize()!;
  const reference = await readFile(
    new URL(
      `../reference/demo-v1.5/${viewport.width}x${viewport.height}/c1l1-hud.png`,
      import.meta.url,
    ),
  );
  const actual = await page.screenshot({
    path: info.outputPath('c1l1-hud.png'),
  });
  const frame = await page.locator('.game-stage').boundingBox();
  expect(frame).not.toBeNull();
  const comparison = await page.evaluate(
    async ({ reference, actual, frame }) => {
      async function decode(data: string) {
        const image = new Image();
        image.src = `data:image/png;base64,${data}`;
        await image.decode();
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d')!;
        context.drawImage(image, 0, 0);
        return {
          canvas,
          context,
          pixels: context.getImageData(0, 0, image.width, image.height),
        };
      }
      const a = await decode(reference),
        b = await decode(actual),
        scale = frame.width / 844;
      const regions = [
        { name: 'scene and camera', x: 270, y: 144, width: 280, height: 45 },
        { name: 'van and lane offset', x: 280, y: 195, width: 130, height: 45 },
      ];
      const metrics = regions.map((region) => {
        let different = 0,
          total = 0;
        const x0 = Math.ceil(frame.x + region.x * scale),
          y0 = Math.ceil(frame.y + region.y * scale),
          x1 = Math.floor(frame.x + (region.x + region.width) * scale),
          y1 = Math.floor(frame.y + (region.y + region.height) * scale);
        for (let y = y0; y < y1; y++)
          for (let x = x0; x < x1; x++) {
            const offset = (y * a.canvas.width + x) * 4;
            let delta = 0;
            for (let channel = 0; channel < 3; channel++)
              delta = Math.max(
                delta,
                Math.abs(
                  a.pixels.data[offset + channel]! -
                    b.pixels.data[offset + channel]!,
                ),
              );
            if (delta > 16) different++;
            total++;
          }
        return {
          region: region.name,
          total,
          different,
          fraction: different / total,
        };
      });
      const diff = a.context.createImageData(a.canvas.width, a.canvas.height);
      for (let i = 0; i < diff.data.length; i += 4) {
        for (let c = 0; c < 3; c++)
          diff.data[i + c] = Math.min(
            255,
            Math.abs(a.pixels.data[i + c]! - b.pixels.data[i + c]!) * 4,
          );
        diff.data[i + 3] = 255;
      }
      a.context.putImageData(diff, 0, 0);
      return { metrics, diff: a.canvas.toDataURL('image/png').split(',')[1]! };
    },
    {
      reference: reference.toString('base64'),
      actual: actual.toString('base64'),
      frame: frame!,
    },
  );
  await writeFile(
    info.outputPath('demo-app-diff.png'),
    Buffer.from(comparison.diff, 'base64'),
  );
  await info.attach('scene-comparison', {
    body: JSON.stringify(comparison.metrics, null, 2),
    contentType: 'application/json',
  });
  // These source-art ROIs catch replaced scenery, wrong scale or a missing lane offset.
  // They deliberately do not claim full-screen parity of the still-incomplete UI.
  for (const metric of comparison.metrics)
    expect(metric.fraction, JSON.stringify(metric)).toBeLessThan(0.05);
  for (const name of ['Nhiệm vụ', 'Hướng dẫn', 'Bản đồ']) {
    await page.getByRole('button', { name, exact: true }).click();
    await expect(page.locator('#app')).toHaveAttribute('data-phase', 'paused');
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: 'Đóng', exact: true }).click();
    await expect(page.locator('#app')).toHaveAttribute('data-phase', 'ready');
  }
});
