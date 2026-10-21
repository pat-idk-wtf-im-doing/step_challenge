import { sql } from '@vercel/postgres';
import { isWithinChallenge, START, END } from '@/lib/challenge';

export async function POST(request) {
  const { name, day, steps } = await request.json();

  const stepCount = Number(steps);
  if (!Number.isInteger(stepCount) || stepCount < 0) {
    return Response.json({ error: 'Steps must be a whole number ≥ 0.' }, { status: 400 });
  }

  if (!isWithinChallenge(day)) {
    return Response.json(
      { error: `Date must be between ${START} and ${END}.` },
      { status: 400 }
    );
  }

  const { rows } = await sql`select id from users where name = ${name}`;
  if (rows.length === 0) {
    return Response.json({ error: 'Unknown participant.' }, { status: 400 });
  }
  const userId = rows[0].id;

  await sql`
    insert into daily_steps (user_id, day, steps)
    values (${userId}, ${day}, ${stepCount})
    on conflict (user_id, day) do update set steps = excluded.steps
  `;

  return Response.json({ ok: true });
}
