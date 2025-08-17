import fs from "fs";
import path from "path";
import Link from "next/link";

export async function getStaticProps() {
  const file = path.join(process.cwd(), "data/posts.json");
  const raw = fs.readFileSync(file, "utf-8");
  const posts = JSON.parse(raw);
  return { props: { posts } };
}

export default function Artigos({ posts }) {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Artigos</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ margin: "1rem 0" }}>
            <Link href={`/artigos/${post.slug}`}>
              {post.title}
            </Link>
            <br />
            <small>{new Date(post.date).toLocaleDateString("pt-PT")}</small>
          </li>
        ))}
      </ul>
    </main>
  );
}
