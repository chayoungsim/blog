import { useLoaderData, useParams } from "react-router-dom"
import CategoryNav from "@/components/blog/CategoryNav"
import PostList from "@/components/blog/PostList"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
import type { Post } from "@/types/post"

const CategoryPage = () => {
  const posts = useLoaderData() as Post[]
  const { category } = useParams()

  useDocumentMeta({
    title: `${category} | My Blog`,
    description: `${category} 카테고리에 속한 글 목록입니다.`,
  })

  return (
    <section className="static">
      <h1>{category}</h1>
      <CategoryNav />
      <PostList posts={posts} />
    </section>
  )
}

export default CategoryPage
