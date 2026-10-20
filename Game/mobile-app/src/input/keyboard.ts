import type { Command, Direction, Phase } from '../core/model';
export function bindKeyboard(
  command: (command: Command) => void,
  phase: () => Phase,
): () => void {
  const directions: Record<string, Direction> = {
    ArrowUp: 'up',
    w: 'up',
    ArrowRight: 'right',
    d: 'right',
    ArrowDown: 'down',
    s: 'down',
    ArrowLeft: 'left',
    a: 'left',
  };
  const handler = (event: KeyboardEvent) => {
    if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
    const direction = directions[event.key];
    if (direction) {
      event.preventDefault();
      command({ type: 'direction', direction });
    } else if (event.key.toLowerCase() === 'u') {
      event.preventDefault();
      command({ type: 'uturn' });
    } else if (event.key === 'Escape') {
      event.preventDefault();
      command({ type: phase() === 'paused' ? 'resume' : 'pause' });
    }
  };
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}
