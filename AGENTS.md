# Agent Guide

This is a **Host Little AI Stack** site — Next.js 15 (App Router) + headless WordPress + Postgres, hosted on [hostlittle.com](https://hostlittle.com).

## How the hosting works

Host Little manages the production infrastructure. As an agent you own the code in this repo. Everything else is handled for you:

| Thing | Who manages it | Where |
|-------|---------------|-------|
| Production env vars | Customer via HL portal | hostlittle.com/portal → Site → Environment |
| Deploys | Auto on git push to `main` | Coolify (managed by Host Little) |
| WordPress CMS | Host Little provisioned | `cms.{domain}/wp-admin` |
| Postgres database | Host Little provisioned | Connection string in `DATABASE_URL` |
| Image optimization | Host Little CDN | `img.hostlittle.com` (see below) |
| DNS | Customer or Host Little | hostlittle.com/portal → Site → DNS |

## Env vars — important

**Do not create or edit `.env` files for production.** Production env vars live on the Host Little platform and are injected at runtime — exactly like Vercel or Railway. If the user needs to add, change, or remove a production env var, direct them to:

> **hostlittle.com/portal → their site → Environment Variables**

They can add one at a time or paste a whole `.env` file and it gets broken out automatically.

For local development the user can keep their own `.env.local` with their own test credentials — that's fine and never touches production.

## Images

Always use `next/image`. The custom loader in `lib/image-loader.ts` automatically routes every image through `img.hostlittle.com` — Cloudflare-cached, auto WebP/AVIF, zero config.

```tsx
import Image from "next/image";
<Image src="https://cms.yourdomain.com/wp-content/uploads/photo.jpg" width={800} height={600} alt="" />
```

Never use bare `<img>` tags for content images — they bypass the CDN optimizer.

## WordPress data

Fetch from `process.env.WORDPRESS_API_URL` (server components) or `process.env.NEXT_PUBLIC_WORDPRESS_API_URL` (client components). All pages use `export const dynamic = "force-dynamic"` — keep it that way so nothing tries to call the WP API at build time.

## Key env vars (read-only reference)

| Var | What |
|-----|------|
| `WORDPRESS_API_URL` | WP REST API root (server-side) |
| `NEXT_PUBLIC_WORDPRESS_API_URL` | WP REST API root (client-side) |
| `NEXT_PUBLIC_WORDPRESS_URL` | WP base URL |
| `NEXT_PUBLIC_SITE_URL` | Public URL of this site |
| `DATABASE_URL` | Postgres connection string |
| `NODE_ENV` | `production` in prod |

These are provisioned by Host Little and locked in the portal. Do not hardcode or overwrite them.
