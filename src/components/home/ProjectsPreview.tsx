import { Link } from "react-router-dom"
import ProjectCard from "@/components/project/ProjectCard"
import { getAllProjects } from "@/lib/projects"

const PREVIEW_COUNT = 3

const ProjectsPreview = () => {
  const projects = getAllProjects().slice(0, PREVIEW_COUNT)

  if (projects.length === 0) return null

  return (
    <section className="projects-preview" aria-labelledby="projects-preview-heading">
      <div className="projects-preview-header">
        <h2 id="projects-preview-heading">Projects</h2>
        <Link to="/projects">전체 프로젝트 보기</Link>
      </div>
      <ul className="project-list">
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProjectsPreview
