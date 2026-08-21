import { Link } from "react-router-dom"
import type { Project } from "@/types/project"

interface ProjectCardProps {
  project: Project
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const techList = project.tech
    ? project.tech
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean)
    : []

  return (
    <Link to={`/projects/${project.slug}`} className="project-card">
      <h2 className="project-card-title">{project.title}</h2>
      <p className="project-card-description">{project.description}</p>
      {techList.length > 0 && (
        <ul className="project-card-tech">
          {techList.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      )}
    </Link>
  )
}

export default ProjectCard
