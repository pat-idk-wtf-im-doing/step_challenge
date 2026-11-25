'use client';

import { useEffect, useState } from 'react';
import { START, END, GRAND_FINAL, isWithinChallenge, remainingDays } from '@/lib/challenge';
import { maxPointsAvailable } from '@/lib/scoring';

function localIsoDate(date = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function bannerFor(today) {
  if (today < START) return null;
  if (today > END) {
    return { headline: '🎉 Challenge complete — amazing effort, everyone!', sub: 'Thanks for every single step 🙌' };
  }

  const ahead = remainingDays(today);
  const pts = maxPointsAvailable(isWithinChallenge(today) ? [today, ...ahead] : ahead);

  if (today === GRAND_FINAL) {
    return {
      headline: '🏁 Finale day! Every step counts triple today',
      sub: `Up to ${pts} pts each today — leave it all out there 💪`,
    };
  }

  const n = ahead.length;
  const finaleNext = ahead[0] === GRAND_FINAL;
  return {
    headline: finaleNext
      ? '⏳ 1 day to go — tomorrow is the triple-points finale!'
      : `⏳ ${n} days to go — you've got this!`,
    sub: `Up to ${pts} pts each still up for grabs (incl. today) · Nov 29 is triple points 🔥`,
  };
}

export default function Countdown() {
  const [today, setToday] = useState(null);
  useEffect(() => setToday(localIsoDate()), []);

  const banner = today && bannerFor(today);
  if (!banner) return null;

  return (
    <div className="countdown" role="status">
      <div className="countdown-headline">{banner.headline}</div>
      <div className="countdown-sub">{banner.sub}</div>
    </div>
  );
}
