import type { Game } from '../../src/core/game';
type Simulation = Pick<Game, 'tick' | 'snapshot' | 'command'>;
export const advance = (game: Simulation, seconds: number) => {
  for (let i = 0; i < seconds * 60; i++) game.tick();
};
export const until = (
  game: Simulation,
  condition: () => boolean,
  maxTicks = 6000,
) => {
  for (let n = 0; n < maxTicks; n++) {
    if (condition()) return;
    game.tick();
  }
  throw new Error(`Condition not reached: ${JSON.stringify(game.snapshot())}`);
};
export function loadCargo(game: Simulation) {
  game.command({ type: 'direction', direction: 'right' });
  until(game, () => game.snapshot().phase === 'pickup');
  game.command({ type: 'pickup', orderId: 'c1-l1-cho' });
  advance(game, 2);
  game.command({ type: 'pickup', orderId: 'c1-l1-xom' });
  advance(game, 2);
}
export function completeFirstLevel(game: Simulation) {
  loadCargo(game);
  game.command({ type: 'direction', direction: 'up' });
  until(
    game,
    () =>
      game.snapshot().car.from === 'c2r1' && game.snapshot().car.to === 'c2r0',
  );
  game.command({ type: 'direction', direction: 'right' });
  until(game, () => game.snapshot().orders[0]?.delivered === 2);
  game.command({ type: 'uturn' });
  until(
    game,
    () =>
      game.snapshot().car.from === 'c3r0' &&
      game.snapshot().car.to === 'c2r0' &&
      !game.snapshot().car.service,
  );
  until(game, () => game.snapshot().phase === 'won');
}
