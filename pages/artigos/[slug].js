import fs from "fs";
import path from "path";
import Head from "next/head";

export async function getStaticPaths() {
  const file = path.join(process.cwd(), "data/posts.json");
  const posts = JSON.parse(fs.readFileSync(file, "utf-8"));

  const paths = posts.map((p) => ({
    params: { slug: p.slug }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const file = path.join(process.cwd(), "data/posts.json");
  const posts = JSON.parse(fs.readFileSync(file, "utf-8"));
  const post = posts.find((p) => p.slug === params.slug);
  return { props: { post } };
}

export default function Post({ post }) {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.summary.slice(0, 150)} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.summary.slice(0, 150)} />
      </Head>
      <h1>{post.title}</h1>
      <small>{new Date(post.date).toLocaleDateString("pt-PT")}</small>
      <article
        dangerouslySetInnerHTML={{ __html: post.content }}
        style={{ marginTop: "1rem" }}
      />
    </main>
  );
}
