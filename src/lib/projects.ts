import { parseFrontmatter } from "@/lib/frontmatter"
import type { Project, ProjectFrontmatter } from "@/types/project"

// src/projects/*.md — 아직 등록된 프로젝트가 없으면 빈 배열이 된다(오류 아님).
const projectModules = import.meta.glob("/src/projects/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>

function slugFromPath(path: string): string {
  const filename = path.split("/").pop() ?? path
  return filename.replace(/\.md$/, "")
}

const projects: Project[] = Object.entries(projectModules)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw)
    return {
      ...(data as unknown as ProjectFrontmatter),
      slug: slugFromPath(path),
      content,
    }
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export function getAllProjects(): Project[] {
  return projects
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
