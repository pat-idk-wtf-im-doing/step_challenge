'use client';

import { useEffect, useState } from 'react';
import RaceTrack from './RaceTrack';

const MODES = [
  { key: 'both', label: 'Steps + Points' },
  { key: 'steps', label: 'Steps' },
  { key: 'points', label: 'Points' },
];

function multiplierBadge(m) {
  if (m === 3) return <span className="mult mult-3">3×</span>;
  if (m === 2) return <span className="mult mult-2">2×</span>;
  return null;
}

export default function MatrixPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('both');

  useEffect(() => {
    fetch('/api/matrix')
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError('Could not load the step matrix.'));
  }, []);

  return (
    <>
      <h1>📊 Daily Step Matrix</h1>
      <p className="subtitle">Each cell shows the day&apos;s steps and the points earned.</p>

      <div className="mode-toggle">
        {MODES.map((m) => (
          <button
            key={m.key}
            type="button"
            className={`toggle ${mode === m.key ? 'active' : ''}`}
            onClick={() => setMode(m.key)}
          >
            {m.label}
          </button>
        ))}
      </div>

      {error && <div className="msg err">{error}</div>}
      {!data && !error && <p className="subtitle">Loading…</p>}

      {data && (
        <div className="matrix-scroll">
          <table className="matrix">
            <thead>
              <tr>
                <th className="sticky-col corner">Name</th>
                {data.days.map((d) => (
                  <th key={d.date} className={`day-head mult-head-${d.multiplier}`}>
                    <span className="day-label">{d.label}</span>
                    {multiplierBadge(d.multiplier)}
                  </th>
                ))}
                <th className="total-head">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((u) => (
                <tr key={u.name}>
                  <th className="sticky-col name-cell">
                    <div>{u.name}</div>
                    <div className="team-tag">{u.team}</div>
                  </th>
                  {u.cells.map((c) => (
                    <td key={c.date} className={c.steps === null ? 'empty' : ''}>
                      {c.steps === null ? (
                        '–'
                      ) : (
                        <>
                          {c.mvp && <div className="mvp-crown" title="Daily MVP">👑</div>}
                          {mode !== 'points' && (
                            <div className="cell-steps">{c.steps.toLocaleString()}</div>
                          )}
                          {mode !== 'steps' && (
                            <div className={`cell-points ${c.points > 0 ? 'has-points' : ''}`}>
                              {c.points} pt{c.points === 1 ? '' : 's'}
                            </div>
                          )}
                        </>
                      )}
                    </td>
                  ))}
                  <td className="total-cell">
                    {mode !== 'points' && (
                      <div className="cell-steps">{u.totalSteps.toLocaleString()}</div>
                    )}
                    {mode !== 'steps' && (
                      <div className="cell-points has-points">{u.totalPoints} pts</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data && <RaceTrack data={data} />}
    </>
  );
}
