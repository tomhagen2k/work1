import { Container, Rectangle, Sprite, Texture } from 'pixi.js';
import { planTextureTiles } from './texture-tiles';

export async function loadScenery(
  url: string,
  bounds: { x: number; y: number; width: number; height: number },
  limit: number,
) {
  const image = new Image();
  image.src = url;
  await image.decode();
  const tiles = planTextureTiles(
    image.naturalWidth,
    image.naturalHeight,
    limit,
  );
  const container = new Container(),
    textures: Texture[] = [];
  const ratioX = bounds.width / image.naturalWidth,
    ratioY = bounds.height / image.naturalHeight;
  try {
    for (const tile of tiles) {
      let texture: Texture;
      if (tiles.length === 1) texture = Texture.from(image);
      else {
        const canvas = document.createElement('canvas');
        canvas.width = tile.sampleWidth;
        canvas.height = tile.sampleHeight;
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Cannot prepare scene texture tiles');
        context.drawImage(
          image,
          tile.sampleX,
          tile.sampleY,
          tile.sampleWidth,
          tile.sampleHeight,
          0,
          0,
          tile.sampleWidth,
          tile.sampleHeight,
        );
        const source = Texture.from(canvas);
        texture = new Texture({
          source: source.source,
          frame: new Rectangle(
            tile.x - tile.sampleX,
            tile.y - tile.sampleY,
            tile.width,
            tile.height,
          ),
        });
      }
      textures.push(texture);
      const sprite = new Sprite(texture);
      sprite.position.set(
        bounds.x + tile.x * ratioX,
        bounds.y + tile.y * ratioY,
      );
      sprite.width = tile.width * ratioX;
      sprite.height = tile.height * ratioY;
      container.addChild(sprite);
    }
  } catch (error) {
    container.destroy({ children: true });
    textures.forEach((texture) => texture.destroy(true));
    throw error;
  }
  let disposed = false;
  return {
    container,
    sourceSize: { width: image.naturalWidth, height: image.naturalHeight },
    tileSizes: tiles.map((tile) => ({
      width: tile.sampleWidth,
      height: tile.sampleHeight,
    })),
    destroy: () => {
      if (disposed) return;
      disposed = true;
      container.destroy({ children: true });
      textures.forEach((texture) => texture.destroy(true));
    },
  };
}
