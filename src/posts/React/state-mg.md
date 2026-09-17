---
title: "전역 상태관리"
date: "2026-09-18"
description: "contextAPI, Redux, ToolKit, Zustand"
---

## Context API란?
- Context 객체라는 것을 생성한다
- 객체의 데이터 공유 범위와 공유할 데이터를 설정한다.
```
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

## Redux란?

## ToolKit 이란?

## Zustand란?