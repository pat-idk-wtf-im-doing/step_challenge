# Copilot instructions — Fall Into Fitness step challenge

Small, mobile-first Next.js app for a 9-person, 3-team step challenge. Keep changes simple; this is a friends' app, not a product.

## Stack

- Next.js 15 (App Router) + React 18, **JavaScript (JSX) only** — no TypeScript.
- **Plain CSS** in `app/globals.css` using the existing CSS variables (`--bg`, `--panel`, `--panel-2`, `--text`, `--muted`, `--accent`, `--accent-2`, `--border`). No Tailwind or CSS-in-JS.
- API: Next.js Route Handlers in `app/api/<name>/route.js`.
- DB: Vercel Postgres via `@vercel/postgres`. Schema and seed data are in `db/schema.sql`.
- Hosted on Vercel. No auth: anyone with the link can view and log steps.
- Import with the `@/` alias (for example `@/lib/challenge`), which maps to the repo root.

## Source of truth

- `lib/challenge.js` owns challenge dates (`START`, `END`), double days, `GRAND_FINAL`, `REST_DAYS`, `SCORING_TIERS`, `TEAMS`, and `AVATARS`. Never hardcode these values anywhere else.
- `lib/scoring.js` owns point math. Always use `pointsForDay(steps, isoDate)`, `basePoints`, and `dayMultiplier`; never reimplement tiers or multipliers.
- Team and member names also appear in `db/schema.sql` seed data. Keep both files in sync when changing participants.

## Dates

- Dates are `'YYYY-MM-DD'` strings everywhere. Compare them as strings (`d >= START`).
- Participants are in UTC+8 (Australia/Perth). Don't derive "today" from `toISOString()` (UTC), because it shows the wrong day in the evening. Use the local date or the `Australia/Perth` timezone.
- In SQL, select dates with `to_char(ds.day, 'YYYY-MM-DD')` so they come back as strings, not `Date` objects.

## API conventions

- Use the `sql` tagged template from `@vercel/postgres` (it parameterizes values automatically). Never build SQL by string concatenation.
- Add `export const dynamic = 'force-dynamic';` to GET handlers so standings are never cached.
- Return `Response.json(...)`. For validation errors, return `{ error: '<friendly message>' }` with status `400`.
- Compute points in JS with `lib/scoring.js`, not in SQL.
- Steps are upserted per user per day (`on conflict (user_id, day) do update`). Re-entering a day overwrites it.

## UI conventions

- Pages that fetch data are client components (`'use client'`) that call `/api/*` in `useEffect`, with loading and error states (see `app/page.jsx`).
- Design for phones first.
- Tone: playful and emoji-friendly. Roast copy lives in `lib/banter.js`.

## Validation

- Run `npm run build` after changes. There is no test suite or linter.
- Keep `README.md` (rules, pages, structure, stack) in sync with behavior changes.
