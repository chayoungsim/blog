export interface ProjectFrontmatter {
  title: string
  description: string
  github?: string
  site?: string
  tech: string
  date: string
}

export interface Project extends ProjectFrontmatter {
  slug: string
  content: string
}
