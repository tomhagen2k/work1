import type { GameState, ValidatedLevel } from '../core/model';
import { cargoCount, deliveredCount, pickupQuantity } from '../core/orders';
import { elapsedSeconds, remainingSeconds, starsFor } from '../core/timer';
import { VEHICLES } from '../core/vehicle';
import { RoadMap } from '../core/map';
import type { SaveService } from '../services/save-service';

const required = <T extends HTMLElement>(
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
  constructor(
    private readonly root: HTMLElement,
    private readonly level: ValidatedLevel,
    private readonly saves: SaveService,
  ) {
    this.map = new RoadMap(level);
    root.innerHTML = `
      <main class="game-shell" aria-label="Little Routes">
        <header class="topbar">
          <div class="brand"><span class="brand-mark" aria-hidden="true">↗</span><div><h1>Little Routes</h1><p>CHƯƠNG 01 · ĐƯỜNG LÀNG</p></div></div>
          <div class="hud"><span class="stat"><small>CÒN LẠI</small><strong id="clock">90s</strong></span><span class="stat"><small>TRÊN XE</small><strong id="cargo">0 / 3</strong></span><button class="icon-button" data-action="pause" aria-label="Tạm dừng">Ⅱ</button></div>
        </header>
        <div class="play-layout">
          <section class="map-area" aria-label="Màn chơi"><div id="map-host"></div><div class="map-caption"><span class="chapter-chip">01 / 01</span><div><h2 id="level-name"></h2><p id="message" role="status"></p></div></div><span class="map-legend">K Kho · 1 Chợ · 2 Xóm</span></section>
          <aside class="sidebar" aria-label="Đơn hàng và điều khiển">
            <div class="orders-heading"><h2>Chuyến giao hôm nay</h2><span id="delivered">0 / 3</span></div>
            <div id="orders"></div>
            <div class="driving"><div class="dpad" aria-label="Điều khiển xe">
              <button class="up" data-direction="up" aria-label="Đi lên">↑</button>
              <button class="left" data-direction="left" aria-label="Đi trái">←</button>
              <button class="uturn" data-action="uturn" aria-label="Quay đầu">↶</button>
              <button class="right" data-direction="right" aria-label="Đi phải">→</button>
              <button class="down" data-direction="down" aria-label="Đi xuống">↓</button>
            </div><p class="control-hint">Mũi tên / WASD · U quay đầu<br>Esc tạm dừng · Chọn sớm hướng rẽ</p></div>
          </aside>
        </div>
        <p id="save-warning" class="save-warning" role="alert" hidden></p>
        <div id="modal-layer" class="modal-layer" hidden><section class="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title"></section></div>
        <div id="orientation" class="orientation" hidden><strong>Xoay ngang để giao hàng</strong><p>Màn chơi đã tạm dừng. Xoay máy rồi nhấn Tiếp tục.</p></div>
      </main>`;
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
      label.textContent = `${order.destination === 'cho-phien' ? '1' : '2'} · ${this.placeName(order.destination)}`;
      const progress = document.createElement('span');
      card.append(label, progress);
      orderList.append(card);
      this.orderElements.set(order.id, progress);
    }
  }
  render(state: GameState): void {
    const vehicle = VEHICLES[this.level.vehicle],
      left = remainingSeconds(state, this.level.timeLimitSeconds);
    setText(this.clock, `${Math.ceil(left)}s`);
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
    required(this.root, '.play-layout').inert = open;
    required<HTMLButtonElement>(this.root, '[data-action="pause"]').disabled =
      open;
    if (!open) return;
    const dialog = required(this.modal, '.dialog');
    dialog.replaceChildren();
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
      button(
        state.car.queuedUturn
          ? '✓ Đã hẹn quay đầu khi rời kho'
          : 'Quay đầu khi rời kho',
        'uturn',
        true,
      );
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
