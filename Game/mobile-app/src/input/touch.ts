import type { Command, Direction } from '../core/model';

/** Native button clicks also support touch, pointer and assistive activation. No gameplay state here. */
export function bindTouchControls(
  root: HTMLElement,
  command: (command: Command) => void,
  restart: () => void,
): () => void {
  const directions: readonly string[] = ['up', 'right', 'down', 'left'];
  const handler = (event: MouseEvent) => {
    const button =
      event.target instanceof Element
        ? event.target.closest<HTMLButtonElement>('button')
        : null;
    if (!button || button.disabled) return;
    const direction = button.dataset.direction;
    if (direction && directions.includes(direction))
      command({ type: 'direction', direction: direction as Direction });
    const action = button.dataset.action;
    if (action === 'restart') restart();
    else if (action === 'pickup' && button.dataset.order)
      command({ type: 'pickup', orderId: button.dataset.order });
    else if (
      action === 'pause' ||
      action === 'resume' ||
      action === 'skip' ||
      action === 'uturn' ||
      action === 'extend' ||
      action === 'give-up'
    )
      command({ type: action });
  };
  root.addEventListener('click', handler);
  return () => root.removeEventListener('click', handler);
}
