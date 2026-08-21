// gray-matter는 내부적으로 Node의 Buffer를 사용해 브라우저 번들에서 런타임 에러가 나므로,
// 지금 쓰는 frontmatter 형식(단순 "key: value" 나열)에 맞춰 의존성 없이 직접 파싱한다.
const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/

export interface ParsedMarkdown {
  data: Record<string, string>
  content: string
}

export function parseFrontmatter(raw: string): ParsedMarkdown {
  const match = FRONTMATTER_PATTERN.exec(raw)
  if (!match) {
    return { data: {}, content: raw.trim() }
  }

  const [, frontmatterBlock, content] = match
  const data: Record<string, string> = {}

  for (const line of frontmatterBlock.split("\n")) {
    const separatorIndex = line.indexOf(":")
    if (separatorIndex === -1) continue

    const key = line.slice(0, separatorIndex).trim()
    const value = line
      .slice(separatorIndex + 1)
      .trim()
      .replace(/^["']|["']$/g, "")
    data[key] = value
  }

  return { data, content: content.trim() }
}
