---
title: "커스텀 커맨트 : Git 커밋하기"
date: "2026-08-21"
description: "Claude Code 커스텀 슬래시 커맨드로 Git 커밋을 자동화하는 방법과 프로젝트·사용자·네임스페이스 명령어 구성 정리"
---

## 커스텀 커맨트
- 사용자 정의 슬래시 명령어
- 자주 사용하는 프롬프트를 Markdown 파일로 정의하여 claude code가 실행할 수 있습니다.
- 명령어는 범위(프로젝트별 또는 개일)로 구성되며 디렉토리 구조를 통한 네임스페이싱을 지원한다.

### 프로젝트 명령어 사용
- 위치 : .claude/commands/
- commit.md  (현재 변경사항을 분석하고 커밋을 생성해주세요.)
- /commit

### 사용자 명령어
- 위치 : ~/.claude/commands/

### 네임스페이스 명령어
- 위치 : .claude/commands/git/commit.md
- /git:commit
