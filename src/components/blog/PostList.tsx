import { useState } from "react"
import PostCard from "@/components/blog/PostCard"
import Pagination from "@/components/blog/Pagination"
import type { Post } from "@/types/post"

const PAGE_SIZE = 5

interface PostListProps {
  posts: Post[]
}

const PostList = ({ posts }: PostListProps) => {
  const [page, setPage] = useState(1)
  const [prevPosts, setPrevPosts] = useState(posts)

  // 카테고리 이동 등으로 posts가 바뀌면 페이지를 처음으로 되돌린다.
  if (posts !== prevPosts) {
    setPrevPosts(posts)
    setPage(1)
  }

  if (posts.length === 0) {
    return <p>아직 작성된 글이 없습니다.</p>
  }

  const totalPages = Math.ceil(posts.length / PAGE_SIZE)
  const pagedPosts = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <>
      <ul className="post-list">
        {pagedPosts.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </>
  )
}

export default PostList
