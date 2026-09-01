import { useDocumentMeta } from "@/hooks/useDocumentMeta"

const About = () => {
  useDocumentMeta({
    title: "About | My Blog",
    description: "이 블로그를 만든 목적과 다루는 주제, 퍼블리싱 파트 로드맵을 소개합니다.",
  })

  return (
    <section className="static about">
      <h1>About</h1>
      <p className="about-lead">
        React 학습, Git/GitHub 협업, Markdown 기반 글쓰기, 접근성과 SEO까지 — 직접 폴더와 코드를
        하나씩 만들어가며 기록하는 개발 기술 블로그입니다.
      </p>

      <div className="about-roadmap">
        <h2>퍼블리싱 파트 로드맵</h2>
        <p className="about-roadmap__intro">
          현재 진행 중인 작업, 해야 할 작업, 앞으로 나아가야 할 방향을 세 축으로 정리한 문서입니다.
        </p>

        <ul className="about-axes">
          <li className="about-axis" data-index="01">
            <p className="about-axis__title">생산성 극대화</p>
            <p className="about-axis__desc">내부 자산(Asset) 고도화</p>
          </li>
          <li className="about-axis" data-index="02">
            <p className="about-axis__title">기술 확장</p>
            <p className="about-axis__desc">프레임워크·언어 역량 확대</p>
          </li>
          <li className="about-axis" data-index="03">
            <p className="about-axis__title">업무 프로세스 효율화</p>
            <p className="about-axis__desc">AI 워크플로우 도입</p>
          </li>
        </ul>

        <div className="about-track">
          <h3 data-step="1">생산성 극대화 — 내부 자산(Asset) 고도화</h3>
          <p className="about-track__desc">
            반복 작업을 표준화된 자산으로 축적해 파트 전체의 생산성을 끌어올리는 것을 목표로 합니다.
          </p>
          <ul className="about-track__list">
            <li>
              <strong>공통 UI 라이브러리 구축</strong> — 재사용 가능한 UI 컴포넌트를 표준화해 라이브러리로 관리
            </li>
            <li>
              <strong>디자인 시스템 구축</strong> — 색상·타이포·간격 등 디자인 토큰과 컴포넌트 규칙 체계화
            </li>
            <li>
              <strong>UI 패턴 모음 제작</strong> — 자주 쓰이는 인터랙션·레이아웃 패턴을 템플릿으로 정리
            </li>
            <li>
              <strong>접근성 개선</strong> — 웹 접근성 표준(WCAG) 기반의 마크업·검증 체계 마련
            </li>
            <li>
              <strong>성능 개선</strong> — 이미지 최적화, Lazy Loading, Font 최적화, CSS 최적화, JS 최적화
            </li>
            <li>
              <strong>GSAP 모션 라이브러리 제작</strong> — 재사용 가능한 스크롤·모션 프리셋을 라이브러리로 구성
            </li>
            <li>
              <strong>퍼블리싱 가이드 제작</strong> — 마크업 규칙·네이밍·구조 등 파트 공통 작업 가이드 문서화
            </li>
            <li>
              <strong>사내 템플릿 제작</strong> — HTML Starter, React Starter, Next Starter
            </li>
          </ul>
        </div>

        <div className="about-track">
          <h3 data-step="2">기술 확장</h3>
          <p className="about-track__desc">퍼블리싱을 넘어 인터랙티브·프론트엔드 개발 역량을 확대합니다.</p>
          <ul className="about-track__list about-track__list--plain">
            <li>React</li>
            <li>Next.js</li>
            <li>TypeScript</li>
            <li>GSAP</li>
          </ul>
        </div>

        <div className="about-track">
          <h3 data-step="3">업무 프로세스 효율화 — AI 워크플로우 도입</h3>
          <p className="about-track__desc">
            반복 작업을 AI로 자동화하고, 파트 차원의 AI 활용 체계를 구축합니다.
          </p>
          <ul className="about-track__list">
            <li>
              <strong>AI 활용 연구</strong> — Claude Code 같은 AI 도구로 반복 작업 자동화 방안 연구
            </li>
            <li>
              <strong>AI 활용 체계(AI Workflow) 구축</strong> — 파트 내 AI 활용을 표준 프로세스로 체계화
            </li>
            <li>
              <strong>코드 검증 자동화 · 리팩토링 프롬프트 가이드</strong> — 코드 리뷰/검증 자동화 및 리팩토링용
              프롬프트 가이드 정비
            </li>
            <li>
              <strong>AI Publisher Assistant</strong> — 퍼블리셔가 반복적으로 수행하는 작업을 AI가 도와주는 웹
              애플리케이션
            </li>
          </ul>

          <div className="about-subblock">
            <h4>AI Publisher Assistant 자동화 대상</h4>
            <ul className="about-tags">
              <li>Figma 디자인 → HTML 구조 초안 생성</li>
              <li>디자인 시안 분석 → 컴포넌트 목록 추출</li>
              <li>IA 문서 자동 생성</li>
              <li>Sitemap 자동 생성</li>
              <li>디자인 토큰 생성</li>
              <li>SCSS 변수 생성</li>
              <li>접근성 검사</li>
              <li>메타 태그 생성</li>
              <li>이미지 alt 문구 제안</li>
              <li>코드 리뷰 및 개선 제안</li>
            </ul>
          </div>

          <div className="about-subblock">
            <h4>활용 기술 스택</h4>
            <ul className="about-tags">
              <li>OpenAI API</li>
              <li>MCP</li>
              <li>RAG</li>
              <li>AI Agent</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
