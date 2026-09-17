---
title: "사이드 이펙트(side effect)"
date: "2026-09-17"
description: "사이드 이펙트와 컴포넌트 최적화"
---

## useEffect란?
- useEffect는 React에서 사이드 이펙트(side effect)를 처리하기 위해 사용되는 훅

```tsx
// useEffect(이펙트 함수, 의존성배열)
useEffect(() => {
  // 이펙트 함수
}, [의존성배열]);

//컴포넌트가 생성될 때만 호출됩니다.
useEffect(() => {

    // 컴포넌트가 삭제(언마운트) 될 때만 호출되는 코드는..
    return () => {
        console.log("컴포넌트가 삭제(언마운트) 되었습니다.");
    }

},[])

// 컴포넌트의 상태가 변경 되었을 때만 호출하려면
useEffect(() => {
  console.log("컴포넌트의 상태가 변경 되었습니다.");
},[count]);

``` 

## 컴포넌트 리렌더링 조건
- state가 변경되면 리렌더링
- props가 변경되면 리렌더링
- 부모 컴포넌트가 리렌더링 되었을 때
- 강제 호출 (forceUpdate)

## React.memo
- React.memo는 컴포넌트를 메모이제이션(memoization)하여 리렌더링을 최적화하는 함수
- props가 변경되지 않았을 때 리렌더링을 방지
- 성능이슈가 발생할 때 사용

```tsx
import React from "react";
import ChildB from "./ChildB";

export default React.memo(function ChildA() {
  console.log("ChildA");
  return (
    <>
      <h1>ChildA Component</h1>
      <ChildB />
    </>
  );
})
```
## useCallback
- props로 함수를 전달받은 자식 컴포넌트가 리렌더링 될 때, 함수도 다시 생성되어 리렌더링이 발생합니다.
- 이 때 useCallback을 사용하면 함수를 메모이제이션(memoization)하여 리렌더링을 방지할 수 있습니다.
```tsx
import React, { useState, useCallback } from "react";
import ChildA from "./ChildA";

export default function Parent() {
  const [parentCount, setParentCount] = useState(0);
  const [childCount, setChildCount] = useState(0);

  // useCallback을 사용하여 함수를 메모이제이션
  const handleChildClick = useCallback(() => {
    setChildCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <h1>Parent Component</h1>
      <p>Parent Count: {parentCount}</p>
      <button onClick={() => setParentCount((prev) => prev + 1)}>Parent Increment</button>

      {/* useCallback으로 메모이제이션된 함수 전달 */}
      <ChildA childCount={childCount} onClick={handleChildClick} />
    </div>
  );
}
```

## useMemo
- useMemo는 함수의 반환값을 메모이제이션(memoization)하여 리렌더링 시 불필요한 계산을 방지하는 훅
```tsx
import React, { useState, useMemo } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  // 이 연산은 count가 변경될 때만 실행되어야 합니다.
  // useMemo를 사용하면 count가 변경될 때만 연산이 다시 실행됩니다.
  const expensiveCalculation = useMemo(() => {
    console.log("Expensive calculation running...");
    return count * 10;
  }, [count]); // count가 변경될 때만 실행

  return (
    <div>
      <h1>useMemo Example</h1>
      <p>Count: {count}</p>
      <p>Expensive Calculation: {expensiveCalculation}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment Count</button>
      
      <br />
      
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type something..."
      />
      <p>Name: {name}</p>
    </div>
  );
}
```
## React.lazy와 Suspense
- React.lazy()는 컴포넌트를 동적으로 로드하는 함수
- Suspense는 로드 중인 컴포넌트를 표시하는 컴포넌트
```tsx
import React, { lazy, Suspense } from "react";

// 동적으로 컴포넌트 로드
const OtherComponent = lazy(() => import("./OtherComponent"));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

## Error Boundary
- 에러 바운더리는 렌더링 도중에 발생하는 자바스크립트 에러를 잡아서 앱 전체가 멈추지 않도록 방지하고 
- 대체 UI를 보여주는 특수한 React 컴포넌트 입니다.
- react-error-boundary 라이브러리를 사용하면 쉽게 구현할 수 있습니다.
```tsx
import { ErrorBoundary } from 'react-error-boundary'

function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
    </div>
  )
}

function App() {
  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <MyWidget />
      </ErrorBoundary>
    </div>
  )
}

```
