# Kampung Hidroponik Surabaya — Web

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn/ui + Lucide React
- Sanity.io (CMS)

## Setup
1. `pnpm install`
2. `cp .env.local.example .env.local` → isi env vars
3. `pnpm dev`

## Route Map
| URL | File |
|-----|------|
| / | app/page.tsx |
| /about | app/about/page.tsx |
| /members | app/members/page.tsx |
| /program | app/program/page.tsx |

## Branch Strategy
- `main` → production
- `dev` → staging
- `feature/*` → per issue