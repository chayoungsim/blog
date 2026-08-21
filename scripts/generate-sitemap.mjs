// public/sitemap.xml을 src/posts/<카테고리>/*.md 기준으로 생성한다.
// `npm run build` 실행 시 prebuild 훅으로 자동 실행되므로 글/카테고리 폴더를 추가·삭제해도
// 따로 손댈 필요가 없다.
import { existsSync, readdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const SITE_URL = "https://chayoungsim.github.io/blog"
const postsDir = join(__dirname, "../src/posts")
const projectsDir = join(__dirname, "../src/projects")

const categoryDirs = readdirSync(postsDir, { withFileTypes: true }).filter((entry) => entry.isDirectory())

const postRoutes = []
const categories = new Set()

for (const dir of categoryDirs) {
  const category = dir.name
  const files = readdirSync(join(postsDir, category)).filter((file) => file.endsWith(".md"))
  if (files.length === 0) continue

  categories.add(category)
  for (const file of files) {
    postRoutes.push(`/posts/${file.replace(/\.md$/, "")}`)
  }
}

const projectRoutes = existsSync(projectsDir)
  ? readdirSync(projectsDir)
      .filter((file) => file.endsWith(".md"))
      .map((file) => `/projects/${file.replace(/\.md$/, "")}`)
  : []

const routes = [
  "/",
  "/about",
  "/posts",
  "/projects",
  ...postRoutes,
  ...projectRoutes,
  ...Array.from(categories).map((category) => `/category/${encodeURIComponent(category)}`),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${SITE_URL}${route}</loc></url>`).join("\n")}
</urlset>
`

writeFileSync(join(__dirname, "../public/sitemap.xml"), xml)
console.log(`sitemap.xml generated with ${routes.length} URLs`)
