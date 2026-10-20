import c1l1 from './c1-l1.json';
import { validateLevel } from './validate-level';
export function loadFirstLevel() {
  return validateLevel(c1l1);
}
