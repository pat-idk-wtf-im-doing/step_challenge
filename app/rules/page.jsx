export const metadata = {
  title: 'Rules — FML STEPS',
};

export default function RulesPage() {
  return (
    <>
      <h1>📋 Challenge Rules</h1>
      <p className="subtitle">Oct 30 – Nov 29, 2026 · 3 teams · 3 friends per team</p>

      <div className="rules-card">
        <h2>🎯 The goal</h2>
        <p>
          Rack up as many steps as possible each day. Steps convert to points, every
          member&apos;s points add to their team total, and the team with the highest combined
          total at the end wins.
        </p>
      </div>

      <div className="rules-card">
        <h2>📊 Standard daily scoring</h2>
        <table className="rules-table">
          <thead>
            <tr>
              <th>Daily steps</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Under 10,000</td><td>0</td></tr>
            <tr><td>10,000 – 14,999</td><td>1</td></tr>
            <tr><td>15,000 – 19,999</td><td>2</td></tr>
            <tr><td>20,000+</td><td>3</td></tr>
          </tbody>
        </table>
        <p className="hint">10,000 steps is the minimum to score — more steps, more points.</p>
      </div>

      <div className="rules-card">
        <h2>🔥 Monday double points</h2>
        <p className="subtitle">Nov 2, 9, 16, 23 — every point counts double.</p>
        <table className="rules-table">
          <thead>
            <tr>
              <th>Daily steps</th>
              <th>Double points</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Under 10,000</td><td>0</td></tr>
            <tr><td>10,000 – 14,999</td><td>2</td></tr>
            <tr><td>15,000 – 19,999</td><td>4</td></tr>
            <tr><td>20,000+</td><td>6</td></tr>
          </tbody>
        </table>
      </div>

      <div className="rules-card">
        <h2>🏁 Grand final — November 29</h2>
        <p className="subtitle">The last day is worth triple points.</p>
        <table className="rules-table">
          <thead>
            <tr>
              <th>Daily steps</th>
              <th>Triple points</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Under 10,000</td><td>0</td></tr>
            <tr><td>10,000 – 14,999</td><td>3</td></tr>
            <tr><td>15,000 – 19,999</td><td>6</td></tr>
            <tr><td>20,000+</td><td>9</td></tr>
          </tbody>
        </table>
      </div>

      <div className="rules-card">
        <h2>🏆 The winner</h2>
        <p>
          Each team&apos;s points are added together across all three members and every day of
          the challenge. Highest total team score wins.
        </p>
      </div>
    </>
  );
}
