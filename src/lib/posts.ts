import { parseFrontmatter } from "@/lib/frontmatter"
import type { Post, PostFrontmatter } from "@/types/post"

const postModules = import.meta.glob("/src/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>

function slugFromPath(path: string): string {
  return path.replace("/src/posts/", "").replace(/\.md$/, "")
}

const posts: Post[] = Object.entries(postModules)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw)
    return {
      ...(data as unknown as PostFrontmatter),
      slug: slugFromPath(path),
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
