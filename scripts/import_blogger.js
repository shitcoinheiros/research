const fs = require("fs");
const path = require("path");
const Parser = require("rss-parser");
const slugify = require("slugify");

const BLOGGER_RSS = "const BLOGGER_RSS = "https://emfaseteste.blogspot.com/feeds/posts/default?alt=rss";
const OUTPUT = path.join(__dirname, "../data/posts.json");

(async () => {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL(BLOGGER_RSS);

    const posts = feed.items.map(item => {
      const slug = slugify(item.title, { lower: true, strict: true });
      return {
        id: item.guid || item.link,
        slug,
        title: item.title,
        link: item.link,
        date: item.isoDate || item.pubDate,
        content: item["content:encoded"] || item.content || "",
        summary: item.contentSnippet || ""
      };
    });

    fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
    fs.writeFileSync(OUTPUT, JSON.stringify(posts, null, 2), "utf-8");
    console.log(`✅ Importados ${posts.length} artigos do Blogger`);
  } catch (err) {
    console.error("Erro ao importar:", err.message);
    process.exit(1);
  }
})();
