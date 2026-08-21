import { useDocumentMeta } from "@/hooks/useDocumentMeta"

const About = () => {
  useDocumentMeta({
    title: "About | My Blog",
    description: "이 블로그를 만든 목적과 다루는 주제를 소개합니다.",
  })

  return (
    <section className="static">
      <h1>About</h1>
      <p>
        React 학습, Git/GitHub 협업, Markdown 기반 글쓰기, 접근성과 SEO까지 — 직접 폴더와 코드를
        하나씩 만들어가며 기록하는 개발 기술 블로그입니다.
      </p>
    </section>
  )
}

export default About
