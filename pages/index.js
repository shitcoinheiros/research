import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Bem-vindo ao meu site</h1>
      <p>
        Aqui encontras artigos publicados no meu blog, mas hospedados neste
        domínio para melhor SEO.
      </p>
      <Link href="/artigos">Ver artigos</Link>
    </main>
  );
}
