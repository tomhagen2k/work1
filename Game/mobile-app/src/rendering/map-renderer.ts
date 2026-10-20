import {
  Application,
  Assets,
  Container,
  Graphics,
  Sprite,
  Text,
} from 'pixi.js';
import type { WebGLRenderer } from 'pixi.js';
import type { GameState, ValidatedLevel } from '../core/model';
import { RoadMap } from '../core/map';
import { cargoCount } from '../core/orders';
import { VEHICLES } from '../core/vehicle';
import { cameraAt, FIRST_SCENE, visualPose } from './scene';
import { loadScenery } from './scenery';

/** Demo artwork and camera, driven only by the existing core snapshot. */
export class MapRenderer {
  private readonly app = new Application();
  private readonly world = new Container();
  private readonly vehicle = new Container();
  private readonly badge = new Container();
  private readonly badgeText = new Text({
    text: '0/3',
    style: {
      fontFamily: 'Nunito',
      fontSize: 12,
      fontWeight: '900',
      fill: 0xffffff,
    },
  });
  private readonly indicator = new Graphics();
  private readonly serviceBar = new Graphics();
  private readonly map: RoadMap;
  private readonly cleanups: (() => void)[] = [];
  private ready = false;
  private disposed = false;
  private contextLost = false;
  private lastFrameKey = '';
  constructor(
    private readonly host: HTMLElement,
    private readonly level: ValidatedLevel,
    private readonly onContextLost: () => void,
  ) {
    this.map = new RoadMap(level);
  }
  async init(): Promise<void> {
    await document.fonts.load(
      '900 14px Nunito',
      'Hợp tác xã Chợ Phiên Xóm Trên',
    );
    await this.app.init({
      preference: 'webgl',
      autoStart: false,
      sharedTicker: false,
      antialias: true,
      background: 0x8fd16a,
      resolution: Math.min(window.devicePixelRatio || 1, 2),
      autoDensity: true,
      width: 844,
      height: 390,
    });
    this.ready = true;
    if (this.disposed) {
      this.app.destroy(true, { children: true });
      this.ready = false;
      return;
    }
    this.app.canvas.setAttribute(
      'aria-label',
      'Bản đồ đường làng, kho Hợp tác xã và hai điểm giao',
    );
    this.host.append(this.app.canvas);
    this.app.stage.addChild(this.world);
    const gl = (this.app.renderer as WebGLRenderer).gl;
    const limit = Number(gl.getParameter(gl.MAX_TEXTURE_SIZE));
    const scenery = await loadScenery(
      FIRST_SCENE.image,
      FIRST_SCENE.bounds,
      limit,
    );
    if (this.disposed) {
      scenery.destroy();
      return;
    }
    this.cleanups.push(() => scenery.destroy());
    this.app.canvas.dataset.sceneTextures = JSON.stringify({
      source: scenery.sourceSize,
      tiles: scenery.tileSizes,
      limit,
    });
    this.world.addChild(scenery.container);
    const van = await Assets.load('/assets/scenes/van-white.svg');
    if (this.disposed) return;
    for (const marker of FIRST_SCENE.pins) {
      const place = this.level.places.find((p) => p.id === marker.id);
      if (!place) throw new Error(`Missing scene place ${marker.id}`);
      const pin = new Graphics();
      if (place.kind === 'warehouse') pin.roundRect(-13, -13, 26, 26, 6);
      else pin.circle(0, 0, 13);
      pin.fill(marker.color).stroke({ color: 0xffffff, width: 3 });
      pin
        .poly(
          place.kind === 'warehouse'
            ? [0, -7, 7, 6, -7, 6]
            : [0, 7, 7, -5, -7, -5],
        )
        .fill(0xffffff);
      pin.position.set(marker.x, marker.y);
      const label = new Text({
        text: place.name,
        style: {
          fontFamily: 'Nunito',
          fontSize: 11,
          fontWeight: '900',
          fill: 0x1d2733,
          stroke: { color: 0xffffff, width: 3.5 },
        },
      });
      label.anchor.set(0.5, 0.8);
      label.position.set(marker.labelX, marker.labelY);
      this.world.addChild(pin, label);
    }
    const sprite = new Sprite(van);
    sprite.anchor.set(0.5);
    sprite.width = 60;
    sprite.height = 30;
    this.vehicle.addChild(sprite);
    const pill = new Graphics()
      .roundRect(-17, -11, 34, 20, 10)
      .fill(0xe8590c)
      .stroke({ color: 0xffffff, width: 2 });
    this.badgeText.anchor.set(0.5);
    this.badgeText.y = -1;
    this.badge.addChild(pill, this.badgeText);
    this.world.addChild(
      this.vehicle,
      this.badge,
      this.indicator,
      this.serviceBar,
    );
    const lost = (event: Event) => {
      event.preventDefault();
      this.contextLost = true;
      this.onContextLost();
    };
    const restored = () => {
      this.contextLost = false;
      this.lastFrameKey = '';
      this.onContextLost();
    };
    this.app.canvas.addEventListener('webglcontextlost', lost);
    this.app.canvas.addEventListener('webglcontextrestored', restored);
    this.cleanups.push(
      () => this.app.canvas.removeEventListener('webglcontextlost', lost),
      () =>
        this.app.canvas.removeEventListener('webglcontextrestored', restored),
    );
  }
  render(state: GameState): void {
    if (!this.ready || this.disposed || this.contextLost) return;
    const key = JSON.stringify([
      state.car,
      state.orders.map((o) => [o.onboard, o.delivered]),
    ]);
    if (key === this.lastFrameKey) return;
    this.lastFrameKey = key;
    const p = visualPose(this.map, this.level, state);
    this.vehicle.position.set(p.x, p.y);
    this.vehicle.rotation = p.angle;
    this.badge.position.set(p.x, p.y - 32);
    this.badgeText.text = `${cargoCount(state.orders)}/${VEHICLES[this.level.vehicle].capacity}`;
    const camera = cameraAt(p.x, p.y);
    this.world.position.set(-camera.x, -camera.y);
    this.indicator.clear();
    if (state.car.pending || state.car.queuedUturn) {
      this.indicator.position.set(p.x + 32, p.y - 32);
      this.indicator
        .circle(0, 0, 13)
        .fill(0xffd84d)
        .stroke({ color: 0xffffff, width: 2.5 });
      if (state.car.queuedUturn)
        this.indicator
          .moveTo(-4, 7)
          .lineTo(-4, -2)
          .quadraticCurveTo(-4, -8, 2, -8)
          .quadraticCurveTo(6, -8, 6, -2)
          .lineTo(6, 5)
          .moveTo(2, 2)
          .lineTo(6, 6)
          .lineTo(10, 2)
          .stroke({ color: 0x2d3440, width: 2.8 });
      else if (state.car.pending) {
        const angles = {
          up: 0,
          right: Math.PI / 2,
          down: Math.PI,
          left: -Math.PI / 2,
        };
        const angle = angles[state.car.pending],
          c = Math.cos(angle),
          s = Math.sin(angle);
        const point = (x: number, y: number) => ({
          x: x * c - y * s,
          y: x * s + y * c,
        });
        const u = point(0, 7),
          v = point(0, -7),
          l = point(-5, -2),
          r = point(5, -2);
        this.indicator
          .moveTo(u.x, u.y)
          .lineTo(v.x, v.y)
          .moveTo(l.x, l.y)
          .lineTo(v.x, v.y)
          .lineTo(r.x, r.y)
          .stroke({ color: 0x2d3440, width: 2.8 });
      }
    }
    this.serviceBar.clear();
    if (state.car.service) {
      const service = state.car.service;
      const total =
        service.kind === 'pickup'
          ? 120
          : service.kind === 'delivery'
            ? 90
            : VEHICLES[this.level.vehicle].uturnSeconds * 60;
      this.serviceBar.position.set(p.x, p.y + 30);
      this.serviceBar
        .roundRect(-30, -5, 60, 10, 5)
        .fill({ color: 0x141c26, alpha: 0.8 });
      this.serviceBar
        .roundRect(
          -28,
          -3,
          Math.max(0.01, 56 * (1 - service.ticksLeft / total)),
          6,
          3,
        )
        .fill(0x37c26b);
    }
    this.app.render();
  }
  destroy(): void {
    this.disposed = true;
    this.cleanups.forEach((cleanup) => cleanup());
    if (this.ready) this.app.destroy(true, { children: true });
    this.ready = false;
  }
}
