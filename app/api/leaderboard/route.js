import { sql } from '@vercel/postgres';
import { pointsForDay } from '@/lib/scoring';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { rows } = await sql`
    select
      t.name as team_name,
      u.name as user_name,
      to_char(ds.day, 'YYYY-MM-DD') as day,
      ds.steps
    from users u
    join teams t on t.id = u.team_id
    left join daily_steps ds on ds.user_id = u.id
    order by t.name, u.name, ds.day
  `;

  const teams = new Map();

  for (const row of rows) {
    if (!teams.has(row.team_name)) {
      teams.set(row.team_name, { team: row.team_name, points: 0, members: new Map() });
    }
    const team = teams.get(row.team_name);

    if (!team.members.has(row.user_name)) {
      team.members.set(row.user_name, { name: row.user_name, points: 0, days: 0 });
    }
    const member = team.members.get(row.user_name);

    if (row.day !== null && row.steps !== null) {
      const pts = pointsForDay(row.steps, row.day);
      member.points += pts;
      member.days += 1;
      team.points += pts;
    }
  }

  const standings = [...teams.values()]
    .map((team) => ({
      team: team.team,
      points: team.points,
      members: [...team.members.values()].sort((a, b) => b.points - a.points),
    }))
    .sort((a, b) => b.points - a.points);

  return Response.json({ standings });
}
