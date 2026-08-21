// GitHub Pages는 정적 호스팅이라 클라이언트 라우팅 경로(/posts/foo 등)를 새로고침하면
// 서버가 처리를 못 해 404를 낸다. index.html을 404.html로 복제해두면 GitHub Pages가
// 그 경로에서 404.html(=SPA shell)을 대신 서빙해주고, 이후는 React Router가 처리한다.
import { copyFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, "../dist")

copyFileSync(join(distDir, "index.html"), join(distDir, "404.html"))
console.log("404.html created for GitHub Pages SPA fallback")
