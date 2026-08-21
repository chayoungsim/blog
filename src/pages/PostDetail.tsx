import { Link, useLoaderData } from "react-router-dom"
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
      <Link to="/posts" className="post-detail-back">
        ← 글 목록으로
      </Link>
      <header className="post-detail-header">
        
        <h1>{post.title}</h1>
        <time dateTime={post.date}>{post.date}</time>
        <span className="post-card-category">{post.category}</span>
      </header>
      <div className="post-detail-content">
        <Markdown>{post.content}</Markdown>
      </div>
      <Link to="/posts" className="post-detail-back">
        ← 글 목록으로
      </Link>
    </article>
  )
}

export default PostDetail
