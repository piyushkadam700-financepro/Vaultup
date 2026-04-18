# Vaultup — AI Money Coach

> A mobile-first personal finance app for young adults in the UK, powered by Claude AI.

**Live:** https://vaultup.vercel.app | **GitHub:** https://github.com/piyushkadam700-financepro/Vaultup

---

## What it does

Vaultup helps 16–28 year olds build better saving habits through an AI coach (Val) that knows their actual numbers — goals, spending, income, and group savings pots. Most budgeting apps show you data. Val tells you what to do with it.

**Core features:**

- **AI coach (Val)** — full financial context injected into every conversation: personal goals, group pots, spending breakdown, unaccounted money, and streak data
- **Goal tracking** — monthly targets, all-time progress, and automatic month-end resets with history snapshots
- **Group savings** — create shared pots, invite friends via link, track individual contributions, admin controls with member removal
- **Monthly history** — automatic end-of-month snapshots stored in Supabase, visible in-app as a financial timeline
- **Smart nudges** — proactive alerts when spending exceeds income, goals are hit, or group members are added/removed
- **Streak system, XP and badges** — habit reinforcement through gamification
- **Spending breakdown** — rent, food, subscriptions, travel, and other tracked monthly and reset automatically

---

## Traction

- **51+ real users** since launch across Bristol, London, and Birmingham
- Built, shipped, and iterated in under 12 weeks from first line of code
- Real group savings pots in active use between friends
- Monthly active engagement tracked via Vercel Insights
- Privacy policy live, GDPR-compliant data handling in place

---

## Technical architecture

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML/CSS/JS — single-file PWA |
| Auth & Database | Supabase (PostgreSQL + Row Level Security) |
| AI | Anthropic Claude API (`claude-sonnet-4`) |
| Deployment | Vercel (serverless functions for API proxying) |
| Analytics | Vercel Insights |

### Deliberate architectural decision

The app is built as a single-file PWA. This was a conscious choice — not a scalability oversight. The goal was maximum iteration speed during user validation. Every week, features were shipped, tested with real users, and refined based on feedback. A monorepo with build pipelines would have tripled the time-to-feedback loop.

**The migration path is already planned:**

- **Phase 2 (architecture):** React + Next.js with TypeScript, component-based UI, and proper state management via Zustand
- **API layer:** Dedicated Express backend replacing Vercel serverless functions
- **Auth:** Supabase Auth with server-side session validation
- **Testing:** Jest + Playwright end-to-end coverage

The business logic within the current file is already modular — functions are cleanly separated by domain (auth, goals, groups, chat, spending, history). Extraction into components is a mechanical refactor, not a redesign.

---

## Database schema

| Table | Purpose |
|---|---|
| `users` | Profile, income, savings target, spending breakdown by category, XP and streak |
| `goals` | Per-user savings goals with monthly targets, all-time saved, and `saved_this_month` |
| `groups` | Shared savings pots with admin ownership, group target, and total saved |
| `group_members` | Individual member contributions with RLS policies for admin-only removal |
| `notifications` | Async alerts — e.g. group removal notifications with pot balance returned |
| `monthly_history` | Auto-captured end-of-month snapshots: spending, savings, goals progress, and unaccounted money |

---

## Security

- **Row Level Security (RLS)** enforced on all Supabase tables — users can only read and write their own data
- **Supabase anon key** is intentionally public per Supabase's security model — all data access is enforced server-side via RLS policies, not client-side key secrecy
- **Auth** via Supabase JWT tokens — API keys for Claude are server-side only (Vercel environment variables), never exposed to the client
- **No sensitive financial data stored** — only user-entered figures (income, spending, goals). No bank credentials, card numbers, or transaction data
- **GDPR-compliant** — privacy policy live at [vaultup.vercel.app/privacy.html](https://vaultup.vercel.app/privacy.html), data deletion on request

---

## AI architecture

Val's intelligence comes from a dynamically built system prompt injected at the start of every conversation. It includes:

- Monthly income and savings target
- All personal goals with progress, monthly amounts, and ETAs
- Full spending breakdown (rent, food, subscriptions, travel, other)
- Group savings pots with individual contributions
- Unaccounted money calculation (income minus spending minus saved)
- Streak, XP, and level data

This means Val never gives generic advice — every response references the user's actual numbers. The system prompt is rebuilt on every message to reflect the latest state.

---

## Product roadmap — evidence of commercial thinking

| Phase | Feature | Technology |
|---|---|---|
| ✅ MVP | AI coaching, goals, groups, history | Claude API + Supabase |
| Phase 2 | React + Next.js migration | TypeScript, Zustand |
| Phase 3 | Read-only bank linking | TrueLayer Open Banking API |
| Phase 4 | Direct debit automation | GoCardless API |
| Phase 5 | Real pooled accounts | Modulr Financial Services |
| Phase 6 | Group ISA and investment products | FCA-regulated wrapper |

The roadmap follows the natural regulatory progression of a UK fintech — from unregulated coaching tool to FCA-authorised product. Each phase has a clear technical and compliance dependency on the previous one.

---

## Regulatory considerations

Vaultup is currently a **financial coaching tool**, not a regulated financial product. It does not:
- Hold or move user funds
- Provide FCA-regulated financial advice
- Access bank accounts or payment rails

As the product moves toward Phase 3 (Open Banking), the plan is to operate under the FCA's regulatory sandbox and pursue registration as an Account Information Service Provider (AISP) under PSD2.

---

## Founder

Built by **Piyush Kadam** — finance professional and founder of VaultUp Ltd.

Background in financial services, with direct experience of the savings behaviour gap that Vaultup addresses. The product is built from a genuine understanding of how young adults in the UK think about money — and why most fintech products fail to change their behaviour.

- **LinkedIn:** [linkedin.com/in/piyushkadam](https://linkedin.com)
- **Email:** hello@vaultup.co.uk
- **Company:** VaultUp Ltd, Bristol, UK

---

*© 2026 VaultUp Ltd. All rights reserved.*
