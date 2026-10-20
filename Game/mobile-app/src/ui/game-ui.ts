import type { GameState, ValidatedLevel } from '../core/model';
import { cargoCount, deliveredCount, pickupQuantity } from '../core/orders';
import { elapsedSeconds, remainingSeconds, starsFor } from '../core/timer';
import { VEHICLES } from '../core/vehicle';
import { RoadMap } from '../core/map';
import type { SaveService } from '../services/save-service';
import { ICONS } from './demo-icons';
import { Minimap } from './minimap';

const required = <T extends Element = HTMLElement>(
  root: ParentNode,
  selector: string,
): T => {
  const element = root.querySelector<T>(selector);
  if (!element) throw new Error(`Missing UI element: ${selector}`);
  return element;
};
const setText = (element: HTMLElement, value: string) => {
  if (element.textContent !== value) element.textContent = value;
};
const DIRECTION_NAMES = {
  up: 'Lên',
  right: 'Phải',
  down: 'Xuống',
  left: 'Trái',
};
export class GameUI {
  readonly mapHost: HTMLElement;
  private readonly modal: HTMLElement;
  private readonly clock: HTMLElement;
  private readonly cargo: HTMLElement;
  private readonly delivered: HTMLElement;
  private readonly message: HTMLElement;
  private readonly warning: HTMLElement;
  private modalKey = '';
  private previousPhase = '';
  private readonly map: RoadMap;
  private readonly orderElements = new Map<string, HTMLElement>();
  private readonly minimap: Minimap;
  private readonly resizeObserver: ResizeObserver;
  private panel: 'missions' | 'help' | 'map' | null = null;
  private readonly panelClick: (event: MouseEvent) => void;
  constructor(
    private readonly root: HTMLElement,
    private readonly level: ValidatedLevel,
    private readonly saves: SaveService,
    onPanel: (open: boolean) => void,
  ) {
    this.map = new RoadMap(level);
    root.innerHTML = `
      <main class="game-shell" aria-label="Little Routes"><div class="stage-viewport"><div class="game-stage">
        <h1 class="sr-only">Little Routes</h1><h2 class="sr-only" id="level-name"></h2>
        <div class="play-layout"><section class="map-area" aria-label="Màn chơi"><div id="map-host"></div></section>
          <div class="hud-top"><div class="clock-chip">${ICONS.clock}<span id="clock">1:30</span></div>
            <button class="rbtn top-button" data-panel="missions" aria-label="Nhiệm vụ">${ICONS.missions}</button>
            <button class="rbtn top-button" data-panel="help" aria-label="Hướng dẫn">${ICONS.help}<i class="new-badge">!</i></button></div>
          <div id="orders" aria-label="Tiến độ đơn hàng"></div>
          <button class="rbtn pause-button icon-button" data-action="pause" aria-label="Tạm dừng"><span class="pause-face">${ICONS.pause}</span></button>
          <button id="minimap" data-panel="map" aria-label="Bản đồ"></button>
          <div class="dpad" aria-label="Điều khiển xe">
            <button class="rbtn up" data-direction="up" aria-label="Đi lên">${ICONS.arrow}</button>
            <button class="rbtn left" data-direction="left" aria-label="Đi trái">${ICONS.arrow}</button>
            <button class="rbtn right" data-direction="right" aria-label="Đi phải">${ICONS.arrow}</button>
            <button class="rbtn down" data-direction="down" aria-label="Đi xuống">${ICONS.arrow}</button>
          </div>
          <button class="rbtn uturn icon-button" data-action="uturn" aria-label="Quay đầu"><span>${ICONS.uturn}<small>QUAY ĐẦU</small></span></button>
          <div id="go-hint"><span class="hint-arrow">${ICONS.arrow}</span><span>Nhấn để xe chạy<small>Đồng hồ chưa chạy</small></span></div>
          <p id="message" class="sr-only" role="status"></p><span id="cargo" class="sr-only"></span><span id="delivered" class="sr-only"></span>
        </div>
        <p id="save-warning" class="save-warning" role="alert" hidden></p>
        <div id="modal-layer" class="modal-layer" hidden><section class="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title"></section></div>
        <div id="orientation" class="orientation" hidden><strong>Xoay ngang để giao hàng</strong><p>Màn chơi đã tạm dừng. Xoay máy rồi nhấn Tiếp tục.</p></div>
      </div></div></main>`;
    this.mapHost = required(root, '#map-host');
    this.modal = required(root, '#modal-layer');
    this.clock = required(root, '#clock');
    this.cargo = required(root, '#cargo');
    this.delivered = required(root, '#delivered');
    this.message = required(root, '#message');
    this.warning = required(root, '#save-warning');
    required(root, '#level-name').textContent = level.name;
    const orderList = required(root, '#orders');
    for (const order of level.orders) {
      const card = document.createElement('article');
      card.className = 'order-card';
      card.dataset.order = order.id;
      const label = document.createElement('strong');
      label.className = 'order-count';
      label.innerHTML = `${ICONS.box}<span class="count"></span>`;
      const ring = document.createElement('div');
      ring.className = 'order-ring';
      ring.innerHTML =
        '<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="22" fill="rgba(20,28,38,.85)" stroke="rgba(255,255,255,.25)" stroke-width="4"/><circle class="progress" cx="25" cy="25" r="22" fill="none" stroke-width="4" stroke-linecap="round"/></svg>';
      const progress = document.createElement('span');
      progress.className = 'sr-only';
      card.append(ring, label, progress);
      orderList.append(card);
      this.orderElements.set(order.id, progress);
    }
    this.minimap = new Minimap(level);
    required(root, '#minimap').append(this.minimap.element);
    this.panelClick = (event) => {
      const button =
        event.target instanceof Element
          ? event.target.closest<HTMLButtonElement>(
              '[data-panel],[data-panel-close]',
            )
          : null;
      if (!button) return;
      if (button.hasAttribute('data-panel-close')) {
        this.panel = null;
        onPanel(false);
        return;
      }
      const panel = button.dataset.panel;
      if (panel === 'map' || panel === 'missions' || panel === 'help') {
        this.panel = panel;
        onPanel(true);
      }
    };
    root.addEventListener('click', this.panelClick);
    this.resizeObserver = new ResizeObserver(() => {
      const bounds = required(root, '.stage-viewport').getBoundingClientRect();
      root.style.setProperty(
        '--stage-scale',
        String(Math.min(bounds.width / 844, bounds.height / 390)),
      );
    });
    this.resizeObserver.observe(required(root, '.stage-viewport'));
  }
  destroy(): void {
    this.resizeObserver.disconnect();
    this.root.removeEventListener('click', this.panelClick);
  }
  render(state: GameState): void {
    const vehicle = VEHICLES[this.level.vehicle],
      left = remainingSeconds(state, this.level.timeLimitSeconds);
    const seconds = Math.ceil(left);
    setText(
      this.clock,
      `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`,
    );
    required(this.root, '#go-hint').hidden = state.phase !== 'ready';
    for (const button of this.root.querySelectorAll<HTMLButtonElement>(
      '[data-direction]',
    )) {
      button.classList.toggle(
        'go',
        state.phase === 'ready' &&
          button.dataset.direction ===
            this.map.heading(state.car.from, state.car.to),
      );
      button.classList.toggle(
        'selected',
        state.car.pending === button.dataset.direction,
      );
    }
    this.minimap.render(state);
    this.clock.classList.toggle('urgent', left <= 10);
    setText(this.cargo, `${cargoCount(state.orders)} / ${vehicle.capacity}`);
    setText(
      this.delivered,
      `${deliveredCount(state.orders)} / ${state.orders.reduce((n, o) => n + o.quantity, 0)}`,
    );
    this.root.dataset.phase = state.phase;
    this.root.dataset.from = state.car.from;
    this.root.dataset.to = state.car.to;
    this.root.dataset.distance = state.car.distance.toFixed(2);
    this.root.dataset.elapsedTicks = String(state.elapsedTicks);
    this.root.dataset.saveStatus = this.saves.saving
      ? 'pending'
      : this.saves.warning
        ? 'unavailable'
        : 'saved';
    for (const order of state.orders) {
      const label = this.orderElements.get(order.id);
      if (label) {
        setText(
          label,
          order.delivered === order.quantity
            ? `Đã giao ${order.delivered} kiện ✓`
            : `${order.delivered}/${order.quantity} đã giao · ${order.onboard} trên xe`,
        );
        label.parentElement?.classList.toggle(
          'complete',
          order.delivered === order.quantity,
        );
        const card = label.parentElement!;
        setText(
          required(card, '.count'),
          `${order.delivered}/${order.quantity}`,
        );
        card.classList.toggle('carrying', order.onboard > 0);
        const color = order.destination === 'cho-phien' ? '#e64980' : '#7048e8';
        const ring = required<SVGCircleElement>(card, '.progress');
        ring.setAttribute('stroke', color);
        ring.setAttribute(
          'stroke-dasharray',
          `${(2 * Math.PI * 22 * order.delivered) / order.quantity} ${2 * Math.PI * 22}`,
        );
      }
    }
    let message = 'Xe tự chạy · Chọn hướng ở giao lộ';
    if (state.phase === 'ready')
      message = `Bấm ${DIRECTION_NAMES[this.map.heading(state.car.from, state.car.to)]} để xuất phát · Lấy hàng ở K`;
    else if (state.car.service)
      message =
        state.car.service.kind === 'pickup'
          ? 'Đang lấy hàng · 2 giây'
          : state.car.service.kind === 'delivery'
            ? 'Đang giao hàng · 1,5 giây'
            : 'Đang quay đầu · 1,5 giây';
    else if (state.car.waiting)
      message = 'Đang chờ tại giao lộ · Chọn hướng hoặc quay đầu';
    else if (state.car.pending)
      message = `Đã chọn ${DIRECTION_NAMES[state.car.pending]} ở giao lộ kế tiếp · Bấm lại để hủy`;
    setText(this.message, message);
    required(this.root, '[data-action="uturn"]').classList.toggle(
      'selected',
      state.car.queuedUturn,
    );
    this.warning.hidden = !this.saves.warning;
    setText(this.warning, this.saves.warning ?? '');
    const key = JSON.stringify([
      this.panel,
      state.phase,
      state.pickupPlace,
      state.orders.map((o) => [o.picked, o.delivered]),
      state.car.queuedUturn,
      state.extensions,
      state.timeAccount,
      this.saves.snapshot().best[this.level.id],
      this.saves.saving,
      this.saves.warning,
    ]);
    if (key !== this.modalKey) {
      this.modalKey = key;
      this.renderModal(state);
    }
    this.previousPhase = state.phase;
  }
  orientation(portrait: boolean): void {
    required(this.root, '#orientation').hidden = !portrait;
  }
  private placeName(id: string): string {
    return this.level.places.find((p) => p.id === id)?.name ?? id;
  }
  private renderModal(state: GameState): void {
    const open = ['pickup', 'paused', 'timeout', 'won', 'lost'].includes(
      state.phase,
    );
    this.modal.hidden = !open;
    if (state.phase !== 'paused') this.panel = null;
    required(this.root, '.play-layout').inert =
      open && state.phase !== 'pickup';
    this.modal.classList.toggle('pickup-layer', state.phase === 'pickup');
    required<HTMLButtonElement>(this.root, '[data-action="pause"]').disabled =
      open;
    if (!open) return;
    const dialog = required(this.modal, '.dialog');
    dialog.replaceChildren();
    if (state.phase === 'paused' && this.panel) {
      const title = document.createElement('h2');
      title.id = 'dialog-title';
      title.textContent =
        this.panel === 'map'
          ? 'Bản đồ'
          : this.panel === 'missions'
            ? 'Nhiệm vụ'
            : 'Cách chơi';
      const body = document.createElement('div');
      body.className = 'info-content';
      if (this.panel === 'map')
        body.append(this.minimap.element.cloneNode(true));
      else if (this.panel === 'missions')
        for (const order of state.orders) {
          const row = document.createElement('p');
          row.textContent = `${this.placeName(order.source)} → ${this.placeName(order.destination)} · ${order.delivered}/${order.quantity} kiện`;
          body.append(row);
        }
      else
        body.textContent =
          'Lấy hàng ở kho, giao đúng điểm trước khi hết giờ. Xe tự chạy; chọn sớm hướng ở giao lộ. Bấm Quay đầu để đổi hướng hoặc hẹn quay đầu khi đang lấy/giao hàng.';
      const close = document.createElement('button');
      close.className = 'button secondary';
      close.textContent = 'Đóng';
      close.dataset.panelClose = '';
      dialog.append(title, body, close);
      return;
    }
    const heading = document.createElement('h2');
    heading.id = 'dialog-title';
    const text = document.createElement('p');
    text.className = 'dialog-copy';
    const actions = document.createElement('div');
    actions.className = 'dialog-actions';
    const button = (label: string, action: string, secondary = false) => {
      const item = document.createElement('button');
      item.textContent = label;
      item.dataset.action = action;
      item.className = secondary ? 'button secondary' : 'button primary';
      actions.append(item);
      return item;
    };
    if (state.phase === 'pickup') {
      heading.textContent = this.placeName(state.pickupPlace ?? '');
      text.textContent =
        'Thời gian đang dừng. Chọn hàng để lấy; xe tự chạy tiếp khi xong.';
      for (const order of state.orders.filter(
        (o) => o.source === state.pickupPlace,
      )) {
        const quantity = pickupQuantity(
          order,
          state.orders,
          VEHICLES[this.level.vehicle].capacity,
        );
        const item = button(
          quantity
            ? `Lấy ${quantity} kiện · ${this.placeName(order.destination)}`
            : `Đã lấy hết · ${this.placeName(order.destination)}`,
          'pickup',
        );
        item.dataset.order = order.id;
        item.disabled = quantity === 0;
      }
      button('Đi tiếp', 'skip', true);
    } else if (state.phase === 'paused') {
      heading.textContent = 'Nghỉ một chút';
      text.textContent = 'Đồng hồ và xe đã dừng. Tiếp tục khi bạn sẵn sàng.';
      button('Tiếp tục', 'resume');
      button('Chơi lại từ đầu', 'restart', true);
    } else if (state.phase === 'timeout') {
      heading.textContent = 'Hết thời gian';
      text.textContent = `Còn hàng chưa giao. Thêm giờ đã dùng ${state.extensions}/2 · còn ${state.timeAccount.timeItems} vật phẩm. Quà lần đầu: 1 vật phẩm +30 giây.`;
      if (state.extensions < 2 && state.timeAccount.timeItems > 0)
        button('Dùng +30 giây', 'extend');
      button('Chơi lại', 'restart', true);
      button('Chịu thua', 'give-up', true);
    } else {
      const won = state.phase === 'won';
      heading.textContent = won
        ? 'Giao hàng xong rồi!'
        : 'Chuyến giao chưa hoàn tất';
      const stars = starsFor(
        elapsedSeconds(state),
        this.level.timeLimitSeconds,
        state.extensions,
      );
      const best = this.saves.snapshot().best[this.level.id];
      text.textContent = won
        ? `${'★'.repeat(stars)} · Đã giao đủ 3 kiện trong ${elapsedSeconds(state).toFixed(1)} giây.${best ? ` Kỷ lục: ${best.seconds.toFixed(1)} giây.` : ''}`
        : (state.reason ?? 'Thử một lộ trình khác nhé.');
      button('Chơi lại', 'restart');
    }
    if (
      this.saves.saving &&
      (state.phase === 'won' || state.phase === 'timeout')
    ) {
      const pending = document.createElement('p');
      pending.textContent = 'Đang lưu trên thiết bị…';
      actions.querySelectorAll('button').forEach((item) => {
        item.disabled = true;
      });
      actions.append(pending);
    }
    dialog.append(heading, text, actions);
    if (state.phase !== this.previousPhase)
      actions
        .querySelector<HTMLButtonElement>('button:not(:disabled)')
        ?.focus({ preventScroll: true });
  }
}
