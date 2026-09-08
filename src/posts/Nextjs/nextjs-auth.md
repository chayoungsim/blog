---
title: "Nextjs 로그인/회원가입 기능추가"
date: "2026-09-07"
description: "Next.js App Router에 NextAuth.js v5로 이메일/비밀번호와 OAuth 소셜 로그인을 붙이는 단계별 과정과 Callback URL 설정, redirect_uri_mismatch 트러블슈팅을 정리합니다."
---

## 기술 스택 및 라이브러리 개요:
Next.js 15+ (App Router), TypeScript, Tailwind CSS v4, NextAuth.js v5 (next-auth@beta), bcryptjs

## 단계별 작업 내역 순서:
- 1단계: 패키지 설치 (next-auth@beta, bcryptjs)
- 2단계: 환경 변수 설정 (.env.local)
- 3단계: 유저 데이터 헬퍼 작성 (src/lib/users.ts)
- 4단계: NextAuth 핵심 환경 구성 (src/auth.ts)
- 5단계: Catch-all API 라우트 핸들러 (src/app/api/auth/[...nextauth]/route.ts)
- 6단계: UI 페이지 및 컴포넌트 연동 (Header, Login, Signup, Home)

### OAuth 소셜 로그인 Callback URL 설정 가이드:
GitHub: http://localhost:3000/api/auth/callback/github
Google: http://localhost:3000/api/auth/callback/google

### 자주 발생하는 트러블슈팅 정리:
redirect_uri_mismatch 포트 불일치 원인 및 해결법
크롬 브라우저 비밀번호 유출 경고 팝업 원인 및 대처법
테스트 기본 계정 정보