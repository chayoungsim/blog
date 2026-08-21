---
title: "chayoungsim TECH 블로그"
description: "React + TypeScript + Vite로 처음부터 만든 개발 기술 블로그. Markdown 글쓰기, 카테고리, 다크모드, GitHub Actions 자동 배포까지 직접 구현했다."
github: "https://github.com/chayoungsim/blog"
site: "https://chayoungsim.github.io/blog/"
tech: "React, TypeScript, Vite, SCSS, React Router, GitHub Actions"
date: "2026-08-21"
---

## 만든 이유

React를 제대로 익히면서 동시에 Git/GitHub, Markdown 글쓰기, SEO, 접근성, 반응형, 배포까지 한 번에 연습하고 싶어서 시작했다. 튜토리얼을 따라 만드는 대신, 빈 폴더에서부터 라우팅 → Markdown 파이프라인 → 카테고리 → 배포 순서로 실제 폴더와 코드를 하나씩 쌓아 올렸다.

## 주요 기능

- `src/posts/카테고리명/*.md` 폴더 구조만으로 글 목록·상세·카테고리 페이지가 자동 생성된다.
- React Router의 데이터 라우터(`loader`)로 라우트 진입 시점에 필요한 데이터를 준비한다.
- 라이트/다크 모드 토글, 시스템 설정 감지, localStorage 저장.
- `main` 브랜치에 push하면 GitHub Actions가 빌드부터 GitHub Pages 배포까지 자동으로 처리한다.

## 배운 점

GitHub Pages처럼 서브패스(`/blog/`)에 배포할 때는 HTML이 아닌 곳(JS 코드, CSS의 절대경로)에서 참조하는 정적 자산은 Vite가 자동으로 경로를 보정해주지 않는다는 걸 실제로 버그를 겪으면서 알게 됐다. 상대경로 import나 `import.meta.env.BASE_URL`로 명시적으로 처리해야 한다.
