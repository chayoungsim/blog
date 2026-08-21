# My Blog

GitHub를 이용한 개발자 기술 블로그입니다. Markdown으로 글을 쓰면 글 목록·상세·카테고리 페이지가 자동으로 생성되고, `main` 브랜치에 push하면 GitHub Actions가 자동으로 빌드해 GitHub Pages에 배포합니다.

React 학습 + Git/GitHub + Markdown + SEO + 접근성 + 반응형 + 배포를 한 번에 연습하는 프로젝트로, 실제 폴더와 코드를 단계별로 하나씩 만들어가며 진행했습니다.

## 배포

<https://chayoungsim.github.io/blog/>

## 기술 스택

- React 19 + TypeScript
- Vite 8
- React Router 7 (데이터 라우터: `createBrowserRouter` + `loader`)
- SCSS (7-1 아키텍처)
- react-markdown

## 글 작성 방법

1. `src/posts/카테고리명/` 아래에 `.md` 파일을 추가합니다. **카테고리는 frontmatter가 아니라 폴더명으로 정해집니다.** 파일명이 곧 글 주소(`/posts/파일명`)가 됩니다.
2. 파일 맨 위에 frontmatter를 채웁니다.

   ```md
   ---
   title: "글 제목"
   date: "2026-01-01"
   description: "목록/검색엔진에 노출될 한 줄 요약"
   ---

   본문은 여기부터 Markdown으로 작성합니다.
   ```

3. 저장 후 `npm run dev`로 확인하면 `/posts` 목록과 `/category/카테고리명`에 자동으로 반영됩니다. 별도로 목록을 수정하거나 라우트를 추가할 필요가 없습니다. 새 카테고리도 `src/posts/` 아래에 폴더만 새로 만들면 바로 생깁니다.

현재 카테고리: `React`, `TypeScript`, `CSS`, `Animation`, `Accessibility`, `TIL`, `Git`

## 폴더 구조

```
src/
├── components/
│   ├── blog/       # PostCard, PostList, CategoryNav
│   └── common/      # Header, Footer, Container
├── pages/           # 라우트에 연결되는 페이지 컴포넌트
├── posts/           # src/posts/카테고리명/글.md
├── lib/             # posts.ts(글 로딩/파싱), frontmatter.ts
├── hooks/           # useDocumentMeta 등
├── routes/          # router.tsx (라우트 정의)
├── styles/          # SCSS 7-1 아키텍처
└── types/
```

## 개발

```bash
npm install
npm run dev      # http://localhost:5173/blog/ (base가 /blog/라 하위 경로에서 뜹니다)
npm run build     # 타입체크 + 정적 사이트 빌드 (dist/)
npm run lint
```

## 배포 방식

- `.github/workflows/deploy.yml`: `main` push 시 lint → build → GitHub Pages 배포까지 자동 실행됩니다.
- `vite.config.ts`의 `base`와 `src/routes/router.tsx`의 `basename`이 `/blog`로 맞춰져 있습니다 (저장소 이름이 바뀌면 두 곳을 함께 바꿔야 합니다).
- `npm run build` 시 `scripts/generate-sitemap.mjs`가 `src/posts/`를 읽어 `public/sitemap.xml`을 자동 생성하고, `scripts/copy-404.mjs`가 `dist/index.html`을 `dist/404.html`로 복제해 GitHub Pages에서 새로고침 시에도 클라이언트 라우팅이 깨지지 않도록 합니다.
- 저장소의 **Settings → Pages → Build and deployment → Source**를 "GitHub Actions"로 설정해야 워크플로우가 실제로 배포합니다(최초 1회 수동 설정 필요).
