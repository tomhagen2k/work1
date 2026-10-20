import { Application, Container, Graphics, Text } from 'pixi.js';
import type { GameState, Place, ValidatedLevel } from '../core/model';
import { RoadMap } from '../core/map';

/** Vector art for this slice; map topology/vehicle position always come from core data. */
export class MapRenderer {
  private readonly app = new Application();
  private readonly world = new Container();
  private readonly car = new Container();
  private readonly pins = new Map<string, Container>();
  private readonly map: RoadMap;
  private readonly observer: ResizeObserver;
  private readonly cleanups: (() => void)[] = [];
  private ready = false;
  private contextLost = false;
  private dirty = true;
  private lastFrameKey = '';
  private scale = 1;
  constructor(
    private readonly host: HTMLElement,
    private readonly level: ValidatedLevel,
    private readonly onContextLost: () => void,
  ) {
    this.map = new RoadMap(level);
    this.observer = new ResizeObserver(() => this.resize());
  }
  async init(): Promise<void> {
    await this.app.init({
      preference: 'webgl',
      autoStart: false,
      sharedTicker: false,
      antialias: true,
      backgroundAlpha: 0,
      resolution: Math.min(window.devicePixelRatio || 1, 2),
      autoDensity: true,
    });
    this.ready = true;
    this.app.canvas.setAttribute(
      'aria-label',
      'Bản đồ đường làng, kho Hợp tác xã và hai điểm giao',
    );
    this.host.append(this.app.canvas);
    this.app.stage.addChild(this.world);
    this.drawMap();
    this.drawCar();
    this.world.addChild(this.car);
    const lost = (event: Event) => {
      event.preventDefault();
      this.contextLost = true;
      this.onContextLost();
    };
    const restored = () => {
      this.contextLost = false;
      this.dirty = true;
      this.onContextLost();
    };
    this.app.canvas.addEventListener('webglcontextlost', lost);
    this.app.canvas.addEventListener('webglcontextrestored', restored);
    this.cleanups.push(
      () => this.app.canvas.removeEventListener('webglcontextlost', lost),
      () =>
        this.app.canvas.removeEventListener('webglcontextrestored', restored),
    );
    this.observer.observe(this.host);
    this.resize();
  }
  render(state: GameState): void {
    if (!this.ready || this.contextLost) return;
    const key = JSON.stringify([
      state.car.from,
      state.car.to,
      state.car.distance,
      state.orders.map((o) => o.delivered),
    ]);
    if (!this.dirty && key === this.lastFrameKey) return;
    this.dirty = false;
    this.lastFrameKey = key;
    const position = this.map.position(
      state.car.from,
      state.car.to,
      state.car.distance,
    );
    this.car.position.set(position.x, position.y);
    const a = this.map.node(state.car.from),
      b = this.map.node(state.car.to);
    this.car.rotation = Math.atan2(b.y - a.y, b.x - a.x);
    for (const place of this.level.places) {
      const orders = state.orders.filter((o) => o.destination === place.id);
      const complete =
        orders.length > 0 && orders.every((o) => o.delivered === o.quantity);
      const pin = this.pins.get(place.id);
      if (pin) pin.alpha = complete ? 0.55 : 1;
    }
    this.app.render();
  }
  destroy(): void {
    this.observer.disconnect();
    this.cleanups.forEach((cleanup) => cleanup());
    if (this.ready) this.app.destroy(true, { children: true });
    this.ready = false;
  }
  private resize(): void {
    if (!this.ready) return;
    this.dirty = true;
    const { width, height } = this.host.getBoundingClientRect();
    this.app.renderer.resize(Math.max(1, width), Math.max(1, height));
    this.scale = Math.max(
      0.01,
      Math.min((width - 84) / 1050, (height - 80) / 700),
    );
    this.world.scale.set(this.scale);
    this.world.position.set(
      (width - 1050 * this.scale) / 2 - 100 * this.scale,
      (height - 700 * this.scale) / 2 - 100 * this.scale + 12,
    );
    // Pins/vehicle retain usable screen size as camera fits the road graph.
    this.car.scale.set(1 / this.scale);
    this.pins.forEach((pin) => pin.scale.set(1 / this.scale));
  }
  private drawMap(): void {
    const ground = new Graphics();
    // Gardens stay inside blocks. No art covers road junctions or service zones.
    for (let x = 0; x < 3; x++)
      for (let y = 0; y < 2; y++) {
        ground
          .roundRect(150 + x * 350, 150 + y * 350, 250, 250, 30)
          .fill({ color: 0xb5d8aa, alpha: 0.7 });
        for (let n = 0; n < 3; n++)
          ground
            .circle(185 + x * 350 + n * 65, 195 + y * 350, 17)
            .fill(0x84b783);
        ground
          .roundRect(250 + x * 350, 285 + y * 350, 90, 65, 8)
          .fill(0xeed8ad);
        ground
          .moveTo(243 + x * 350, 285 + y * 350)
          .lineTo(295 + x * 350, 245 + y * 350)
          .lineTo(347 + x * 350, 285 + y * 350)
          .fill(0xc48c6d);
      }
    this.world.addChild(ground);
    const roads = new Graphics();
    for (const road of this.level.roads) {
      const a = this.map.node(road.a),
        b = this.map.node(road.b);
      roads
        .moveTo(a.x, a.y)
        .lineTo(b.x, b.y)
        .stroke({ width: 46, color: 0x9baf92, cap: 'round' });
      roads
        .moveTo(a.x, a.y)
        .lineTo(b.x, b.y)
        .stroke({ width: 36, color: 0xfff5de, cap: 'round' });
    }
    for (const node of this.level.nodes)
      roads.circle(node.x, node.y, 10).fill(0xd6c7aa);
    this.world.addChild(roads);
    for (const place of this.level.places) this.drawPin(place);
  }
  private drawPin(place: Place): void {
    const pin = new Container();
    const { x, y } = this.map.position(place.a, place.b, place.fraction * 350);
    pin.position.set(x, y);
    const color =
      place.kind === 'warehouse'
        ? 0x326a59
        : place.id === 'cho-phien'
          ? 0xbc7047
          : 0x5579a4;
    const body = new Graphics()
      .roundRect(-12, -31, 24, 24, 7)
      .fill(color)
      .stroke({ width: 2, color: 0xfffcf1 });
    body.moveTo(-4, -7).lineTo(0, -1).lineTo(4, -7).fill(color);
    const symbol = new Text({
      text:
        place.kind === 'warehouse' ? 'K' : place.id === 'cho-phien' ? '1' : '2',
      style: {
        fontFamily: 'system-ui',
        fontSize: 14,
        fontWeight: 'bold',
        fill: 0xffffff,
      },
    });
    symbol.anchor.set(0.5);
    symbol.position.set(0, -19);
    const label = new Text({
      text: place.name,
      style: {
        fontFamily: 'system-ui',
        fontSize: 12,
        fontWeight: '600',
        fill: 0x253b32,
        stroke: { color: 0xfff9ea, width: 4 },
      },
    });
    label.anchor.set(0.5, 1);
    label.position.set(0, -34);
    pin.addChild(body, symbol, label);
    this.pins.set(place.id, pin);
    this.world.addChild(pin);
  }
  private drawCar(): void {
    const shape = new Graphics()
      .ellipse(0, 4, 16, 9)
      .fill({ color: 0x253d33, alpha: 0.18 });
    shape
      .roundRect(-12, -8, 25, 16, 5)
      .fill(0xe7ae45)
      .stroke({ width: 2, color: 0xfffbef });
    shape.roundRect(4, -6, 6, 12, 2).fill(0x537d79);
    shape.rect(-7, -11, 7, 3).fill(0x304138);
    shape.rect(-7, 8, 7, 3).fill(0x304138);
    this.car.addChild(shape);
  }
}
