---
title: "react-router"
date: "2026-08-28"
description: "react-router 설치와 BrowserRouter 진입점 설정, Routes/Route를 이용한 라우트 정의, 중첩 라우트와 Outlet으로 공통 레이아웃 구성하는 방법을 정리합니다."
---

## react-router
- react-router-dom은 7.18.x가 마지막
- 최신 react-router는 v8 부터 
- v8은 Node 22+, React 19+, Vite 7+

### 1. 설치
```ts   
// 최신 방식 (v8, 권장):
npm install react-router

//구버전 (v6~v7, 기존 프로젝트 호환용):
npm install react-router-dom

```
### 2. 라우터 감싸기 (진입점 설정)

```ts
// main.tsx
// BrowserRouter가 URL 변화를 감지하고 관리하는 최상위 컨테이너입니다.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";   // 구버전: "react-router-dom"
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

```
### 3. 라우트 정의(URL ↔ 컴포넌트 연결)
```ts
// App.tsx에서 어떤 경로에 어떤 컴포넌트를 보여줄지 정합니다.

import { Routes, Route } from "react-router";   // 구버전: "react-router-dom"
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products/:id" element={<Product />} />
      <Route path="*" element={<NotFound />} />  {/* 어디에도 안 맞으면 404 */}
    </Routes>
  );
}

```

### 4. 공통 레이아웃 (중첩 라우트 + Outlet)
```ts
// Layout.tsx
import { Outlet, Link } from "react-router";

// 레이아웃 컴포넌트
function Layout() {
  return (
    <>
      <header>
        <Link to="/">홈</Link> | <Link to="/about">소개</Link>
      </header>
      <main>
        <Outlet />   {/* 자식 라우트가 여기 렌더링됨 */}
      </main>
      <footer>© 2026</footer>
    </>
  );
}

// App.tsx
// 라우트 정의 - Layout으로 감싸기
<Routes>
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Route>
</Routes>

```
### 요약 흐름
1. npm install react-router
2. main.tsx를 <BrowserRouter>로 감싸기
3. App.tsx에 <Routes> / <Route>로 URL ↔ 컴포넌트 매핑
4. 이동은 <Link to="">, 로직에선 useNavigate()
5. 값 읽기는 useParams()(경로), useSearchParams()(쿼리)
6. 공통 틀은 중첩 라우트 + <Outlet />