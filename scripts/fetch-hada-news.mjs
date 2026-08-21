// GeekNews(news.hada.io) RSS를 빌드 시점에 가져와 src/data/hada-news.json으로 저장한다.
// 브라우저에서 직접 fetch하면 CORS로 막히고(Access-Control-Allow-Origin 헤더 없음),
// Node 빌드 환경에는 CORS 제약이 없어 여기서 미리 받아둔다.
//
// 외부 서비스라 빌드 도중 응답이 없거나 실패할 수 있으므로, 실패 시 빌드를 깨뜨리지 않고
// 기존 파일을 그대로 둔 채 경고만 남긴다.
import { existsSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const RSS_URL = "https://news.hada.io/rss/news"
const OUTPUT_PATH = join(__dirname, "../src/data/hada-news.json")
const ITEM_LIMIT = 5

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()
}

function parseEntries(xml) {
  const entries = []
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g
  let match

  while ((match = entryRegex.exec(xml)) && entries.length < ITEM_LIMIT) {
    const block = match[1]

    const title = /<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/.exec(block)?.[1]
    const link = /<link rel='alternate' type='text\/html' href='([^']*)'/.exec(block)?.[1]
    const published = /<published>([^<]*)<\/published>/.exec(block)?.[1]
    const author = /<author>\s*<name>([^<]*)<\/name>/.exec(block)?.[1]

    if (!title || !link) continue

    entries.push({
      title: decodeEntities(title),
      link,
      published: published ?? null,
      author: author ? decodeEntities(author) : null,
    })
  }

  return entries
}

try {
  const response = await fetch(RSS_URL, { signal: AbortSignal.timeout(10_000) })
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  const xml = await response.text()
  const entries = parseEntries(xml)

  if (entries.length === 0) {
    throw new Error("피드에서 글을 하나도 찾지 못함")
  }

  writeFileSync(OUTPUT_PATH, JSON.stringify(entries, null, 2) + "\n")
  console.log(`hada-news.json 생성됨 (${entries.length}개 글)`)
} catch (error) {
  console.warn(`[fetch-hada-news] GeekNews를 가져오지 못해 건너뜀: ${error.message}`)
  if (!existsSync(OUTPUT_PATH)) {
    writeFileSync(OUTPUT_PATH, "[]\n")
  }
}
