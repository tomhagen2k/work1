import { describe, expect, it } from 'vitest';
import { Game } from '../../src/core/game';
import { loadFirstLevel } from '../../src/content/load-level';
import { cargoCount } from '../../src/core/orders';
import { starsFor } from '../../src/core/timer';
import { roadFactor } from '../../src/core/vehicle';
import { validateLevel } from '../../src/content/validate-level';

import {
  advance,
  until,
  loadCargo,
  completeFirstLevel,
} from '../support/drive-first-level';

describe('demo C1L1 simulation', () => {
  it('starts only with the current heading, then stops and freezes time to choose cargo', () => {
    const game = new Game(loadFirstLevel());
    advance(game, 10);
    game.command({ type: 'direction', direction: 'up' });
    advance(game, 10);
    expect(game.snapshot().elapsedTicks).toBe(0);
    game.command({ type: 'direction', direction: 'right' });
    until(game, () => game.snapshot().phase === 'pickup');
    const tick = game.snapshot().elapsedTicks;
    advance(game, 20);
    expect(game.snapshot().elapsedTicks).toBe(tick);
    expect(game.snapshot().car.distance).toBeGreaterThanOrEqual(85);
  });
  it('takes real service time, respects capacity, and cannot pick an unrelated order', () => {
    const game = new Game(loadFirstLevel());
    game.command({ type: 'direction', direction: 'right' });
    until(game, () => game.snapshot().phase === 'pickup');
    game.command({ type: 'pickup', orderId: 'nonexistent' });
    expect(game.snapshot().phase).toBe('pickup');
    game.command({ type: 'pickup', orderId: 'c1-l1-cho' });
    advance(game, 119 / 60);
    expect(cargoCount(game.snapshot().orders)).toBe(0);
    game.tick();
    expect(cargoCount(game.snapshot().orders)).toBe(2);
    game.command({ type: 'pickup', orderId: 'c1-l1-xom' });
    advance(game, 2);
    expect(cargoCount(game.snapshot().orders)).toBe(3);
    expect(game.snapshot().phase).toBe('playing');
  });
  it('wins by driving, picking up and delivering all three parcels; snapshots do not mutate the simulation', () => {
    const game = new Game(loadFirstLevel());
    const snapshot = game.snapshot();
    snapshot.car.distance = 300;
    expect(game.snapshot().car.distance).toBe(40);
    completeFirstLevel(game);
    expect(game.snapshot().orders.map((o) => o.delivered)).toEqual([2, 1]);
    expect(cargoCount(game.snapshot().orders)).toBe(0);
    expect(game.snapshot().elapsedTicks / 60).toBeLessThan(40);
    const end = game.snapshot();
    advance(game, 20);
    expect(game.snapshot()).toEqual(end);
  });
  it('buffers, replaces and toggles a turn; waits at a junction without a valid continuation', () => {
    const game = new Game(loadFirstLevel());
    game.command({ type: 'direction', direction: 'right' });
    game.command({ type: 'direction', direction: 'up' });
    expect(game.snapshot().car.pending).toBe('up');
    game.command({ type: 'direction', direction: 'down' });
    expect(game.snapshot().car.pending).toBe('down');
    game.command({ type: 'direction', direction: 'down' });
    expect(game.snapshot().car.pending).toBeNull();
    game.command({ type: 'direction', direction: 'up' });
    until(game, () => game.snapshot().car.waiting);
    expect(game.snapshot().car.to).toBe('c1r0');
    const before = game.snapshot().car.distance;
    advance(game, 1);
    expect(game.snapshot().car.distance).toBe(before);
    game.command({ type: 'direction', direction: 'right' });
    expect(game.snapshot().car.to).toBe('c2r0');
  });
  it('queues U-turn while picking up, charges turn time and preserves position', () => {
    const game = new Game(loadFirstLevel());
    game.command({ type: 'direction', direction: 'right' });
    until(game, () => game.snapshot().phase === 'pickup');
    game.command({ type: 'uturn' });
    game.command({ type: 'pickup', orderId: 'c1-l1-cho' });
    advance(game, 2);
    expect(game.snapshot().car.queuedUturn).toBe(true);
    game.command({ type: 'skip' });
    const pos = game.map.position(
      game.snapshot().car.from,
      game.snapshot().car.to,
      game.snapshot().car.distance,
    );
    advance(game, 1.5);
    expect(game.snapshot().car.from).toBe('c2r1');
    expect(
      game.map.position(
        game.snapshot().car.from,
        game.snapshot().car.to,
        game.snapshot().car.distance,
      ),
    ).toEqual(pos);
  });
  it('pauses service and time, resumes the exact pickup state, and restart is clean', () => {
    const game = new Game(loadFirstLevel());
    loadCargo(game);
    game.command({ type: 'uturn' });
    advance(game, 0.5);
    game.command({ type: 'pause' });
    const paused = game.snapshot();
    advance(game, 10);
    expect(game.snapshot()).toEqual(paused);
    game.command({ type: 'resume' });
    advance(game, 1);
    expect(game.snapshot().car.service).toBeNull();
    const fresh = new Game(
      loadFirstLevel(),
      game.snapshot().timeAccount,
    ).snapshot();
    expect(fresh.elapsedTicks).toBe(0);
    expect(fresh.orders.map((o) => o.delivered)).toEqual([0, 0]);
  });
  it('grants the first timeout gift once, caps extensions at two, then loses', () => {
    const game = new Game(loadFirstLevel(), {
      timeItems: 1,
      giftGranted: false,
    });
    game.command({ type: 'direction', direction: 'right' });
    game.command({ type: 'direction', direction: 'down' });
    advance(game, 90);
    expect(game.snapshot().phase).toBe('timeout');
    expect(game.snapshot().timeAccount.timeItems).toBe(2);
    game.command({ type: 'extend' });
    advance(game, 30);
    expect(game.snapshot().phase).toBe('timeout');
    game.command({ type: 'extend' });
    advance(game, 30);
    expect(game.snapshot().phase).toBe('lost');
    expect(game.snapshot().extensions).toBe(2);
    game.command({ type: 'extend' });
    expect(game.snapshot().extraSeconds).toBe(60);
    const fresh = new Game(loadFirstLevel(), game.snapshot().timeAccount);
    fresh.command({ type: 'direction', direction: 'right' });
    fresh.command({ type: 'direction', direction: 'down' });
    advance(fresh, 90);
    expect(fresh.snapshot().timeAccount.timeItems).toBe(0);
    fresh.command({ type: 'give-up' });
    expect(fresh.snapshot().phase).toBe('lost');
  });
  it('matches the demo speed factors, road restrictions and star thresholds', () => {
    expect(roadFactor('alley', 'van')).toBeNull();
    expect(roadFactor('alley', 'truck')).toBeNull();
    expect(roadFactor('alley', 'motorbike')).toBe(0.9);
    expect(roadFactor('traffic', 'van')).toBe(0.45);
    expect(roadFactor('highway', 'truck')).toBe(1.5);
    expect([
      starsFor(81, 90, 0),
      starsFor(85.5, 90, 0),
      starsFor(80, 90, 0),
      starsFor(30, 90, 1),
    ]).toEqual([2, 1, 3, 1]);
  });
  it('picks only free capacity, never overfills a smaller vehicle, and does not deliver goods never picked', () => {
    const value = structuredClone(loadFirstLevel());
    value.vehicle = 'motorbike';
    const game = new Game(validateLevel(value));
    game.command({ type: 'direction', direction: 'right' });
    until(game, () => game.snapshot().phase === 'pickup');
    game.command({ type: 'pickup', orderId: 'c1-l1-cho' });
    advance(game, 2);
    expect(cargoCount(game.snapshot().orders)).toBe(1);
    expect(game.snapshot().orders[0]?.picked).toBe(1);
    expect(game.snapshot().phase).toBe('playing');
    game.command({ type: 'direction', direction: 'up' });
    until(game, () => game.snapshot().car.from === 'c2r1');
    game.command({ type: 'direction', direction: 'right' });
    until(game, () => game.snapshot().orders[0]?.delivered === 1);
    expect(game.snapshot().orders[1]?.delivered).toBe(0);
    expect(game.snapshot().phase).toBe('playing');
  });
  it('fails an order deadline immediately, even when total time remains', () => {
    const value = structuredClone(loadFirstLevel());
    value.orders[0]!.deadlineSeconds = 1;
    const game = new Game(validateLevel(value));
    game.command({ type: 'direction', direction: 'right' });
    advance(game, 1);
    expect(game.snapshot().phase).toBe('playing');
    game.tick();
    expect(game.snapshot().phase).toBe('lost');
    expect(game.snapshot().reason).toContain('Quá hạn');
    expect(game.snapshot().elapsedTicks).toBe(61);
  });
  it('does not deliver before 1.5 seconds of service, and prioritizes completion over a deadline on the same tick', () => {
    const reference = new Game(loadFirstLevel());
    completeFirstLevel(reference);
    const finishTick = reference.snapshot().elapsedTicks;
    const value = structuredClone(loadFirstLevel());
    value.orders[1]!.deadlineSeconds = finishTick / 60;
    const game = new Game(validateLevel(value));
    loadCargo(game);
    game.command({ type: 'direction', direction: 'up' });
    until(game, () => game.snapshot().car.from === 'c2r1');
    game.command({ type: 'direction', direction: 'right' });
    until(game, () => game.snapshot().car.service?.kind === 'delivery');
    advance(game, 89 / 60);
    expect(game.snapshot().orders[0]?.delivered).toBe(0);
    game.tick();
    expect(game.snapshot().orders[0]?.delivered).toBe(2);
    game.command({ type: 'uturn' });
    until(
      game,
      () => game.snapshot().phase === 'won' || game.snapshot().phase === 'lost',
    );
    expect(game.snapshot().phase).toBe('won');
    expect(game.snapshot().elapsedTicks).toBe(finishTick);
  });
});
