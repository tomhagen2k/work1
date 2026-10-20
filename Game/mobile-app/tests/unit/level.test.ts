import { describe, expect, it } from 'vitest';
import first from '../../src/content/c1-l1.json';
import { validateLevel } from '../../src/content/validate-level';
describe('versioned level schema and semantics', () => {
  it('validates the real C1L1 region and preserves its source constants', () => {
    const level = validateLevel(first);
    expect(level.nodes).toHaveLength(12);
    expect(level.roads).toHaveLength(17);
    expect(level.orders.map((o) => o.quantity)).toEqual([2, 1]);
    expect(level.timeLimitSeconds).toBe(90);
    expect(level.start.distance).toBe(40);
    expect(Object.isFrozen(level.orders[0])).toBe(true);
  });
  it.each([
    [
      'schema version',
      (v: typeof first) => {
        v.schemaVersion = 2;
      },
    ],
    [
      'unknown reference',
      (v: typeof first) => {
        v.start.from = 'missing';
      },
    ],
    [
      'duplicate ID',
      (v: typeof first) => {
        v.nodes.push({ ...v.nodes[0]! });
      },
    ],
    [
      'invalid quantity',
      (v: typeof first) => {
        v.orders[0]!.quantity = -1;
      },
    ],
    [
      'disconnected destination',
      (v: typeof first) => {
        v.roads = v.roads.filter((r) => r.a !== 'c3r0' && r.b !== 'c3r0');
      },
    ],
    [
      'unknown road type',
      (v: typeof first) => {
        v.roads[0]!.kind = 'teleport';
      },
    ],
    [
      'overlapping zones',
      (v: typeof first) => {
        v.places.push({ ...v.places[0]!, id: 'duplicate-zone' });
      },
    ],
    [
      'invalid destination',
      (v: typeof first) => {
        v.orders[0]!.destination = 'missing';
      },
    ],
  ])('rejects %s', (_name, mutate) => {
    const value = structuredClone(first);
    mutate(value);
    expect(() => validateLevel(value)).toThrow();
  });
});
