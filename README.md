# 🍂 Fall Into Fitness — Team Step Challenge

A mobile-friendly web app to track daily steps for a friends' step challenge, auto-calculating points and team standings. Built with Next.js (App Router) and Vercel Postgres.

## Stack

- **API**: Next.js Route Handlers + `@vercel/postgres` + PostgreSQL
- **GUI**: Next.js 15 (App Router) + React 18 + JavaScript (JSX) + plain CSS
- **Auth**: None (shared link; entry form is open to the group)
- **Infra**: Vercel + Vercel Postgres
- **Tooling**: Node.js 20.6+ scripts (`npm run db:init`); Python script for avatar crops ([scripts/crop-heads.py](scripts/crop-heads.py))

## Copilot Instructions

This repo includes GitHub Copilot instructions so AI-assisted changes follow the project's conventions:

- [`.github/copilot-instructions.md`](.github/copilot-instructions.md) — global conventions: stack, sources of truth (`lib/challenge.js`, `lib/scoring.js`), date/timezone handling, API and UI patterns, validation

## Challenge rules

- **Window:** Oct 30 – Nov 29, 2026
- **Daily points (standard):**
  | Daily steps | Points |
  | --- | --- |
  | Under 10,000 | 0 |
  | 10,000 – 14,999 | 1 |
  | 15,000 – 19,999 | 2 |
  | 20,000+ | 3 |
- **Monday double points:** Nov 2, 9, 16, 23 (points ×2)
- **Grand final triple points:** Nov 29 (points ×3)
- **Winner:** highest combined team total.

Scoring lives in [lib/scoring.js](lib/scoring.js); all dates/teams are in [lib/challenge.js](lib/challenge.js).

## Teams

| Team A | Team B | Team C |
| --- | --- | --- |
| Patrick | Jessica | Little Lisa |
| Scott | Big Lisa | Annie |
| Chow | Lina | Wes |

## Pages

- `/` — team leaderboard (sorted by total points; ties broken by total steps) with a countdown banner to the Nov 29 finale
- `/matrix` — daily step matrix (users × dates) with steps + point equivalent and Monday/finale multiplier badges
- `/entry` — form to log/overwrite a day's steps

## Project structure

```
.
├─ .github/
│  └─ copilot-instructions.md  # Copilot conventions
├─ app/
│  ├─ layout.jsx, globals.css
│  ├─ page.jsx                 # leaderboard
│  ├─ Countdown.jsx            # final-stretch countdown banner
│  ├─ matrix/page.jsx          # daily step matrix
│  ├─ entry/page.jsx           # step entry (PIN-protected)
│  └─ api/
│     ├─ steps/route.js        # POST upsert steps
│     ├─ leaderboard/route.js  # GET standings
│     └─ matrix/route.js       # GET per-user daily steps + points
├─ lib/
│  ├─ challenge.js             # dates, double/triple days, teams
│  └─ scoring.js               # point calculations
├─ db/schema.sql               # tables + team/friend seed data
└─ scripts/init-db.mjs         # runs schema.sql against the database
```

## Local development

Requires **Node.js 20.6+** (for the `--env-file` flag) and a Vercel project with Postgres.

1. Install dependencies:
   ```bash
   npm install
   ```
2. Link the Vercel project and pull env vars (creates `.env.local`):
   ```bash
   vercel link
   vercel env pull .env.local
   ```
3. Initialize the database (creates tables + seeds teams/friends):
   ```bash
   npm run db:init
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000.

## Deploying to Vercel

1. Push this repo to GitHub and import it in Vercel.
2. Add a **Postgres** store (Storage → Create → Postgres) and attach it to the project. The `POSTGRES_URL` env vars are injected automatically.
3. Run the schema once in the Vercel Postgres **Query** console (paste [db/schema.sql](db/schema.sql)).
4. Deploy.

## Environment variables

| Variable | Source | Purpose |
| --- | --- | --- |
| `POSTGRES_URL` (+ related) | Vercel Postgres | Database connection |

## Notes

- Re-submitting a date overwrites that day's value instead of duplicating it.
- Fitness-tracker auto-sync was intentionally dropped: iPhone (Apple Health) and Samsung (Health Connect) keep step data on-device with no server API, so manual entry is the reliable path for a web app.
