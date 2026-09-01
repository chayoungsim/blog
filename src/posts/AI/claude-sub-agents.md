---
title: "Claude sub agents"
date: "2026-09-01"
description: "Claude Code 서브에이전트로 컨텍스트를 분리하고 도구를 제한하는 특화 워크플로우 구성과 사용자 정의 에이전트 활용법"
---

## sub agents
- 작업별 워크플로우 및 향상된 컨텍스트 관리를 위한 특화
- subagent는 자신의 컨텍스트에서 해당 작업을 수행하고 요약만 반환합니다

- 컨텍스트 보존 - 탐색 및 구현을 주 대화에서 분리하여 유지
- 제약 조건 적용 - subagent가 사용할 수 있는 도구 제한
- 구성 재사용 - 사용자 수준 subagent를 통해 프로젝트 간 구성 재사용
- 동작 특화 - 특정 도메인을 위한 집중된 시스템 프롬프트
- 비용 제어 - Haiku와 같은 더 빠르고 저렴한 모델로 작업 라우팅


## 사용자 정의 agents
- 이 프로젝트에서만 쓰려면 → .claude/agents/
- 내 모든 프로젝트에서 쓰려면 → ~/.claude/agents/

### a11y-auditor 접근성 검사 서브에이전트 (모든프로젝트)
#### 사용법
- 수동: a11y-auditor 서브에이전트로 components 폴더 접근성 검사해줘
- 자동: 접근성 관련 요청 맥락에서 Claude가 위임

### code-reviewer
#### 사용법
- code-reviewer 서브에이전트로 리뷰해줘
- @agent-code-reviewer