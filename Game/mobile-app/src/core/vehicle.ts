import type { RoadKind, VehicleKind } from './model';

export const VEHICLES = {
  van: { speed: 90, capacity: 3, uturnSeconds: 1.5, name: 'Xe van' },
  motorbike: { speed: 130, capacity: 1, uturnSeconds: 1, name: 'Xe máy' },
  truck: { speed: 65, capacity: 6, uturnSeconds: 2.5, name: 'Xe tải' },
} as const;
const FACTORS: Record<RoadKind, Record<VehicleKind, number | null>> = {
  normal: { van: 1, motorbike: 1, truck: 1 },
  highway: { van: 1.5, motorbike: 1.5, truck: 1.5 },
  traffic: { van: 0.45, motorbike: 0.8, truck: 0.35 },
  rough: { van: 0.7, motorbike: 0.5, truck: 0.6 },
  alley: { van: null, motorbike: 0.9, truck: null },
};
export function roadFactor(
  road: RoadKind,
  vehicle: VehicleKind,
): number | null {
  return FACTORS[road][vehicle];
}
