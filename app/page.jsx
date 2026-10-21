'use client';

import { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [standings, setStandings] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((r) => r.json())
      .then((data) => setStandings(data.standings))
      .catch(() => setError('Could not load the leaderboard.'));
  }, []);

  return (
    <>
      <h1>🏆 Team Leaderboard</h1>
      <p className="subtitle">Oct 30 – Nov 29, 2026 · Mondays double · Nov 29 triple finale</p>

      {error && <div className="msg err">{error}</div>}
      {!standings && !error && <p className="subtitle">Loading…</p>}

      {standings &&
        standings.map((team, i) => (
          <div className="team-card" key={team.team}>
            <div className="team-head">
              <span className="team-name">
                <span className="rank">#{i + 1}</span>
                {team.team}
              </span>
              <span className="team-points">{team.points} pts</span>
            </div>
            {team.members.map((m) => (
              <div className="member-row" key={m.name}>
                <span>{m.name}</span>
                <span>
                  <strong>{m.points} pts</strong>{' '}
                  <span className="member-meta">({m.days} day{m.days === 1 ? '' : 's'})</span>
                </span>
              </div>
            ))}
          </div>
        ))}
    </>
  );
}
