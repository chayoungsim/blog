import { Link, useLoaderData } from "react-router-dom"
import Markdown from "react-markdown"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
import type { Project } from "@/types/project"

const ProjectDetail = () => {
  const project = useLoaderData() as Project

  useDocumentMeta({
    title: `${project.title} | My Blog`,
    description: project.description,
  })

  const techList = project.tech
    ? project.tech
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean)
    : []

  return (
    <article className="static project-detail">
      <Link to="/projects" className="post-detail-back">
        ← 프로젝트 목록으로
      </Link>
      <header className="project-detail-header">
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        {techList.length > 0 && (
          <ul className="project-card-tech">
            {techList.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        )}
        <div className="project-detail-links">
          {project.github && (
            <a href={project.github} className="project-detail-link" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          )}
          {project.site && (
            <a
              href={project.site}
              className="project-detail-link project-detail-link--secondary"
              target="_blank"
              rel="noreferrer"
            >
              사이트 방문 ↗
            </a>
          )}
        </div>
      </header>
      {project.content && (
        <div className="post-detail-content">
          <Markdown>{project.content}</Markdown>
        </div>
      )}
      <Link to="/projects" className="post-detail-back">
        ← 프로젝트 목록으로
      </Link>
    </article>
  )
}

export default ProjectDetail
