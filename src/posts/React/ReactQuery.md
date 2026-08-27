---
title: "React Query"
date: "2026-08-27"
description: "React Query로 서버 상태를 관리하는 방법, QueryClientProvider 설정과 useQuery를 이용한 데이터 조회·로딩·에러 처리를 정리합니다."
---

## React Query
- React Query를 이용한 서버 상태 관리
- 서버 데이터를 캐싱하고 관리할 수 있습니다.

```ts

npm install @tanstack/react-query
// React Query를 사용하려면 QueryClientProvider가 필요합니다.

//main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import App from "./App";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);

```
```ts
// useUsers.ts
import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../api/axios"

export function useUsers() {
    return useQuery({
        queryKey:["users"], // React Query가 데이터를 구분하기 위한 고유한 이름입니다.
        queryFn:getUsers,  // 함수
    })
}

//App.tsx
import { useUsers } from "./hooks/useUsers";

function App() {
  const {
    data: users,
    isLoading,
    error,
  } = useUsers();

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return (
      <p>
        사용자 정보를 불러오지 못했습니다.
      </p>
    );
  }

  return (
    <main>
      <h1>사용자 목록</h1>

      {users?.map((user) => (
        <article key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </article>
      ))}
    </main>
  );
}

export default App;
```
