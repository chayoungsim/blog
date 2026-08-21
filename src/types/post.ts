export interface PostFrontmatter {
  title: string
  date: string
  category: string
  description: string
}

export interface Post extends PostFrontmatter {
  slug: string
  content: string
}
