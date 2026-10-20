// Original demo v1.5 SVG paths. Presentation only; no legacy gameplay runtime.
const svg = (body: string) =>
  `<svg class="ic" viewBox="0 0 28 28" aria-hidden="true">${body}</svg>`;
export const ICONS = {
  arrow: svg('<path d="M14 23 V6 M7 12 L14 5 L21 12"/>'),
  pause: svg('<path d="M10 7 V21 M18 7 V21"/>'),
  clock: svg(
    '<circle cx="14" cy="15" r="9"/><path d="M14 10 V15 L17 17 M11 3 H17"/>',
  ),
  box: svg(
    '<path d="M4 9 L14 4 L24 9 V20 L14 25 L4 20Z M4 9 L14 14 L24 9 M14 14 V25"/>',
  ),
  pickup: svg(
    '<path d="M4 12 L14 7 L24 12 V22 H4Z M14 19 V12 M10 15 L14 11 L18 15"/>',
  ),
  uturn: svg('<path d="M9 24 V11 a5 5 0 0 1 10 0 V18 M15 15 L19 19 L23 15"/>'),
  missions: svg(
    '<rect x="6" y="5" width="16" height="19" rx="3"/><path d="M11 5 V3 H17 V5 M10 11 H18 M10 15 H18 M10 19 H15"/>',
  ),
  help: svg(
    '<path d="M10 10.5 a4 4 0 1 1 5.6 3.7 c-1.2 .6 -1.6 1.3 -1.6 2.6 V18"/><circle cx="14" cy="22.3" r=".6" fill="currentColor"/>',
  ),
  resume: svg('<path d="M10 7 L21 14 L10 21Z" fill="currentColor"/>'),
  restart: svg('<path d="M6 14 a8 8 0 1 0 2.5-5.8 M6 5 V9 H10"/>'),
  map: svg(
    '<path d="M3 6 L10 4 L18 6 L25 4 V22 L18 24 L10 22 L3 24Z M10 4 V22 M18 6 V24"/>',
  ),
  close: svg('<path d="M8 8 L20 20 M20 8 L8 20"/>'),
};
