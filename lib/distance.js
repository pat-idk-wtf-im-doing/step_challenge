// Average stride ≈ 0.762 m per step.
const METERS_PER_STEP = 0.762;

export function stepsToKm(steps) {
  return (steps * METERS_PER_STEP) / 1000;
}

// Largest fun comparison the distance clears, scaled up.
const REFS = [
  { km: 384400, each: 'trips to the Moon 🌙🚀' },
  { km: 40075, each: 'laps around the Earth 🌍' },
  { km: 4313, each: 'crossings of the USA 🦅🇺🇸' },
  { km: 1200, each: 'lengths of Italy 🍝' },
  { km: 42.195, each: 'marathons 🏃💨' },
  { km: 8.848, each: 'climbs up Mount Everest 🏔️' },
  { km: 1.609, each: 'miles 🚶' },
];

export function funDistance(steps) {
  const km = stepsToKm(steps);
  for (const r of REFS) {
    const n = km / r.km;
    if (n >= 1) {
      const rounded = n >= 10 ? Math.round(n) : n.toFixed(1);
      return `${km.toFixed(1)} km ≈ ${rounded} ${r.each}`;
    }
  }
  return `${km.toFixed(2)} km so far — baby steps 🐣`;
}
