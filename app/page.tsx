export const dynamic = "force-dynamic";

interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
}

async function getRecentPosts(): Promise<WPPost[]> {
  const apiUrl = process.env.WORDPRESS_API_URL ?? process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  if (!apiUrl) return [];
  try {
    const res = await fetch(`${apiUrl}/posts?per_page=3&_fields=id,slug,title,excerpt,date`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const posts = await getRecentPosts();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  return (
    <main>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Welcome</h1>
      <p style={{ color: "#555", fontSize: "1.1rem", marginBottom: "3rem" }}>
        {siteUrl ? siteUrl.replace(/^https?:\/\//, "") : "Your new site is live."}
      </p>

      {posts.length > 0 && (
        <section>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Latest Posts</h2>
          <div style={{ display: "grid", gap: "1.5rem" }}>
            {posts.map((post) => (
              <article key={post.id} style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: "1.5rem" }}>
                <h3 style={{ margin: "0 0 0.5rem" }}>
                  <a
                    href={`/blog/${post.slug}`}
                    style={{ textDecoration: "none", color: "#111" }}
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                </h3>
                <p
                  style={{ color: "#555", margin: 0, fontSize: "0.95rem" }}
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
              </article>
            ))}
          </div>
          <p style={{ marginTop: "2rem" }}>
            <a href="/blog" style={{ color: "#0066cc" }}>View all posts →</a>
          </p>
        </section>
      )}

      {posts.length === 0 && (
        <section style={{ background: "#f9f9f9", padding: "2rem", borderRadius: "8px" }}>
          <h2 style={{ margin: "0 0 0.5rem" }}>Getting started</h2>
          <p style={{ color: "#555", margin: 0 }}>
            Your site is ready. Log in to WordPress to add your first post.
          </p>
        </section>
      )}
    </main>
  );
}
