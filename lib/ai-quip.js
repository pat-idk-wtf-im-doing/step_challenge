import { basePoints } from './scoring.js';

// Style guide per point tier, also used as the fallback when Gemini is unavailable.
const EXAMPLES = {
  0: 'TF WALK MORE YOU LAZY SLOB!!',
  1: 'you arite??',
  2: 'ooo you walking lots',
  3: 'OOF those legs must be jelly',
};

export async function quipFor(name, steps, day) {
  const fallback = EXAMPLES[basePoints(steps)];

  if (!process.env.GEMINI_API_KEY) return fallback;

  try {
    const res = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text:
                    `Write ONE short, funny trash-talk line (max 12 words, emojis ok) for a team steps challenge. ` +
                    `${name} logged ${steps.toLocaleString()} steps on ${day}. ` +
                    `Match this vibe: "${fallback}". Reply with ONLY the line, no quotes.`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!res.ok) return fallback;

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    return text || fallback;
  } catch {
    return fallback;
  }
}
