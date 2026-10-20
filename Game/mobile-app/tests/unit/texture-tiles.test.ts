import { describe, expect, it } from 'vitest';
import { planTextureTiles } from '../../src/rendering/texture-tiles';

describe('source artwork on limited mobile GPUs', () => {
  it.each([1024, 2048, 4096, 8192])(
    'covers all 6300×3500 pixels exactly once within a %i GPU limit',
    (limit) => {
      const tiles = planTextureTiles(6300, 3500, limit);
      expect(
        tiles.reduce((area, tile) => area + tile.width * tile.height, 0),
      ).toBe(6300 * 3500);
      for (const tile of tiles) {
        expect(tile.sampleWidth).toBeLessThanOrEqual(limit);
        expect(tile.sampleHeight).toBeLessThanOrEqual(limit);
        expect(tile.sampleX).toBeGreaterThanOrEqual(0);
        expect(tile.sampleY).toBeGreaterThanOrEqual(0);
        expect(tile.sampleX + tile.sampleWidth).toBeLessThanOrEqual(6300);
        expect(tile.sampleY + tile.sampleHeight).toBeLessThanOrEqual(3500);
        expect(tile.x - tile.sampleX).toBeGreaterThanOrEqual(0);
        expect(tile.x + tile.width).toBeLessThanOrEqual(
          tile.sampleX + tile.sampleWidth,
        );
      }
      for (const y of [...new Set(tiles.map((tile) => tile.y))]) {
        const row = tiles.filter((tile) => tile.y === y);
        let end = 0;
        for (const tile of row) {
          expect(tile.x).toBe(end);
          end += tile.width;
        }
        expect(end).toBe(6300);
      }
      const rows = [
        ...new Map(tiles.map((tile) => [tile.y, tile.height])).entries(),
      ];
      let end = 0;
      for (const [y, height] of rows) {
        expect(y).toBe(end);
        end += height;
      }
      expect(end).toBe(3500);
    },
  );
  it('keeps an image that fits the GPU as one unchanged texture', () => {
    expect(planTextureTiles(1024, 512, 1024)).toEqual([
      {
        x: 0,
        y: 0,
        width: 1024,
        height: 512,
        sampleX: 0,
        sampleY: 0,
        sampleWidth: 1024,
        sampleHeight: 512,
      },
    ]);
  });
  it.each([
    [0, 10, 4096],
    [10, 10, 2],
    [10.5, 10, 4096],
  ])('rejects invalid texture dimensions %j', (width, height, limit) => {
    expect(() => planTextureTiles(width!, height!, limit!)).toThrow();
  });
});
