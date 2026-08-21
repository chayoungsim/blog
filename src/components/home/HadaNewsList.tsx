import hadaNews from "@/data/hada-news.json"
import type { HadaNewsItem } from "@/types/hadaNews"

const news = hadaNews as HadaNewsItem[]

function formatDate(published: string | null): string | null {
  if (!published) return null
  return published.slice(0, 10)
}

const HadaNewsList = () => {
  if (news.length === 0) return null

  return (
    <section className="hada-news" aria-labelledby="hada-news-heading">
      <div className="hada-news-header">
        <h2 id="hada-news-heading">GeekNews 최신 글</h2>
        <a href="https://news.hada.io" target="_blank" rel="noreferrer">
          news.hada.io
        </a>
      </div>
      <ul className="hada-news-list">
        {news.map((item) => (
          <li key={item.link}>
            <a href={item.link} target="_blank" rel="noreferrer">
              {item.title}
            </a>
            <span className="hada-news-meta">
              {item.author}
              {formatDate(item.published) && ` · ${formatDate(item.published)}`}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default HadaNewsList
