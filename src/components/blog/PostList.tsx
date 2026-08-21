import PostCard from "@/components/blog/PostCard"
import type { Post } from "@/types/post"

interface PostListProps {
  posts: Post[]
}

const PostList = ({ posts }: PostListProps) => {
  if (posts.length === 0) {
    return <p>아직 작성된 글이 없습니다.</p>
  }

  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.slug}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
}

export default PostList
