import type { GameState, ValidatedLevel } from '../core/model';
import { RoadMap } from '../core/map';
import { cameraAt, FIRST_SCENE, visualPose } from '../rendering/scene';

const NS = 'http://www.w3.org/2000/svg';
function shape<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attributes: Record<string, string | number>,
  parent: SVGElement,
) {
  const node = document.createElementNS(NS, tag);
  Object.entries(attributes).forEach(([key, value]) =>
    node.setAttribute(key, String(value)),
  );
  parent.append(node);
  return node;
}
/** A view of the same level/snapshot; no movement or progression logic. */
export class Minimap {
  readonly element = document.createElementNS(NS, 'svg');
  private readonly car: SVGCircleElement;
  private readonly view: SVGRectElement;
  private readonly markers = new Map<
    string,
    {
      body: SVGElement;
      arrow: SVGElement;
      tick: SVGElement;
      ring: SVGElement;
      color: string;
    }
  >();
  private readonly map: RoadMap;
  constructor(private readonly level: ValidatedLevel) {
    this.map = new RoadMap(level);
    this.element.setAttribute('viewBox', '-20 -20 1990 1290');
    this.element.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    this.element.setAttribute('aria-hidden', 'true');
    shape(
      'rect',
      { x: -20, y: -20, width: 1990, height: 1290, fill: '#9ad877' },
      this.element,
    );
    const line = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      color: string,
      width: number,
    ) =>
      shape(
        'line',
        {
          x1,
          y1,
          x2,
          y2,
          stroke: color,
          'stroke-width': width,
          'stroke-linecap': 'square',
        },
        this.element,
      );
    for (let y = 0; y < 4; y++)
      for (let x = 0; x < 6; x++) {
        if (x < 5 && !this.map.road(`c${x}r${y}`, `c${x + 1}r${y}`))
          line(
            100 + x * 350,
            100 + y * 350,
            450 + x * 350,
            100 + y * 350,
            '#cdb48a',
            22,
          );
        if (y < 3 && !this.map.road(`c${x}r${y}`, `c${x}r${y + 1}`))
          line(
            100 + x * 350,
            100 + y * 350,
            100 + x * 350,
            450 + y * 350,
            '#cdb48a',
            22,
          );
      }
    const colors = {
      normal: '#4a4f57',
      highway: '#1f6feb',
      traffic: '#e8590c',
      rough: '#8d6e63',
      alley: '#b8bcc2',
    };
    level.roads.forEach((road) => {
      const a = this.map.node(road.a),
        b = this.map.node(road.b);
      line(
        a.x,
        a.y,
        b.x,
        b.y,
        colors[road.kind],
        road.kind === 'highway' ? 56 : road.kind === 'alley' ? 22 : 40,
      );
    });
    for (const place of level.places) {
      const p = this.map.position(place.a, place.b, place.fraction * 350),
        group = shape('g', {}, this.element);
      const color = `#${FIRST_SCENE.pins
        .find((pin) => pin.id === place.id)!
        .color.toString(16)
        .padStart(6, '0')}`;
      const ring = shape(
        'circle',
        {
          cx: p.x,
          cy: p.y,
          r: 108,
          fill: 'none',
          stroke: '#ffd43b',
          'stroke-width': 16,
          opacity: 0,
        },
        group,
      );
      const body =
        place.kind === 'warehouse'
          ? shape(
              'rect',
              {
                x: p.x - 74,
                y: p.y - 74,
                width: 148,
                height: 148,
                rx: 26,
                fill: color,
                stroke: '#fff',
                'stroke-width': 14,
              },
              group,
            )
          : shape(
              'circle',
              {
                cx: p.x,
                cy: p.y,
                r: 76,
                fill: color,
                stroke: '#fff',
                'stroke-width': 14,
              },
              group,
            );
      const sign = place.kind === 'warehouse' ? -1 : 1;
      const arrow = shape(
        'path',
        {
          d: `M${p.x} ${p.y - sign * 42} V${p.y + sign * 42} M${p.x - 35} ${p.y + sign * 7} L${p.x} ${p.y + sign * 42} L${p.x + 35} ${p.y + sign * 7}`,
          fill: 'none',
          stroke: '#fff',
          'stroke-width': 14,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        },
        group,
      );
      const tick = shape(
        'path',
        {
          d: `M${p.x - 34} ${p.y + 2} L${p.x - 8} ${p.y + 28} L${p.x + 36} ${p.y - 26}`,
          fill: 'none',
          stroke: '#fff',
          'stroke-width': 16,
          opacity: 0,
        },
        group,
      );
      const label = shape(
        'text',
        {
          x: p.x,
          y: p.y + (p.y < FIRST_SCENE.height / 2 ? 150 : -95),
          'text-anchor': 'middle',
          'font-size': 68,
          'font-weight': 900,
          'font-family': 'Nunito',
          fill: '#1d2733',
          stroke: '#fff',
          'stroke-width': 14,
          'paint-order': 'stroke',
        },
        this.element,
      );
      label.textContent = place.name;
      this.markers.set(place.id, { body, arrow, tick, ring, color });
    }
    this.view = shape(
      'rect',
      {
        width: 844,
        height: 390,
        fill: 'none',
        stroke: '#fff',
        'stroke-width': 10,
        'stroke-dasharray': '30 20',
        opacity: 0.9,
      },
      this.element,
    );
    this.car = shape(
      'circle',
      { r: 40, fill: '#fff', stroke: '#e8590c', 'stroke-width': 16 },
      this.element,
    );
  }
  render(state: GameState): void {
    const p = visualPose(this.map, this.level, state),
      camera = cameraAt(p.x, p.y);
    this.car.setAttribute('cx', String(p.x));
    this.car.setAttribute('cy', String(p.y));
    this.view.setAttribute('x', String(camera.x));
    this.view.setAttribute('y', String(camera.y));
    for (const place of this.level.places) {
      const marker = this.markers.get(place.id)!;
      const orders = state.orders.filter((o) =>
        place.kind === 'warehouse'
          ? o.source === place.id
          : o.destination === place.id,
      );
      const done =
        orders.length > 0 &&
        orders.every((o) =>
          place.kind === 'warehouse'
            ? o.picked === o.quantity
            : o.delivered === o.quantity,
        );
      marker.body.setAttribute('fill', done ? '#adb5bd' : marker.color);
      marker.arrow.setAttribute('opacity', done ? '0' : '1');
      marker.tick.setAttribute('opacity', done ? '1' : '0');
      marker.ring.setAttribute(
        'opacity',
        place.kind === 'delivery' && orders.some((o) => o.onboard > 0)
          ? '1'
          : '0',
      );
    }
  }
}
