---
title: "Nextjs"
date: "2026-09-02"
description: "create-next-app으로 Next.js 프로젝트를 생성할 때의 설정 선택지(TypeScript, ESLint, React Compiler, Tailwind, src 디렉터리, App Router, import alias)와 각 선택의 이유를 정리합니다."
---

## Installation
- [Quick Start](https://nextjs.org/docs/app/getting-started/installation)
```ts
npx create-next-app@latest .  //현재폴더에 설치

TypeScript       → Yes
Linter           → ESLint // Next.js 생태계와 호환성이 좋고 가장 보편적
React Compiler   → Yes    // React의 자동 최적화 활용
Tailwind CSS     → Yes
src/ directory   → Yes    // 소스 코드와 설정 파일 분리
App Router       → Yes    // 현재 Next.js의 주력 라우팅 방식
Import alias     → Yes    // @/* 사용 추천
Alias            → @/*    // 가장 일반적이고 직관적
AGENTS.md        → Yes    // AI 코딩 에이전트를 사용할 경우 특히 유용

```
- ESLint는 코드의 문제나 좋지 않은 패턴을 찾아주는 도구입니다.
- src/를 사용해서 실제 애플리케이션 코드와 프로젝트 설정 파일을 분리하는 것이 깔끔합니다.
- App Router를 새로운 라우터이며 Server Components 같은 새로운 React 기능을 지원하는 방식으로 설명하고 있습니다
- App Router에서는 폴더 구조 자체가 URL 구조가 됩니다.
- TypeScript + ESLint + React Compiler + Tailwind + src + App Router + @/* + AGENTS.md (2026년)

### 프로젝트 구성
- Nextjs Latest (16.3.4)
- TypeScript
- Tailwind
- 

