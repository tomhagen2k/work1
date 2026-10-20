import type {
  Command,
  GameState,
  OrderProgress,
  Place,
  TimeAccount,
  ValidatedLevel,
} from './model';
import { ROAD_LENGTH, TICKS_PER_SECOND } from './model';
import { RoadMap } from './map';
import { pickupQuantity } from './orders';
import { roadFactor, VEHICLES } from './vehicle';

/** One deterministic simulation. No clock, renderer, SDK or storage access. */
export class Game {
  readonly map: RoadMap;
  private readonly current: GameState;
  private resumePhase: GameState['phase'] = 'ready';
  constructor(
    readonly level: ValidatedLevel,
    account: TimeAccount = { timeItems: 0, giftGranted: false },
  ) {
    this.map = new RoadMap(level);
    this.current = {
      phase: 'ready',
      elapsedTicks: 0,
      extraSeconds: 0,
      extensions: 0,
      timeAccount: { ...account },
      orders: level.orders.map((o) => ({
        ...o,
        picked: 0,
        onboard: 0,
        delivered: 0,
      })),
      pickupPlace: null,
      reason: null,
      car: {
        ...level.start,
        waiting: false,
        pending: null,
        queuedUturn: false,
        skipPlace: null,
        service: null,
      },
    };
  }
  snapshot(): GameState {
    return structuredClone(this.current);
  }
  get phase(): GameState['phase'] {
    return this.current.phase;
  }
  command(command: Command): void {
    const s = this.current,
      c = s.car;
    if (command.type === 'pause') {
      if (['ready', 'playing', 'pickup', 'timeout'].includes(s.phase)) {
        this.resumePhase = s.phase;
        s.phase = 'paused';
      }
      return;
    }
    if (command.type === 'resume') {
      if (s.phase === 'paused') s.phase = this.resumePhase;
      return;
    }
    if (command.type === 'give-up') {
      if (s.phase === 'timeout') this.lose('Hết thời gian giao hàng.');
      return;
    }
    if (command.type === 'extend') {
      if (
        s.phase === 'timeout' &&
        s.extensions < 2 &&
        s.timeAccount.timeItems > 0
      ) {
        s.timeAccount.timeItems--;
        s.extensions++;
        s.extraSeconds += 30;
        s.phase = 'playing';
      }
      return;
    }
    if (
      s.phase === 'paused' ||
      s.phase === 'timeout' ||
      s.phase === 'won' ||
      s.phase === 'lost'
    )
      return;
    if (command.type === 'uturn') {
      if (s.phase === 'ready') {
        this.reverse();
        return;
      }
      if (
        s.phase === 'pickup' ||
        c.service?.kind === 'pickup' ||
        c.service?.kind === 'delivery'
      ) {
        c.queuedUturn = !c.queuedUturn;
        if (c.queuedUturn) c.pending = null;
      } else if (!c.service) this.beginUturn();
      return;
    }
    if (command.type === 'direction') {
      if (s.phase === 'ready') {
        if (command.direction === this.map.heading(c.from, c.to))
          s.phase = 'playing';
        return;
      }
      if (s.phase !== 'playing' || c.service?.kind === 'uturn') return;
      const target = this.map.options(c.from, c.to)[command.direction];
      if (!target) return;
      if (c.waiting) {
        c.from = c.to;
        c.to = target;
        c.distance = 0;
        c.waiting = false;
        c.pending = null;
      } else {
        c.pending = c.pending === command.direction ? null : command.direction;
        if (c.pending) c.queuedUturn = false;
      }
      return;
    }
    if (s.phase !== 'pickup') return;
    const place = this.level.places.find((p) => p.id === s.pickupPlace);
    if (!place) throw new Error('Pickup state has no place');
    if (command.type === 'skip') {
      s.phase = 'playing';
      this.leavePlace(place);
    }
    if (command.type === 'pickup') {
      const order = s.orders.find(
        (o) => o.id === command.orderId && o.source === place.id,
      );
      if (!order) return;
      const quantity = this.pickupQuantity(order);
      if (quantity > 0) {
        s.phase = 'playing';
        c.service = {
          kind: 'pickup',
          ticksLeft: 2 * TICKS_PER_SECOND,
          orderId: order.id,
          quantity,
        };
      }
    }
  }
  tick(): void {
    const s = this.current,
      c = s.car;
    if (s.phase !== 'playing') return;
    s.elapsedTicks++;
    if (c.service) {
      c.service.ticksLeft--;
      if (c.service.ticksLeft <= 0) this.finishService();
    } else if (!c.waiting) {
      const road = this.map.road(c.from, c.to);
      const factor = road && roadFactor(road.kind, this.level.vehicle);
      if (factor == null) throw new Error('Vehicle entered a forbidden road');
      c.distance +=
        (VEHICLES[this.level.vehicle].speed * factor) / TICKS_PER_SECOND;
      if (c.distance >= ROAD_LENGTH) {
        const options = this.map.options(c.from, c.to);
        const next =
          (c.pending && options[c.pending]) ||
          options[this.map.heading(c.from, c.to)];
        c.pending = null;
        if (next) {
          c.distance -= ROAD_LENGTH;
          c.from = c.to;
          c.to = next;
        } else {
          c.distance = ROAD_LENGTH;
          c.waiting = true;
        }
      }
      const place = this.map.placeAt(c.from, c.to, c.distance);
      if (c.skipPlace && c.skipPlace !== place?.id) c.skipPlace = null;
      if (place && c.skipPlace !== place.id) this.processPlace(place);
    }
    // Source demo checks completion before deadline/total timeout on the same tick.
    if (s.orders.every((o) => o.delivered >= o.quantity)) {
      s.phase = 'won';
      return;
    }
    const late = s.orders.find(
      (o) =>
        o.deadlineSeconds !== null &&
        s.elapsedTicks > o.deadlineSeconds * TICKS_PER_SECOND &&
        o.delivered < o.quantity,
    );
    if (late) {
      this.lose('Quá hạn một đơn hàng.');
      return;
    }
    const limitTicks =
      (this.level.timeLimitSeconds + s.extraSeconds) * TICKS_PER_SECOND;
    if (s.elapsedTicks >= limitTicks) {
      s.elapsedTicks = limitTicks;
      if (s.extensions >= 2) this.lose('Đã dùng hết hai lượt thêm giờ.');
      else {
        s.phase = 'timeout';
        if (!s.timeAccount.giftGranted) {
          s.timeAccount.giftGranted = true;
          s.timeAccount.timeItems++;
        }
      }
    }
  }
  private pickupQuantity(order: OrderProgress): number {
    return pickupQuantity(
      order,
      this.current.orders,
      VEHICLES[this.level.vehicle].capacity,
    );
  }
  private processPlace(place: Place): void {
    const s = this.current;
    if (s.orders.some((o) => o.destination === place.id && o.onboard > 0)) {
      s.car.service = {
        kind: 'delivery',
        ticksLeft: 1.5 * TICKS_PER_SECOND,
        placeId: place.id,
      };
      return;
    }
    if (
      s.orders.some((o) => o.source === place.id && this.pickupQuantity(o) > 0)
    ) {
      s.phase = 'pickup';
      s.pickupPlace = place.id;
      return;
    }
    this.leavePlace(place);
  }
  private leavePlace(place: Place): void {
    const s = this.current;
    s.pickupPlace = null;
    s.car.skipPlace = place.id;
    if (s.car.queuedUturn) {
      s.car.queuedUturn = false;
      this.beginUturn();
    }
  }
  private finishService(): void {
    const s = this.current,
      service = s.car.service;
    if (!service) return;
    s.car.service = null;
    if (service.kind === 'uturn') {
      this.reverse();
      s.car.waiting = false;
      s.car.pending = null;
      return;
    }
    let placeId: string;
    if (service.kind === 'pickup') {
      const order = s.orders.find((o) => o.id === service.orderId);
      if (!order) throw new Error('Service references unknown order');
      order.picked += service.quantity;
      order.onboard += service.quantity;
      placeId = order.source;
    } else {
      placeId = service.placeId;
      for (const order of s.orders)
        if (order.destination === placeId) {
          order.delivered += order.onboard;
          order.onboard = 0;
        }
    }
    const place = this.level.places.find((p) => p.id === placeId);
    if (!place) throw new Error('Service references unknown place');
    this.processPlace(place);
  }
  private reverse(): void {
    const c = this.current.car;
    [c.from, c.to] = [c.to, c.from];
    c.distance = ROAD_LENGTH - c.distance;
  }
  private beginUturn(): void {
    this.current.car.service = {
      kind: 'uturn',
      ticksLeft: VEHICLES[this.level.vehicle].uturnSeconds * TICKS_PER_SECOND,
    };
  }
  private lose(reason: string): void {
    this.current.phase = 'lost';
    this.current.reason = reason;
  }
}
