import { useLoaderData } from "react-router-dom"
import Markdown from "react-markdown"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
import type { Post } from "@/types/post"

const PostDetail = () => {
  const post = useLoaderData() as Post

  useDocumentMeta({
    title: `${post.title} | My Blog`,
    description: post.description,
  })

  return (
    <article className="static post-detail">
      <header className="post-detail-header">
        <span className="post-card-category">{post.category}</span>
        <h1>{post.title}</h1>
        <time dateTime={post.date}>{post.date}</time>
      </header>
      <div className="post-detail-content">
        <Markdown>{post.content}</Markdown>
      </div>
    </article>
  )
}

export default PostDetail
