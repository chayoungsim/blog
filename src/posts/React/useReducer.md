---
title: "useReducer"
date: "2026-09-18"
description: "상태(state)를 변경하는 규칙을 한곳에서 관리하는 React Hook"
---

## useReducer란?
- useReducer는 useState의 대체제로, 더 복잡한 상태 관리에 사용됩니다.
- useReducer는 상태를 업데이트하는 함수와 상태를 초기화하는 함수를 반환합니다.  
```tsx
import React, { useReducer } from 'react';

// 1. Action Type 정의 (보통 문자열 상수로 정의)
const ActionTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
};

// 2. Reducer 함수 정의
// state: 현재 상태
// action: 상태를 어떻게 바꿀지 담긴 객체
function reducer(state, action) {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return { count: state.count + 1 };
    case ActionTypes.DECREMENT:
      return { count: state.count - 1 };
    case ActionTypes.RESET:
      return { count: 0 };
    default:
      return state; // 알 수 없는 action이면 현재 상태 반환
  }
}

// 3. 컴포넌트에서 사용
function Counter() {
  // useReducer를 사용하여 상태와 dispatch 함수를 가져옴
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: ActionTypes.INCREMENT })}>Increment</button>
      <button onClick={() => dispatch({ type: ActionTypes.DECREMENT })}>Decrement</button>
      <button onClick={() => dispatch({ type: ActionTypes.RESET })}>Reset</button>
    </div>
  );
}
```