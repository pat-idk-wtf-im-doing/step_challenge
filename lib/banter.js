import { basePoints } from './scoring.js';

const ROASTS = {
  0: [
    '🛋️ {name} mustered a sad {steps} steps on {day}. The couch misses you already.',
    '🐌 {steps} steps?? {name}, snails are filing a formal complaint. ({day})',
    '💤 {name} logged {steps} steps on {day}. Walked to the fridge and called it cardio.',
  ],
  1: [
    '🙂 {name} clocked {steps} steps on {day}. Acceptable. Barely. 👏',
    '🚶 {name} did {steps} steps on {day} — the bare-minimum monarch 👑',
    '👍 {steps} steps for {name} ({day}). Not bad, not great, very you.',
  ],
  2: [
    '🔥 {name} racked up {steps} steps on {day}! Someone’s feeling spicy 🌶️',
    '😤 {steps} steps from {name} on {day}. The grind is REAL 💪',
    '🏃 {name} put up {steps} steps ({day}). Legs = officially concerned 🦵',
  ],
  3: [
    '🚀 {name} went NUCLEAR with {steps} steps on {day}! Touch grass… oh wait, you did 🌱',
    '👑 {steps} STEPS?! {name} is not human ({day}) 🤖',
    '🫠 {name} melted the pavement with {steps} steps on {day}. Jelly legs incoming 🍮',
  ],
};

const fill = (tpl, v) => tpl.replace(/\{(\w+)\}/g, (_, k) => v[k]);
const seedOf = (s) => [...s].reduce((a, c) => a + c.charCodeAt(0), 0);

export function roastFor(name, steps, day) {
  const pool = ROASTS[basePoints(steps)];
  const pick = pool[seedOf(`${name}${day}${steps}`) % pool.length];
  return fill(pick, { name, day, steps: steps.toLocaleString() });
}
