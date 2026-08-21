export interface PostFrontmatter {
  title: string
  date: string
  description: string
}

export interface Post extends PostFrontmatter {
  slug: string
  category: string
  content: string
}
