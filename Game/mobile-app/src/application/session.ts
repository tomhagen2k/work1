import { Game } from '../core/game';
import type { Command, GameState, ValidatedLevel } from '../core/model';
import { elapsedSeconds, starsFor } from '../core/timer';
import { SaveService } from '../services/save-service';

export class Session {
  private game: Game;
  private accountKey = '';
  private recordedWin = false;
  constructor(
    readonly level: ValidatedLevel,
    readonly saves: SaveService,
  ) {
    this.game = new Game(level, saves.snapshot().account);
    this.accountKey = JSON.stringify(this.game.snapshot().timeAccount);
  }
  snapshot(): GameState {
    return this.game.snapshot();
  }
  command(command: Command): void {
    this.game.command(command);
    this.persistChanges();
  }
  tick(): void {
    if (this.game.phase === 'playing') {
      this.game.tick();
      this.persistChanges();
    }
  }
  restart(): void {
    this.game = new Game(this.level, this.game.snapshot().timeAccount);
    this.recordedWin = false;
  }
  private persistChanges(): void {
    const state = this.game.snapshot(),
      key = JSON.stringify(state.timeAccount);
    const newWin = state.phase === 'won' && !this.recordedWin;
    if (key === this.accountKey && !newWin) return;
    this.saves.update(
      state.timeAccount,
      this.level.id,
      newWin
        ? {
            seconds: elapsedSeconds(state),
            stars: starsFor(
              elapsedSeconds(state),
              this.level.timeLimitSeconds,
              state.extensions,
            ),
          }
        : null,
    );
    this.accountKey = key;
    this.recordedWin ||= newWin;
  }
}
