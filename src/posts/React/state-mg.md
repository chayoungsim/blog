---
title: "전역 상태관리"
date: "2026-09-18"
description: "contextAPI, Redux, ToolKit, Zustand"
---

## Context API란?
- Context 객체라는 것을 생성한다
- 객체의 데이터 공유 범위와 공유할 데이터를 설정한다.
```tsx
import { createContext, useContext } from "react";
const MyContext = createContext(defaultValue);
```
- Provider 컴포넌트를 사용하여 Context 객체의 값을 설정합니다.
```tsx
function App() {
  return (
    <MyContext.Provider value={value}>
      <MyComponent />
    </MyContext.Provider>
  );
}
```
- Provider가 감싸고 있는 하위 컴포넌트에서 Context 객체의 값을 사용할 수 있습니다.
```tsx
function MyComponent() {
  const value = useContext(MyContext);
  return <div>Value: {value}</div>;
}
```

## Redux Toolkit (RTK)
- Redux의 복잡한 설정과 보일러플레이트 코드를 줄이기 위해 만들어진 Redux의 상위 래퍼 라이브러리
- 패키지 설치해서 사용 [https://redux-toolkit.js.org/](https://redux-toolkit.js.org/)

```tsx
//redux-toolkit 설치
npm install @reduxjs/toolkit react-redux

// redux store 생성
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
```

## Zustand
- Redux Toolkit보다 훨씬 간편하고 직관적인 코드 작성이 가능하다
- 패키지 설치해서 사용 [https://zustand-demo.pmnd.rs/](https://zustand-demo.pmnd.rs/)

```tsx
import { create } from 'zustand'

const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  decreasePopulation: () => set((state) => ({ bears: state.bears - 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))
```
### 미들웨어(middleware)
- 스토어의 동작을 확장하거나 가로채서 제어할 수 있도록 도와주는 기능
#### persist
- 로컬스토리지(localStorage)에 상태를 저장하는 미들웨어

#### subscribeWithSelector
- 특정 상태가 변경될 때를 감지해서 특정 로직을 수행할 수 있는 구독 기능을 사용할 수 있게 해주는 미들웨어

#### immer
- 자동으로 불변성을 처리해주는 미들웨어
- 상태를 직접 수정하는 것처럼 코드를 작성해도 내부적으로 불변성을 유지하면서 상태를 변경해주는 라이브러리
```tsx
// immer 설치
npm install immer

import { create } from 'zustand/middleware/immer'

const useStore = create(immer((set) => ({
  user: { name: 'John', address: { city: 'New York' } },
  updateCity: (city: string) =>
    set((state) => {
      state.user.address.city = city
    }),
})))
```