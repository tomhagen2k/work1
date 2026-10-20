import type { Direction, Level, MapNode, Place, Road } from './model';
import { ROAD_LENGTH, ZONE_HALF } from './model';
import { roadFactor } from './vehicle';

export class RoadMap {
  private readonly nodes: Map<string, MapNode>;
  constructor(readonly level: Level) {
    this.nodes = new Map(level.nodes.map((n) => [n.id, n]));
  }
  node(id: string): MapNode {
    const node = this.nodes.get(id);
    if (!node) throw new Error(`Unknown node: ${id}`);
    return node;
  }
  road(a: string, b: string): Road | undefined {
    return this.level.roads.find(
      (e) => (e.a === a && e.b === b) || (e.a === b && e.b === a),
    );
  }
  canTravel(a: string, b: string): boolean {
    const road = this.road(a, b);
    return !!road && roadFactor(road.kind, this.level.vehicle) !== null;
  }
  heading(from: string, to: string): Direction {
    const a = this.node(from),
      b = this.node(to);
    return a.x === b.x
      ? b.y > a.y
        ? 'down'
        : 'up'
      : b.x > a.x
        ? 'right'
        : 'left';
  }
  options(from: string, to: string): Partial<Record<Direction, string>> {
    const result: Partial<Record<Direction, string>> = {};
    for (const road of this.level.roads) {
      const next = road.a === to ? road.b : road.b === to ? road.a : null;
      if (next && next !== from && this.canTravel(to, next))
        result[this.heading(to, next)] = next;
    }
    return result;
  }
  placeAt(from: string, to: string, distance: number): Place | undefined {
    return this.level.places.find((p) => {
      const d =
        p.a === from && p.b === to
          ? distance
          : p.a === to && p.b === from
            ? ROAD_LENGTH - distance
            : null;
      return d !== null && Math.abs(d - p.fraction * ROAD_LENGTH) <= ZONE_HALF;
    });
  }
  position(
    from: string,
    to: string,
    distance: number,
  ): { x: number; y: number } {
    const a = this.node(from),
      b = this.node(to),
      t = distance / ROAD_LENGTH;
    return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
  }
}
