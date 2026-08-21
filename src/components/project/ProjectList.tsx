import ProjectCard from "@/components/project/ProjectCard"
import type { Project } from "@/types/project"

interface ProjectListProps {
  projects: Project[]
}

const ProjectList = ({ projects }: ProjectListProps) => {
  if (projects.length === 0) {
    return <p>아직 등록된 프로젝트가 없습니다.</p>
  }

  return (
    <ul className="project-list">
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  )
}

export default ProjectList
