import { Link } from "react-router-dom"
import HadaNewsList from "@/components/home/HadaNewsList"
import ProjectsPreview from "@/components/home/ProjectsPreview"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"

const Home = () => {
  useDocumentMeta({
    title: "My Blog — 홈",
    description: "React, Git/GitHub, 접근성, SEO 등을 직접 만들어보며 정리하는 개발 기술 블로그입니다.",
  })

  return (
    <section className="static">
      <h1>홈</h1>
      <p>React, Git/GitHub, 접근성, SEO 등을 직접 만들어보며 정리하는 개발 기술 블로그입니다.</p>
      <p>
        <Link to="/posts">글 목록 보러가기</Link>
      </p>
      <ProjectsPreview />
      <HadaNewsList />
    </section>
  )
}

export default Home
