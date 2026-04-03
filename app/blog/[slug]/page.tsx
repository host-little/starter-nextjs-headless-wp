export const dynamic = "force-dynamic";

interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
}

async function getPost(slug: string): Promise<WPPost | null> {
  const apiUrl = process.env.WORDPRESS_API_URL ?? process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  if (!apiUrl) return null;
  try {
    const res = await fetch(`${apiUrl}/posts?slug=${slug}&_fields=id,slug,title,content,date`);
    if (!res.ok) return null;
    const posts: WPPost[] = await res.json();
    return posts[0] ?? null;
  } catch {
    return null;
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return (
      <main>
        <h1>Post not found</h1>
        <a href="/blog" style={{ color: "#0066cc" }}>← Back to blog</a>
      </main>
    );
  }

  return (
    <main>
      <p style={{ color: "#888", fontSize: "0.85rem", margin: "0 0 0.5rem" }}>
        {new Date(post.date).toLocaleDateString()}
      </p>
      <h1
        style={{ fontSize: "2rem", marginBottom: "1.5rem" }}
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      <div
        style={{ lineHeight: 1.7, color: "#333" }}
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
      <p style={{ marginTop: "3rem" }}>
        <a href="/blog" style={{ color: "#0066cc" }}>← Back to blog</a>
      </p>
    </main>
  );
}
