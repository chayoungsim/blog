import { useLoaderData } from "react-router-dom"
import ProjectList from "@/components/project/ProjectList"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
import type { Project } from "@/types/project"

const Projects = () => {
  const projects = useLoaderData() as Project[]

  useDocumentMeta({
    title: "Projects | My Blog",
    description: "직접 만든 프로젝트 목록입니다.",
  })

  return (
    <section className="static">
      <h1>Projects</h1>
      <ProjectList projects={projects} />
    </section>
  )
}

export default Projects
