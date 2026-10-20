import type { OrderProgress } from './model';
export const cargoCount = (orders: readonly OrderProgress[]): number =>
  orders.reduce((n, o) => n + o.onboard, 0);
export const deliveredCount = (orders: readonly OrderProgress[]): number =>
  orders.reduce((n, o) => n + o.delivered, 0);
export function pickupQuantity(
  order: OrderProgress,
  orders: readonly OrderProgress[],
  capacity: number,
): number {
  return Math.max(
    0,
    Math.min(order.quantity - order.picked, capacity - cargoCount(orders)),
  );
}
