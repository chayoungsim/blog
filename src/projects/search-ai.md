---
title: "SEO · AEO · GEO | Search & AI V2"
description: "검색엔진(SEO)·답변엔진(AEO)·생성형 AI 검색(GEO) 세 가지 관점을 한 앱에서 점검하는 웹사이트 최적화 진단 도구. GEO만 다루던 v1을 확장해 소개-진단-가이드 3단 구조로 재구성했고, React 19 + TypeScript + Vite로 만들었다."
github: "https://github.com/chayoungsim/search-ai"
site: "https://search-ai-beige.vercel.app/"
tech: "React 19, TypeScript, Vite, react-router, Sass"
date: "2026-09-02"
---

## 만든 이유

검색엔진(SEO)뿐 아니라 챗봇형 답변엔진(AEO)과 생성형 AI 검색(GEO)에서도 웹사이트가 잘 노출되는지 한 곳에서 확인하고 싶어서 만들었다. GEO 항목만 다뤘던 [GEO Audit Checklist](/projects/geo-audit)와 SEO·AEO·GEO를 나눠 점검하던 [Search & AI Optimization v1](/projects/geo-app)을 이어받아, 세 관점을 하나의 앱에서 "개념 이해 → 자가 진단 → 실행 가이드"까지 연결되도록 다시 구성했다.

## 세 가지 최적화 관점

- **SEO (Search Engine Optimization)** — 구글·네이버 같은 검색엔진의 결과 목록에 잘 노출되기 위한 최적화. 메타 태그, 제목 구조, 내부 링크, 사이트맵, 페이지 속도 등을 다룬다.
- **AEO (Answer Engine Optimization)** — 검색 결과의 발췌 답변, 음성 비서, 챗봇형 답변에서 직접 인용되도록 하는 최적화. 질문형 제목, 구조화 데이터(FAQ·HowTo), 간결한 요약 문단 등을 다룬다.
- **GEO (Generative Engine Optimization)** — ChatGPT·Perplexity·구글 AI 개요 같은 생성형 AI 검색이 콘텐츠를 근거로 인용하도록 하는 최적화. 출처 명시, 사실 기반 서술, 인용 가능한 데이터·수치, 크롤링 허용 설정 등을 다룬다.

## 페이지 구성

- **Overview** — SEO / AEO / GEO 세 전략을 나란히 비교하고, 전체 실행 흐름을 한눈에 보여주는 진입 페이지
- **SEO / AEO / GEO 전략 페이지** — 각 영역을 "소개 → 진단 → 가이드"의 동일한 3단 구조로 정리해, 개념을 익힌 뒤 바로 체크리스트로 자가 진단하고 개선 방법까지 확인
- **Strategy** — 세 관점을 실제 업무에 적용하는 단계별 워크플로우와 팀별 역할 정리
- **Contact / Audit** — 무료 진단·상담 신청 폼. 필드 검증과 파일 첨부(용량 표시·형식 확인) 지원

## 주요 기능

- SEO / AEO / GEO 영역별로 세분화한 점검 항목과 상세 설명을 체크리스트로 제공
- 모든 전략 페이지에 일관된 3단 구조(소개-진단-가이드)를 적용해 탐색 흐름을 통일
- 상담 신청 폼의 클라이언트 측 검증 로직과 파일 첨부 처리 구현
- 시맨틱 마크업과 aria 속성을 적용한 반응형 레이아웃

## 기술 구성

- **React 19 + TypeScript**를 **Vite**로 빌드, **react-router**로 라우팅 관리
- 스타일은 **Sass 7-1 아키텍처**로 계층화, 아이콘은 `lucide-react` 사용
- 페이지 텍스트와 체크리스트 데이터를 `data/` 레이어로 분리해 콘텐츠 수정이 쉽도록 구성
- **Vercel**로 배포

## 남은 작업

- 무료 진단 페이지의 결과 UI 구현
- 상담 폼의 실제 백엔드 연동
