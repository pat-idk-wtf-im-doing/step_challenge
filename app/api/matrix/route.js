import { sql } from '@vercel/postgres';
import { challengeDays, MEMBERS } from '@/lib/challenge';
import { pointsForDay, dayMultiplier } from '@/lib/scoring';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { rows } = await sql`
    select
      u.name as user_name,
      t.name as team_name,
      to_char(ds.day, 'YYYY-MM-DD') as day,
      ds.steps
    from users u
    join teams t on t.id = u.team_id
    left join daily_steps ds on ds.user_id = u.id
  `;

  const stepsByUser = new Map();
  const teamByUser = new Map();
  for (const row of rows) {
    teamByUser.set(row.user_name, row.team_name);
    if (!stepsByUser.has(row.user_name)) stepsByUser.set(row.user_name, new Map());
    if (row.day !== null && row.steps !== null) {
      stepsByUser.get(row.user_name).set(row.day, row.steps);
    }
  }

  const days = challengeDays().map((date) => {
    const d = new Date(`${date}T00:00:00Z`);
    return {
      date,
      label: d.toLocaleDateString('en-US', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        timeZone: 'UTC',
      }),
      multiplier: dayMultiplier(date),
    };
  });

  const users = MEMBERS.map((name) => {
    const daySteps = stepsByUser.get(name) ?? new Map();
    let totalSteps = 0;
    let totalPoints = 0;

    const cells = days.map(({ date }) => {
      const steps = daySteps.has(date) ? daySteps.get(date) : null;
      if (steps === null) return { date, steps: null, points: null };
      const points = pointsForDay(steps, date);
      totalSteps += steps;
      totalPoints += points;
      return { date, steps, points };
    });

    return { name, team: teamByUser.get(name) ?? null, cells, totalSteps, totalPoints };
  });

  return Response.json({ days, users });
}
