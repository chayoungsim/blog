import { Link } from "react-router-dom"
import type { Post } from "@/types/post"

interface PostCardProps {
  post: Post
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link to={`/posts/${post.slug}`} className="post-card">
      <span className="post-card-category">{post.category}</span>
      <h2 className="post-card-title">{post.title}</h2>
      <p className="post-card-description">{post.description}</p>
      <time className="post-card-date" dateTime={post.date}>
        {post.date}
      </time>
    </Link>
  )
}

export default PostCard
