import type { GameState, ValidatedLevel } from '../core/model';
import { RoadMap } from '../core/map';
import { VEHICLES } from '../core/vehicle';
/** Visual bounds/markers from demo v1.5 imgDraw/chRect; not a second road graph. */
export const FIRST_SCENE = {
  width: 1950,
  height: 1250,
  image: '/assets/scenes/c1_man_01.webp',
  bounds: { x: -600, y: -250, width: 3150, height: 1750 },
  grid: { columns: 6, rows: 4 },
  pins: [
    { id: 'htx', x: 679, y: 494, labelX: 625, labelY: 562, color: 0x1c7ed6 },
    {
      id: 'cho-phien',
      x: 1046,
      y: 12,
      labelX: 975,
      labelY: 82,
      color: 0xe64980,
    },
    { id: 'xom-tren', x: 329, y: 16, labelX: 275, labelY: 80, color: 0x7048e8 },
  ],
} as const;

export function cameraAt(x: number, y: number) {
  return {
    x: Math.max(-210, Math.min(FIRST_SCENE.width - 844 + 250, x - 422)),
    y: Math.max(-150, Math.min(FIRST_SCENE.height - 390 + 90, y - 215)),
  };
}

/** Original carPose right-hand lane offset; does not change the road position in core. */
export function visualPose(
  map: RoadMap,
  level: ValidatedLevel,
  state: GameState,
) {
  const p = map.position(state.car.from, state.car.to, state.car.distance);
  const a = map.node(state.car.from),
    b = map.node(state.car.to);
  const dx = (b.x - a.x) / 350,
    dy = (b.y - a.y) / 350,
    offset = level.vehicle === 'truck' ? 13 : 11;
  const turn =
    state.car.service?.kind === 'uturn'
      ? 1 -
        state.car.service.ticksLeft /
          (VEHICLES[level.vehicle].uturnSeconds * 60)
      : 0;
  return {
    x: p.x - dy * offset + dy * 2 * offset * turn,
    y: p.y + dx * offset - dx * 2 * offset * turn,
    angle: Math.atan2(dy, dx) + Math.PI * turn,
  };
}
