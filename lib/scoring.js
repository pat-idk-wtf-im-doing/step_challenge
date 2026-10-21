import { SCORING_TIERS, DOUBLE_DAYS, GRAND_FINAL } from './challenge.js';

const TIERS_DESC = [...SCORING_TIERS].sort((a, b) => b.minSteps - a.minSteps);

export function basePoints(steps) {
  for (const tier of TIERS_DESC) {
    if (steps >= tier.minSteps) return tier.points;
  }
  return 0;
}

// Display rows (ascending) with readable step ranges; multiplier scales the points.
export function scoringRows(multiplier = 1) {
  const asc = [...SCORING_TIERS].sort((a, b) => a.minSteps - b.minSteps);
  return asc.map((tier, i) => {
    const next = asc[i + 1];
    let label;
    if (!next) {
      label = `${tier.minSteps.toLocaleString()}+`;
    } else if (tier.minSteps === 0) {
      label = `Under ${next.minSteps.toLocaleString()}`;
    } else {
      label = `${tier.minSteps.toLocaleString()} – ${(next.minSteps - 1).toLocaleString()}`;
    }
    return { label, points: tier.points * multiplier };
  });
}

// Smallest step count that earns any points.
export function minScoringSteps() {
  const scoring = SCORING_TIERS.filter((t) => t.points > 0).map((t) => t.minSteps);
  return scoring.length ? Math.min(...scoring) : 0;
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
