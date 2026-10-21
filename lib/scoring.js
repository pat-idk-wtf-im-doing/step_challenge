import { DOUBLE_DAYS, GRAND_FINAL } from './challenge.js';

export function basePoints(steps) {
  if (steps >= 20000) return 3;
  if (steps >= 15000) return 2;
  if (steps >= 10000) return 1;
  return 0;
}

// isoDate is a 'YYYY-MM-DD' string.
export function pointsForDay(steps, isoDate) {
  const base = basePoints(steps);
  if (isoDate === GRAND_FINAL) return base * 3;
  if (DOUBLE_DAYS.has(isoDate)) return base * 2;
  return base;
}

// Point multiplier for a given day: 3 (finale), 2 (Monday), or 1 (normal).
export function dayMultiplier(isoDate) {
  if (isoDate === GRAND_FINAL) return 3;
  if (DOUBLE_DAYS.has(isoDate)) return 2;
  return 1;
}
