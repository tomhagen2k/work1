export interface TextureTile {
  x: number;
  y: number;
  width: number;
  height: number;
  sampleX: number;
  sampleY: number;
  sampleWidth: number;
  sampleHeight: number;
}

/** Exact source pixels with one-pixel gutters for filtering, never downsampled. */
export function planTextureTiles(
  width: number,
  height: number,
  limit: number,
): TextureTile[] {
  if (
    ![width, height, limit].every(Number.isSafeInteger) ||
    width <= 0 ||
    height <= 0 ||
    limit < 3
  )
    throw new Error('Invalid image dimensions or GPU texture limit');
  if (width <= limit && height <= limit)
    return [
      {
        x: 0,
        y: 0,
        width,
        height,
        sampleX: 0,
        sampleY: 0,
        sampleWidth: width,
        sampleHeight: height,
      },
    ];
  const size = limit - 2,
    tiles: TextureTile[] = [];
  for (let y = 0; y < height; y += size)
    for (let x = 0; x < width; x += size) {
      const w = Math.min(size, width - x),
        h = Math.min(size, height - y);
      const sx = Math.max(0, x - 1),
        sy = Math.max(0, y - 1);
      tiles.push({
        x,
        y,
        width: w,
        height: h,
        sampleX: sx,
        sampleY: sy,
        sampleWidth: Math.min(width, x + w + 1) - sx,
        sampleHeight: Math.min(height, y + h + 1) - sy,
      });
    }
  return tiles;
}
