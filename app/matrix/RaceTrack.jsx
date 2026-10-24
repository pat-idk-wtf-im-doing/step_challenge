'use client';

import { useEffect, useMemo, useState } from 'react';
import { TEAMS, AVATARS } from '@/lib/challenge';

const MEDALS = ['🥇', '🥈', '🥉'];

export default function RaceTrack({ data }) {
  const { series, lastIdx, scaleMax } = useMemo(() => {
    const lastIdx = data.days.reduce(
      (acc, _, i) => (data.users.some((u) => u.cells[i].steps !== null) ? i : acc),
      -1
    );
    const series = Object.entries(TEAMS).map(([team, members]) => {
      const users = data.users.filter((u) => u.team === team);
      let run = 0;
      const cumulative = data.days.map((_, i) => {
        run += users.reduce((s, u) => s + (u.cells[i].steps ?? 0), 0);
        return run;
      });
      return { team, members, cumulative };
    });
    // Fixed scale (leader's latest total) so faces visibly move as the slider changes.
    const scaleMax = Math.max(1, ...series.map((s) => s.cumulative[Math.max(lastIdx, 0)]));
    return { series, lastIdx, scaleMax };
  }, [data]);

  const [dayIdx, setDayIdx] = useState(Math.max(lastIdx, 0));
  useEffect(() => setDayIdx(Math.max(lastIdx, 0)), [lastIdx]);

  return (
    <section className="race">
      <h2>🏁 Team Race</h2>
      {lastIdx < 0 ? (
        <p className="subtitle">The race starts once steps are logged.</p>
      ) : (
        <>
          <p className="subtitle">Cumulative team steps. Drag the slider to replay the race.</p>
          <div className="race-controls">
            <input
              type="range"
              min={0}
              max={lastIdx}
              value={dayIdx}
              onChange={(e) => setDayIdx(Number(e.target.value))}
              aria-label="Race day"
            />
            <span className="race-day">{data.days[dayIdx].label}</span>
          </div>

          {[...series]
            .sort((a, b) => b.cumulative[dayIdx] - a.cumulative[dayIdx])
            .map((s, rank) => {
              const total = s.cumulative[dayIdx];
              const pct = Math.min(100, (total / scaleMax) * 100);
              return (
                <div key={s.team} className="race-lane">
                  <div className="race-label">
                    <span>
                      {MEDALS[rank]} {s.team}
                    </span>
                    <span className="race-total">{total.toLocaleString()} steps</span>
                  </div>
                  <div className="race-track">
                    <div className="race-fill" style={{ width: `${pct}%` }} />
                    <div className="race-runner" style={{ left: `${pct}%` }}>
                      {s.members.map((m) => (
                        <img key={m} src={AVATARS[m]} alt={m} title={m} className="race-face" />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </section>
  );
}
