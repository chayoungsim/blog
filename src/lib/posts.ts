import { parseFrontmatter } from "@/lib/frontmatter"
import type { Post, PostFrontmatter } from "@/types/post"

// src/posts/<카테고리 폴더>/<글>.md 구조. 카테고리는 frontmatter가 아니라
// 폴더명에서 그대로 읽어와, 폴더 이동만으로 카테고리를 바꿀 수 있게 한다.
const postModules = import.meta.glob("/src/posts/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>

function categoryFromPath(path: string): string {
  const relative = path.replace("/src/posts/", "")
  return relative.split("/")[0]
}

function slugFromPath(path: string): string {
  const filename = path.split("/").pop() ?? path
  return filename.replace(/\.md$/, "")
}

const posts: Post[] = Object.entries(postModules)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw)
    return {
      ...(data as unknown as PostFrontmatter),
      slug: slugFromPath(path),
      category: categoryFromPath(path),
      content,
    }
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export function getAllPosts(): Post[] {
  return posts
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getAllCategories(): string[] {
  return Array.from(new Set(posts.map((post) => post.category))).sort()
}

export function getPostsByCategory(category: string): Post[] {
  return posts.filter((post) => post.category === category)
}
