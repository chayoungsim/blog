import { useLoaderData } from "react-router-dom"
import CategoryNav from "@/components/blog/CategoryNav"
import PostList from "@/components/blog/PostList"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
import type { Post } from "@/types/post"

const Posts = () => {
  const posts = useLoaderData() as Post[]

  useDocumentMeta({
    title: "글 목록 | My Blog",
    description: "React, Git, 접근성 등 카테고리별로 정리한 개발 기록 글 목록입니다.",
  })

  return (
    <section className="static">
      <h1>글 목록</h1>
      <CategoryNav />
      <PostList posts={posts} />
    </section>
  )
}

export default Posts
