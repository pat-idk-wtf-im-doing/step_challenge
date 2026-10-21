# 🍂 Fall Into Fitness — Team Step Challenge

A mobile-friendly web app to track daily steps for a friends' step challenge, auto-calculating points and team standings. Built with Next.js (App Router) and Vercel Postgres.

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

- `/` — team leaderboard (totals, sorted)
- `/matrix` — daily step matrix (users × dates) with steps + point equivalent and Monday/finale multiplier badges
- `/entry` — PIN-protected form to log/overwrite a day's steps

## Project structure

```
.
├─ app/
│  ├─ layout.jsx, globals.css
│  ├─ page.jsx                 # leaderboard
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
3. Set the shared PIN in `.env.local`:
   ```
   APP_PIN=your-pin-here
   ```
4. Initialize the database (creates tables + seeds teams/friends):
   ```bash
   npm run db:init
   ```
5. Start the dev server:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000.

## Deploying to Vercel

1. Push this repo to GitHub and import it in Vercel.
2. Add a **Postgres** store (Storage → Create → Postgres) and attach it to the project. The `POSTGRES_URL` env vars are injected automatically.
3. Add the **`APP_PIN`** environment variable (Settings → Environment Variables) — it is **not** committed (`.env*.local` is gitignored).
4. Run the schema once in the Vercel Postgres **Query** console (paste [db/schema.sql](db/schema.sql)).
5. Deploy.

## Environment variables

| Variable | Source | Purpose |
| --- | --- | --- |
| `POSTGRES_URL` (+ related) | Vercel Postgres | Database connection |
| `APP_PIN` | You set it | Shared PIN required to submit steps |

## Notes

- The leaderboard and matrix are public (read-only); submitting steps requires the shared PIN.
- Re-submitting a date overwrites that day's value instead of duplicating it.
- Fitness-tracker auto-sync was intentionally dropped: iPhone (Apple Health) and Samsung (Health Connect) keep step data on-device with no server API, so manual entry is the reliable path for a web app.
