/**
 * Host Little imgproxy loader for next/image.
 *
 * Serves all images through img.hostlittle.com — Cloudflare-cached,
 * auto WebP/AVIF, zero extra cost.
 *
 * Usage: just use <Image> normally. The loader is wired in next.config.ts.
 *
 *   import Image from "next/image";
 *   <Image src="https://cms.yourdomain.com/wp-content/uploads/photo.jpg" width={800} height={600} alt="" />
 *
 * For WordPress media, prefer passing the full absolute URL from the WP REST API.
 * Relative paths are resolved against NEXT_PUBLIC_SITE_URL automatically.
 */

const IMGPROXY_BASE = "https://img.hostlittle.com/optimize";

export default function hostLittleLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  const sourceUrl = src.startsWith("http")
    ? src
    : `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}${src}`;

  const params = new URLSearchParams({
    url: sourceUrl,
    w: String(width),
    q: String(quality ?? 80),
  });

  return `${IMGPROXY_BASE}?${params.toString()}`;
}
