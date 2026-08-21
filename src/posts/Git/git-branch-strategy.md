---
title: "혼자 하는 프로젝트에서도 브랜치 전략이 필요한 이유"
date: "2026-07-28"
description: "1인 프로젝트라도 main과 feature 브랜치를 분리하니 되돌리기가 훨씬 쉬워졌다."
---

## 문제

혼자 진행하는 프로젝트라 항상 `main`에 바로 커밋해왔는데, 실험적인 변경이 화면을 깨뜨렸을 때 되돌리기가 번거로웠다.

## 적용한 규칙

- `main`: 항상 배포 가능한 상태 유지
- `feature/기능명`: 기능 단위 작업
- `fix/버그명`: 버그 수정 단위 작업

## 커밋 단위

한 커밋에는 하나의 의도만 담는다. 예를 들어 "라우팅 연결"과 "스타일 정리"는 분리한다.

```bash
git checkout -b feature/markdown-pipeline
git add src/lib/posts.ts src/posts
git commit -m "feat: Markdown 파이프라인 유틸 추가"
```

## 정리

브랜치를 나누는 비용보다, `main`이 깨졌을 때 원인을 찾는 비용이 훨씬 크다는 걸 체감했다.
