import { sql } from '@vercel/postgres';
import { MEMBERS } from '@/lib/challenge';
import { pointsForDay } from '@/lib/scoring';
import { roastFor } from '@/lib/banter';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { rows } = await sql`
    select u.name as name, t.name as team,
           to_char(ds.day, 'YYYY-MM-DD') as day, ds.steps
    from daily_steps ds
    join users u on u.id = ds.user_id
    join teams t on t.id = u.team_id
    order by ds.created_at desc, ds.id desc
  `;

  if (rows.length === 0) {
    return Response.json({
      items: [{ emoji: '🦗', text: 'Nothing logged yet. Be the first… or be forgotten 💀' }],
    });
  }

  const items = [];

  // Most recent entry's day drives the MVP + shame board.
  const latestDay = rows[0].day;
  const latest = rows.filter((r) => r.day === latestDay);

  // 👑 MVP of the latest day
  const mvp = latest.reduce(
    (b, r) => (pointsForDay(r.steps, r.day) > pointsForDay(b.steps, b.day) ? r : b),
    latest[0]
  );
  items.push({
    emoji: '👑',
    text: `${mvp.name} bodied everyone on ${latestDay} — ${mvp.steps.toLocaleString()} steps, ${pointsForDay(mvp.steps, mvp.day)} pts. Bow down 🙇`,
  });

  // 🐌 Shame board for the latest day
  const logged = new Set(latest.map((r) => r.name));
  const slackers = MEMBERS.filter((m) => !logged.has(m));
  items.push(
    slackers.length
      ? { emoji: '🐌', text: `MIA on ${latestDay}: ${slackers.join(', ')}. The leaderboard remembers 👀` }
      : { emoji: '✅', text: `Everyone logged ${latestDay}. Look at this productive little family 🥹` }
  );

  // 🥊 Closest rivalry by total points
  const totals = new Map();
  for (const r of rows) {
    totals.set(r.name, (totals.get(r.name) || 0) + pointsForDay(r.steps, r.day));
  }
  const ranked = [...totals.entries()].sort((a, b) => b[1] - a[1]);
  let gap = Infinity;
  let pair = null;
  for (let i = 0; i < ranked.length - 1; i++) {
    const g = ranked[i][1] - ranked[i + 1][1];
    if (g < gap) {
      gap = g;
      pair = [ranked[i][0], ranked[i + 1][0]];
    }
  }
  if (pair) {
    items.push({
      emoji: '🥊',
      text: `${pair[1]} is just ${gap} pt${gap === 1 ? '' : 's'} behind ${pair[0]}. One big day and it’s a bloodbath 🩸`,
    });
  }

  // 🗣️ Freshest roasts, newest first
  for (const r of rows.slice(0, 8)) {
    items.push({ emoji: '🗣️', text: roastFor(r.name, r.steps, r.day) });
  }

  return Response.json({ items });
}
