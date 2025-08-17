const fs = require("fs");
const path = require("path");
const marked = require("marked");
const slugify = require("slugify");

const postsDir = path.join(__dirname, "posts");
const distDir = path.join(__dirname, "dist");
const layoutFile = path.join(__dirname, "templates/layout.html");
const indexFile = path.join(__dirname, "templates/index.html");

// garante dist
fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

// carrega layout
const layout = fs.readFileSync(layoutFile, "utf-8");
const indexTpl = fs.readFileSync(indexFile, "utf-8");

// processa posts
const files = fs.readdirSync(postsDir).filter(f => f.endsWith(".md"));
let postsList = [];

files.forEach(file => {
  const md = fs.readFileSync(path.join(postsDir, file), "utf-8");
  const htmlContent = marked.parse(md);
  const title = md.split("\n")[0].replace(/^# /, "").trim();
  const slug = slugify(title, { lower: true, strict: true }) + ".html";

  const finalHtml = layout
    .replace("{{title}}", title)
    .replace("{{description}}", md.slice(0, 150))
    .replace("{{content}}", htmlContent);

  fs.writeFileSync(path.join(distDir, slug), finalHtml);
  postsList.push({ title, slug });
});

// gera index
const postsHtml = postsList
  .map(p => `<li><a href="/${p.slug}">${p.title}</a></li>`)
  .join("\n");

const indexHtml = indexTpl.replace("{{posts}}", postsHtml);
fs.writeFileSync(path.join(distDir, "index.html"), indexHtml);

console.log("✅ Site gerado em /dist");
