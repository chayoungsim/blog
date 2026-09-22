---
title: "데이터 통신 심화"
date: "2026-09-22"
description: "useTransition, useActionState, useFormStatus, useOptimistic, use, Suspense, ErrorBoundary"
---

## useTransition
- React의 상태 업데이트에는 긴급 업데이트(urgent update)와 트랜지션 업데이트(transition update) 두 가지 종류가 있습니다.
  - 긴급 업데이트: 입력, 클릭 등 즉시 화면에 반영되어야 하는 업데이트
  - 트랜지션 업데이트: 화면 전환처럼 다소 지연되어도 괜찮은, 급하지 않은 업데이트
- const [isPending, startTransition] = useTransition()
  - isPending: 트랜지션이 아직 진행 중인지 여부
  - startTransition: 긴급하지 않은 상태 업데이트를 감싸서 실행하는 함수
```tsx
import { useTransition } from 'react';

function TabContainer() {
    const [isPending, startTransition] = useTransition();
    const [tab, setTab] = useState('about');

    function selectTab(nextTab: string) {
        startTransition(() => {
            setTab(nextTab);
        });
    }

    return (
        <>
            {isPending && <Spinner />}
            <TabButton onClick={() => selectTab('about')}>About</TabButton>
        </>
    );
}
```

## useActionState
- const [state, formAction, isPending] = useActionState(fn, initialState)
  - state: 현재상태값
  - formAction: form태그를 사용할 경우 action 속성에 전달되는 함수
  - isPending: 액션 처리중 여부(true/false)
  - fn : 액션이 발생했을 때 실행할 함수
  - initialState : 초기값

## useFormStatus
- 상위 폼(form)에 대한 상태 정보를 가져올 수 있는 리액트 훅
- const {pending, data, method, action} = useFormStatus()
  - pending: 폼(액션)이 처리 중인지 여부
  - data: 폼 데이터 (formData) 객체 참조
  - method: 폼 메서드, GET/POST 등 현재 전송 방식
  - action: action 속성에 할당된 함수 참조

## useOptimistic
- 낙관적 업데이트를 쉽게 구현할 수 있도록 설계된 훅
- 서버 응답을 기다리기 전에 먼저 화면에 변경 내용을 반영하고 나중에 실제 응답 결과에 따라
  상태를 유지하거나 되돌릴 수 있도록 도와줍니다.
```tsx
import { useOptimistic} from 'react';

function AppContainer() {
    const [optimisticComments, setOptimisticComments] = useOptimistic(
        state, //서버응답을 기다리기 전 기본 상태값
        //updateFn
        (currentState, optimisticValue) => {
            // 낙관적 업데이트 시 상태를 어떻게 바꿀지 정의 하는 함수
            // merge and return new state
            // with optimistic value
        }
    )
}
```

## use + Suspense
- use : Promise나 Context 같은 리소스의 값을 컴포넌트 렌더링 중에 읽을 수 있게 해주는 훅. 전달된 Promise가 아직 처리되지 않았다면 가장 가까운 Suspense가 fallback을 보여주며 대기합니다.
- Suspense : 컴포넌트에서 비동기 처리가 완료될 때 까지 대기하게 하는 동안 fallback 속성에 지정된 UI를 표시하는 역할
```tsx
import { Suspense } from 'react';
import AsyncComponent from './AsyncComponent';

export default function App() {
  return (
      <>
          <Suspense fallback={<div>Loading...</div>}>
              <AsyncComponent promise={promise} />
          </Suspense>
      </>
  )
}

//childcomponent
export default function ChildComponent({ promise } : {promise : Promise<string>}) {
  const data = use(promise); // use훅으로 비동기가 처리될때 까지 대기
  return <div>{data}</div>;
}
```

## ErrorBoundary
```bash
npm install react-error-boundary
```
```tsx
import { ErrorBoundary } from "react-error-boundary";

<ErrorBoundary fallback={<p>Error!!!</p>}>
    <Suspense fallback={<p>Loading...</p>}>
        <Posts promise={fetchPosts()} />
    </Suspense>
</ErrorBoundary>
```
