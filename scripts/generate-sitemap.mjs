// public/sitemap.xml을 src/posts/*.md 기준으로 생성한다.
// `npm run build` 실행 시 prebuild 훅으로 자동 실행되므로 글을 추가/삭제해도 따로 손댈 필요가 없다.
import { readFileSync, readdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const SITE_URL = "https://chayoungsim.github.io/blog"
const postsDir = join(__dirname, "../src/posts")

function stripQuotes(value) {
  return value.trim().replace(/^["']|["']$/g, "")
}

const slugs = readdirSync(postsDir)
  .filter((file) => file.endsWith(".md"))
  .map((file) => file.replace(/\.md$/, ""))

const categories = new Set()
for (const slug of slugs) {
  const raw = readFileSync(join(postsDir, `${slug}.md`), "utf-8")
  const match = /^category:\s*(.+)$/m.exec(raw)
  if (match) {
    categories.add(stripQuotes(match[1]))
  }
}

const routes = [
  "/",
  "/about",
  "/posts",
  ...slugs.map((slug) => `/posts/${slug}`),
  ...Array.from(categories).map((category) => `/category/${category}`),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${SITE_URL}${route}</loc></url>`).join("\n")}
</urlset>
`

writeFileSync(join(__dirname, "../public/sitemap.xml"), xml)
console.log(`sitemap.xml generated with ${routes.length} URLs`)
