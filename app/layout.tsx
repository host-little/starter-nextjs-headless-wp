import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_URL ?? "My Site",
  description: "Powered by Host Little",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", maxWidth: 800, margin: "0 auto", padding: "2rem 1rem" }}>
        <nav style={{ marginBottom: "2rem", borderBottom: "1px solid #eee", paddingBottom: "1rem" }}>
          <a href="/" style={{ marginRight: "1.5rem", textDecoration: "none", color: "#333", fontWeight: 600 }}>Home</a>
          <a href="/blog" style={{ textDecoration: "none", color: "#333" }}>Blog</a>
        </nav>
        {children}
        <footer style={{ marginTop: "4rem", borderTop: "1px solid #eee", paddingTop: "1rem", color: "#888", fontSize: "0.9rem" }}>
          Powered by <a href="https://hostlittle.com" style={{ color: "#888" }}>Host Little</a>
        </footer>
      </body>
    </html>
  );
}
