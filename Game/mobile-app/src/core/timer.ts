import { TICKS_PER_SECOND } from './model';
import type { GameState } from './model';
export const elapsedSeconds = (state: GameState): number =>
  state.elapsedTicks / TICKS_PER_SECOND;
export const remainingSeconds = (state: GameState, limit: number): number =>
  Math.max(0, limit + state.extraSeconds - elapsedSeconds(state));
export function starsFor(
  seconds: number,
  limit: number,
  extensions: number,
): number {
  if (extensions > 0) return 1;
  const fraction = (limit - seconds) / limit;
  return fraction <= 0.05 ? 1 : fraction <= 0.1 ? 2 : 3;
}
