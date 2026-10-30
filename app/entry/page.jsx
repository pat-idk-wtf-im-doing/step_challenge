'use client';

import { useState } from 'react';
import { MEMBERS, START, END } from '@/lib/challenge';
import { basePoints } from '@/lib/scoring';

const QUIPS = {
  0: 'TF WALK YOUR ASS YOU LAZY FK!!',
  1: 'you arite??',
  2: 'ooo you walking lots',
  3: 'OOF those legs must be jelly',
};

export default function EntryPage() {
  const [name, setName] = useState(MEMBERS[0]);
  const [day, setDay] = useState(END);
  const [steps, setSteps] = useState('');
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);

    const res = await fetch('/api/steps', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, day, steps: Number(steps) }),
    });

    const data = await res.json();
    if (res.ok) {
      const quip = QUIPS[basePoints(Number(steps))];
      let text = `Saved ${steps} steps for ${name} on ${day}, ${quip}`;
      if (data.isPersonalBest) {
        text += ` 🔥🏅 NEW PERSONAL BEST — smashed your old ${data.prevBest.toLocaleString()}! 🚀`;
      }
      setMsg({ type: 'ok', text });
      setSteps('');
    } else {
      setMsg({ type: 'err', text: data.error || 'Something went wrong.' });
    }
    setBusy(false);
  }

  return (
    <>
      <h1>👟 Enter Daily Steps</h1>
      <p className="subtitle">Check your phone&apos;s Health app, then log the number here.</p>

      <form onSubmit={submit}>
        <label htmlFor="name">Participant</label>
        <select id="name" value={name} onChange={(e) => setName(e.target.value)}>
          {MEMBERS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <label htmlFor="day">Date</label>
        <input
          id="day"
          type="date"
          min={START}
          max={END}
          value={day}
          onChange={(e) => setDay(e.target.value)}
          required
        />

        <label htmlFor="steps">Steps</label>
        <input
          id="steps"
          type="number"
          min="0"
          inputMode="numeric"
          placeholder="e.g. 12500"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          required
        />

        <p className="hint">Re-entering a date overwrites the previous value for that day.</p>

        <button type="submit" disabled={busy}>
          {busy ? 'Saving…' : 'Save steps'}
        </button>

        {msg && <div className={`msg ${msg.type}`}>{msg.text}</div>}
      </form>
    </>
  );
}
