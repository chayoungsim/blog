---
title: "TIL: git add를 잘못 눌렀을 때는 git restore --staged"
date: "2026-08-20"
description: "git reset HEAD 대신 최근엔 git restore --staged가 더 명확한 명령이라는 걸 알게 됐다."
---

무심코 `git add .`를 눌렀다가 원치 않는 파일까지 스테이징된 적이 있다. 예전엔 `git reset HEAD <파일>`을 썼는데, `reset`은 커밋 되돌리기에도 쓰이는 명령이라 이름만 보면 무슨 일이 일어나는지 헷갈렸다.

```bash
# 특정 파일만 스테이징 해제
git restore --staged <파일>

# 전체 스테이징 해제
git restore --staged .
```

`restore`는 이름 그대로 "작업 상태를 되돌린다"는 의도가 명확하고, 워킹 디렉터리 파일 자체는 건드리지 않는다(그래서 작업 내용은 안전하게 남아 있음). Git 2.23부터 추가된 명령이라 오래된 튜토리얼에는 잘 안 나오지만, 지금은 이쪽을 먼저 찾아본다.
