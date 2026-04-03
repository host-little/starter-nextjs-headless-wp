export const dynamic = "force-dynamic";

interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
}

async function getPosts(): Promise<WPPost[]> {
  const apiUrl = process.env.WORDPRESS_API_URL ?? process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  if (!apiUrl) return [];
  try {
    const res = await fetch(`${apiUrl}/posts?per_page=20&_fields=id,slug,title,excerpt,date`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Blog</h1>
      {posts.length === 0 && (
        <p style={{ color: "#888" }}>No posts yet. Check back soon.</p>
      )}
      <div style={{ display: "grid", gap: "2rem" }}>
        {posts.map((post) => (
          <article key={post.id} style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: "2rem" }}>
            <p style={{ color: "#888", fontSize: "0.85rem", margin: "0 0 0.3rem" }}>
              {new Date(post.date).toLocaleDateString()}
            </p>
            <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.3rem" }}>
              <a
                href={`/blog/${post.slug}`}
                style={{ textDecoration: "none", color: "#111" }}
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
            </h2>
            <div
              style={{ color: "#555", fontSize: "0.95rem" }}
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
            <a href={`/blog/${post.slug}`} style={{ color: "#0066cc", fontSize: "0.9rem" }}>
              Read more →
            </a>
          </article>
        ))}
      </div>
    </main>
  );
}
