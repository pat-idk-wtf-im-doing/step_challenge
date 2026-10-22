'use client';

import { useEffect, useState } from 'react';

export default function FeedPage() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/feed')
      .then((r) => r.json())
      .then((d) => setItems(d.items))
      .catch(() => setError('Could not load the banter.'));
  }, []);

  return (
    <>
      <h1>🗣️ The Trash Talk Feed</h1>
      <p className="subtitle">Live roasts, shame, and glory. No feelings were spared. 🍿</p>

      {error && <div className="msg err">{error}</div>}
      {!items && !error && <p className="subtitle">Loading the drama… 🍿</p>}

      {items &&
        items.map((it, i) => (
          <div className="feed-item" key={i}>
            <span className="feed-emoji">{it.emoji}</span>
            <span className="feed-text">{it.text}</span>
          </div>
        ))}
    </>
  );
}
