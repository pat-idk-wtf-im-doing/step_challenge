// Single source of truth for challenge dates, scoring windows, and teams.
export const YEAR = 2026;
export const START = `${YEAR}-10-30`;
export const END = `${YEAR}-11-29`;

// Real 2026 Mondays inside the window (Nov 30 falls after the finale, so excluded).
export const DOUBLE_DAYS = new Set([
  `${YEAR}-11-02`,
  `${YEAR}-11-09`,
  `${YEAR}-11-16`,
  `${YEAR}-11-23`,
]);

// Grand final: Sunday Nov 29, triple points.
export const GRAND_FINAL = `${YEAR}-11-29`;

// Group rest days: entries blocked, zero points, greyed out in the matrix.
export const REST_DAYS = new Set([
  `${YEAR}-11-13`,
  `${YEAR}-11-14`,
]);

// Step thresholds and the points they earn. Edit here to change scoring.
// List descending by minSteps; the 0 tier is the floor.
export const SCORING_TIERS = [
  { minSteps: 20000, points: 3 },
  { minSteps: 15000, points: 2 },
  { minSteps: 10000, points: 1 },
  { minSteps: 0, points: 0 },
];

export const TEAMS = {
  'Team A': ['Patrick', 'Scott', 'Chow'],
  'Team B': ['Jess', 'Big Lisa', 'Lina'],
  'Team C': ['Little Lisa', 'Annie', 'Wes'],
};

export const MEMBERS = Object.values(TEAMS).flat();

// Head crops from the group photo; regenerate with scripts/crop-heads.py.
export const AVATARS = {
  Patrick: '/heads/patrick.png',
  Scott: '/heads/scott.png',
  Chow: '/heads/chow.png',
  Jess: '/heads/jess.png',
  'Big Lisa': '/heads/big-lisa.png',
  Lina: '/heads/lina.png',
  'Little Lisa': '/heads/little-lisa.png',
  Annie: '/heads/annie.png',
  Wes: '/heads/wes.png',
};

export function isWithinChallenge(isoDate) {
  return isoDate >= START && isoDate <= END;
}

// Every 'YYYY-MM-DD' date from START through END inclusive.
export function challengeDays() {
  const days = [];
  const cursor = new Date(`${START}T00:00:00Z`);
  const end = new Date(`${END}T00:00:00Z`);
  while (cursor <= end) {
    days.push(cursor.toISOString().slice(0, 10));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return days;
}

// Challenge days strictly after todayIso ('YYYY-MM-DD').
export function remainingDays(todayIso) {
  return challengeDays().filter((d) => d > todayIso);
}

// e.g. "Nov 13 and Nov 14"
export function restDaysLabel() {
  const dates = [...REST_DAYS].sort().map((d) =>
    new Date(`${d}T00:00:00Z`).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    })
  );
  return new Intl.ListFormat('en', { type: 'conjunction' }).format(dates);
}
