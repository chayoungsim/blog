---
title: "React state 관리, useState와 useReducer 언제 나눠 쓸까"
date: "2026-08-10"
description: "간단한 토글은 useState로, 상태 전이가 복잡해지면 useReducer로 옮기며 기준을 정리했다."
---

## 시작하며

컴포넌트에 상태가 하나둘 늘어나기 시작하면 `useState`만으로는 관리가 번거로워지는 시점이 온다. 이번 글에서는 어떤 기준으로 `useReducer`로 옮기는지 정리한다.

## useState가 충분한 경우

- 상태 값이 서로 독립적이다.
- 다음 상태가 이전 상태에 단순히 의존한다 (`setCount(c => c + 1)` 정도).

## useReducer가 더 나은 경우

- 여러 상태가 하나의 액션으로 동시에 바뀐다.
- "이전 상태 + 액션 타입"으로 다음 상태를 예측 가능하게 정의하고 싶다.

```tsx
type Action = { type: "open" } | { type: "close" }

function reducer(state: boolean, action: Action) {
  switch (action.type) {
    case "open":
      return true
    case "close":
      return false
  }
}
```

## 정리

기준은 "상태 전이 로직을 컴포넌트 밖으로 분리해서 테스트하고 싶은가"다. 그렇다면 `useReducer`가 유리하다.
