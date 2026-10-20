export type Direction = 'up' | 'right' | 'down' | 'left';
export type VehicleKind = 'van' | 'motorbike' | 'truck';
export type RoadKind = 'normal' | 'highway' | 'traffic' | 'rough' | 'alley';
export interface MapNode {
  id: string;
  x: number;
  y: number;
}
export interface Road {
  id: string;
  a: string;
  b: string;
  kind: RoadKind;
}
export interface Place {
  id: string;
  name: string;
  a: string;
  b: string;
  fraction: number;
  kind: 'warehouse' | 'delivery';
}
export interface Order {
  id: string;
  source: string;
  destination: string;
  quantity: number;
  deadlineSeconds: number | null;
}
export interface Level {
  schemaVersion: 1;
  contentVersion: 1;
  id: string;
  name: string;
  timeLimitSeconds: number;
  vehicle: VehicleKind;
  nodes: MapNode[];
  roads: Road[];
  places: Place[];
  orders: Order[];
  start: { from: string; to: string; distance: number };
}
declare const validated: unique symbol;
export type ValidatedLevel = Level & { readonly [validated]: true };
export interface TimeAccount {
  timeItems: number;
  giftGranted: boolean;
}
export interface OrderProgress extends Order {
  picked: number;
  onboard: number;
  delivered: number;
}
export type Phase =
  'ready' | 'playing' | 'pickup' | 'paused' | 'timeout' | 'won' | 'lost';
export type Service =
  | { kind: 'pickup'; ticksLeft: number; orderId: string; quantity: number }
  | { kind: 'delivery'; ticksLeft: number; placeId: string }
  | { kind: 'uturn'; ticksLeft: number };
export interface GameState {
  phase: Phase;
  elapsedTicks: number;
  extraSeconds: number;
  extensions: number;
  timeAccount: TimeAccount;
  orders: OrderProgress[];
  pickupPlace: string | null;
  reason: string | null;
  car: {
    from: string;
    to: string;
    distance: number;
    waiting: boolean;
    pending: Direction | null;
    queuedUturn: boolean;
    skipPlace: string | null;
    service: Service | null;
  };
}
export type Command =
  | { type: 'direction'; direction: Direction }
  | { type: 'pickup'; orderId: string }
  | { type: 'uturn' | 'skip' | 'pause' | 'resume' | 'extend' | 'give-up' };
export const TICKS_PER_SECOND = 60;
export const ROAD_LENGTH = 350;
export const ZONE_HALF = 90;
