# Agent Guide

This is a Host Little AI Stack site — Next.js 15 (App Router) + headless WordPress.

## Images
Always use `next/image`. The custom loader (`lib/image-loader.ts`) automatically routes every image through `img.hostlittle.com` for Cloudflare-cached WebP/AVIF optimization. No extra setup needed.

```tsx
import Image from "next/image";
// src can be absolute WP media URL or a relative path
<Image src="https://cms.yourdomain.com/wp-content/uploads/photo.jpg" width={800} height={600} alt="" />
```

Never use bare `<img>` tags for content images — they bypass the optimizer.

## WordPress data
Fetch from `process.env.WORDPRESS_API_URL` (server) or `process.env.NEXT_PUBLIC_WORDPRESS_API_URL` (client). All pages use `export const dynamic = "force-dynamic"` — keep it that way so the WP API is never called at build time.

## Key env vars
| Var | What |
|-----|------|
| `WORDPRESS_API_URL` | WP REST API root, server-side |
| `NEXT_PUBLIC_WORDPRESS_API_URL` | WP REST API root, client-side |
| `NEXT_PUBLIC_SITE_URL` | Public URL of this site |
| `DATABASE_URL` | Postgres connection string |
