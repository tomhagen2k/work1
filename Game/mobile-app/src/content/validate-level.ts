import Ajv from 'ajv';
import type { Level, ValidatedLevel } from '../core/model';
import { ROAD_LENGTH, ZONE_HALF } from '../core/model';
import { RoadMap } from '../core/map';

const id = { type: 'string', pattern: '^[a-z][a-z0-9-]{0,63}$' };
const object = (properties: Record<string, unknown>) => ({
  type: 'object',
  properties,
  required: Object.keys(properties),
  additionalProperties: false,
});
const array = (items: unknown, maxItems: number) => ({
  type: 'array',
  items,
  minItems: 1,
  maxItems,
});
const schema = object({
  schemaVersion: { const: 1, type: 'integer' },
  contentVersion: { const: 1, type: 'integer' },
  id,
  name: { type: 'string', minLength: 1, maxLength: 80 },
  timeLimitSeconds: { type: 'integer', minimum: 1, maximum: 3600 },
  vehicle: { type: 'string', enum: ['van', 'motorbike', 'truck'] },
  start: object({
    from: id,
    to: id,
    distance: { type: 'number', minimum: 0, exclusiveMaximum: ROAD_LENGTH },
  }),
  nodes: array(
    object({
      id,
      x: { type: 'number', minimum: 0, maximum: 10000 },
      y: { type: 'number', minimum: 0, maximum: 10000 },
    }),
    500,
  ),
  roads: array(
    object({
      id,
      a: id,
      b: id,
      kind: {
        type: 'string',
        enum: ['normal', 'highway', 'traffic', 'rough', 'alley'],
      },
    }),
    1000,
  ),
  places: array(
    object({
      id,
      name: { type: 'string', minLength: 1, maxLength: 80 },
      a: id,
      b: id,
      fraction: {
        type: 'number',
        minimum: ZONE_HALF / ROAD_LENGTH,
        maximum: 1 - ZONE_HALF / ROAD_LENGTH,
      },
      kind: { type: 'string', enum: ['warehouse', 'delivery'] },
    }),
    100,
  ),
  orders: array(
    object({
      id,
      source: id,
      destination: id,
      quantity: { type: 'integer', minimum: 1, maximum: 99 },
      deadlineSeconds: {
        type: ['number', 'null'],
        exclusiveMinimum: 0,
        maximum: 3600,
      },
    }),
    100,
  ),
});
const check = new Ajv({ strict: true, allErrors: true }).compile<Level>(schema);

/** Structural AND semantic checks; no coercion, defaults or mutation of input. */
export function validateLevel(value: unknown): ValidatedLevel {
  if (!check(value))
    throw new Error(`Level schema: ${new Ajv().errorsText(check.errors)}`);
  const fail = (message: string): never => {
    throw new Error(`Level ${value.id}: ${message}`);
  };
  for (const list of [value.nodes, value.roads, value.places, value.orders]) {
    if (new Set(list.map((item) => item.id)).size !== list.length)
      fail('duplicate IDs');
  }
  const map = new RoadMap(value),
    edges = new Set<string>(),
    coordinates = new Set<string>();
  for (const node of value.nodes) {
    const coordinate = `${node.x},${node.y}`;
    if (coordinates.has(coordinate)) fail('overlapping nodes');
    coordinates.add(coordinate);
  }
  for (const road of value.roads) {
    const a = map.node(road.a),
      b = map.node(road.b);
    if (!(
      (a.x === b.x && Math.abs(a.y - b.y) === ROAD_LENGTH) ||
      (a.y === b.y && Math.abs(a.x - b.x) === ROAD_LENGTH)
    ))
      fail('road must connect adjacent grid nodes');
    const key = [road.a, road.b].sort().join(':');
    if (edges.has(key)) fail('duplicate undirected road');
    edges.add(key);
  }
  if (!map.canTravel(value.start.from, value.start.to))
    fail('invalid or forbidden start edge');
  const reached = new Set([value.start.from]);
  const pending = [value.start.from];
  while (pending.length) {
    const current = pending.pop();
    if (!current) break;
    for (const road of value.roads) {
      const next =
        road.a === current ? road.b : road.b === current ? road.a : null;
      if (next && !reached.has(next) && map.canTravel(current, next)) {
        reached.add(next);
        pending.push(next);
      }
    }
  }
  const placeEdges = new Map<string, { start: number; end: number }[]>();
  for (const place of value.places) {
    if (!map.canTravel(place.a, place.b) || !reached.has(place.a))
      fail('unreachable place');
    const forward = place.a < place.b;
    const key = [place.a, place.b].sort().join(':');
    const center =
      (forward ? place.fraction : 1 - place.fraction) * ROAD_LENGTH;
    const range = { start: center - ZONE_HALF, end: center + ZONE_HALF };
    const others = placeEdges.get(key) ?? [];
    if (others.some((r) => range.start <= r.end && range.end >= r.start))
      fail('overlapping service zones');
    placeEdges.set(key, [...others, range]);
  }
  for (const order of value.orders) {
    if (
      order.source === order.destination ||
      !value.places.some((p) => p.id === order.source) ||
      !value.places.some((p) => p.id === order.destination)
    )
      fail('invalid order references');
    if (
      order.deadlineSeconds !== null &&
      order.deadlineSeconds > value.timeLimitSeconds
    )
      fail('deadline exceeds original time limit');
  }
  // Return a detached, recursively frozen graph so content cannot change under a session.
  const copy = structuredClone(value);
  const freeze = (item: unknown): void => {
    if (item !== null && typeof item === 'object') {
      Object.values(item).forEach(freeze);
      Object.freeze(item);
    }
  };
  freeze(copy);
  return copy as ValidatedLevel;
}
