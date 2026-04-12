# Vaultup — AI Money Coach

> A mobile-first personal finance app for young adults in the UK, powered by Claude AI.

**Live:** https://vaultup.vercel.app

## What it does

Vaultup helps 16–28 year olds build better saving habits through an AI coach (Val) that knows their actual numbers — goals, spending, income, and group savings pots.

**Core features:**
- AI coach (Val) with full financial context — personal goals + group pots + spending
- Goal tracking with monthly targets and progress persistence
- Group savings — create shared pots, invite friends, track contributions
- Real-time nudges when goals are hit or members are added/removed
- Streak system, XP, and badges for habit reinforcement
- Spending breakdown across food, subscriptions, travel, and other

## Technical architecture

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML/CSS/JS — single-file PWA |
| Auth & Database | Supabase (PostgreSQL + RLS policies) |
| AI | Anthropic Claude API (claude-sonnet) |
| Deployment | Vercel (serverless functions for API) |
| Analytics | Vercel Insights |

**Deliberate architectural decision:** The app is a single `index.html` file. This was a conscious choice for rapid iteration and deployment velocity during the MVP phase — not a scalability oversight. The next phase involves migrating to a React + Next.js architecture with proper component separation as the team grows.

## Database schema

- `users` — profile, income, savings target, spending breakdown, XP/streak
- `goals` — per-user savings goals with monthly targets and `saved_this_month`
- `groups` — shared savings pots with admin ownership
- `group_members` — member contributions with RLS policies for admin removal
- `notifications` — async alerts (e.g. group removal notifications)

## Security

- Supabase Row Level Security (RLS) on all tables
- Auth via Supabase JWT tokens
- No financial data stored beyond user-entered figures
- GDPR-compliant data handling — see [privacy policy](https://vaultup.vercel.app/privacy.html)

## Roadmap

- **Phase 2:** TrueLayer Open Banking integration (read-only bank linking)
- **Phase 3:** GoCardless direct debit automation
- **Phase 4:** Modulr real pooled accounts
- **Phase 5:** Group ISA and investment products

## Founder

Built by Piyush Kadam — finance professional and founder of VaultUp Ltd.

- LinkedIn: [linkedin.com/in/piyushkadam](https://linkedin.com)
- Email: hello@vaultup.app
