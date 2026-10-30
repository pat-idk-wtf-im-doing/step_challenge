'use client';

import { useState } from 'react';
import { MEMBERS, START, END } from '@/lib/challenge';
import { basePoints } from '@/lib/scoring';

const QUIPS = {
  0: 'GET OFF YOUR FUCKING ASS AND MOVE YOU SLOB!!',
  1: 'you arite??',
  2: 'ooo you walking lots',
  3: 'OOF, max points hit! Go put those jelly legs up, you earned it. 📈🛋️',
};

function perthDateString(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Australia/Perth',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const parts = formatter.formatToParts(date);
  const values = {};

  for (const part of parts) {
    if (part.type !== 'literal') {
      values[part.type] = part.value;
    }
  }

  return `${values.year}-${values.month}-${values.day}`;
}

export default function EntryPage() {
  const [name, setName] = useState(MEMBERS[0]);
  const [day, setDay] = useState(perthDateString());
  const [steps, setSteps] = useState('');
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);