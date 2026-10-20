import './ui/style.css';
import { loadFirstLevel } from './content/load-level';
import { Session } from './application/session';
import { FixedClock } from './application/fixed-clock';
import { SaveService } from './services/save-service';
import { createPlatformStorage } from './services/platform-storage';
import { MapRenderer } from './rendering/map-renderer';
import { GameUI } from './ui/game-ui';
import { bindKeyboard } from './input/keyboard';
import { bindTouchControls } from './input/touch';
import type { Command } from './core/model';

async function boot(): Promise<() => void> {
  const root = document.querySelector<HTMLElement>('#app');
  if (!root) throw new Error('Missing application root');
  const level = loadFirstLevel(),
    session = new Session(
      level,
      new SaveService(await createPlatformStorage()),
    );
  const clock = new FixedClock();
  let frameId = 0,
    destroyed = false;
  const portrait = () => window.innerHeight > window.innerWidth;
  const command = (command: Command) => {
    if (portrait() && command.type !== 'pause') return;
    const before = session.snapshot().phase;
    session.command(command);
    if (before !== session.snapshot().phase) clock.reset();
    ui.render(session.snapshot());
  };
  const ui = new GameUI(root, level, session.saves, (open) =>
    command({ type: open ? 'pause' : 'resume' }),
  );
  const unsubscribeSave = session.saves.onChange(() =>
    ui.render(session.snapshot()),
  );
  const unbindTouch = bindTouchControls(root, command, () => {
    session.restart();
    clock.reset();
    ui.render(session.snapshot());
  });
  const pause = () => {
    command({ type: 'pause' });
  };
  const renderer = new MapRenderer(ui.mapHost, level, pause);
  const visibility = () => {
    if (document.hidden) pause();
    clock.reset();
  };
  const orientation = () => {
    ui.orientation(portrait());
    if (portrait()) pause();
    clock.reset();
  };
  const unbind = bindKeyboard(command, () => session.snapshot().phase);
  const pageHide = () => pause();
  const destroy = () => {
    if (destroyed) return;
    destroyed = true;
    cancelAnimationFrame(frameId);
    unbind();
    unbindTouch();
    unsubscribeSave();
    ui.destroy();
    renderer.destroy();
    document.removeEventListener('visibilitychange', visibility);
    window.removeEventListener('resize', orientation);
    window.removeEventListener('pagehide', pageHide);
  };
  try {
    await renderer.init();
  } catch (error) {
    destroy();
    throw error;
  }
  document.addEventListener('visibilitychange', visibility);
  window.addEventListener('resize', orientation);
  window.addEventListener('pagehide', pageHide);
  orientation();
  ui.render(session.snapshot());
  const frame = (now: number) => {
    if (destroyed) return;
    if (document.hidden) clock.reset();
    else clock.frame(now, () => session.tick());
    const state = session.snapshot();
    renderer.render(state);
    ui.render(state);
    frameId = requestAnimationFrame(frame);
  };
  frameId = requestAnimationFrame(frame);
  return destroy;
}
let cleanup: (() => void) | undefined;
let disposed = false;
void boot()
  .then((dispose) => {
    if (disposed) dispose();
    else cleanup = dispose;
  })
  .catch((error) => {
    console.error('Little Routes could not start', error);
    const root = document.querySelector('#app');
    if (root) {
      root.replaceChildren();
      const message = document.createElement('p');
      message.className = 'fatal-error';
      message.setAttribute('role', 'alert');
      message.textContent =
        'Không mở được màn chơi. Kiểm tra WebGL và tải lại trang. Chi tiết có trong console.';
      root.append(message);
    }
  });
if (import.meta.hot)
  import.meta.hot.dispose(() => {
    disposed = true;
    cleanup?.();
  });
