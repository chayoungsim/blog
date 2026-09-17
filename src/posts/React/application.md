
---
title: "Cookie, LocalStorage, SessionStorage, Token"
date: "2026-09-17"
description: "로그인/인증에서 헷갈리기 쉬운 Cookie, LocalStorage, SessionStorage, Token의 차이와 용도 정리"
---

## 로그인/인증을 이해할 때 반드시 구분해야 하는 개념
- Cookie / localStorage / sessionStorage는 데이터를 저장하는 장소
- Token은 인증된 사용자가 맞는지 증명하는 수단

## Cookie
- Cookie는 브라우저가 가지고 있는 작은 데이터 저장 공간입니다.
- HTTP 요청을 할 때 서버로 자동 전송될 수 있다는 것
- 로그인 인증에서 많이 사용됩니다.
- 서버와 클라이언트가 정보를 교환하고 저장하는 작은 텍스트 파일.
- 로그인 세션, HttpOnly Cookie + Token
- HttpOnly Cookie는 JavaScript에서 접근할 수 없습니다.

## LocalStorage
- localStorage는 브라우저에 데이터를 저장하는 공간입니다.
- 브라우저를 종료해도 데이터가 남아 있다는 것입니다.
- 다크모드, 언어 설정, 최근 본 상품, 사용자 UI 설정

```tsx
  localStorage.setItem("savedEmail", email); // 저장
  localStorage.getItem("savedEmail");        // 읽기 (없으면 null)
  localStorage.removeItem("savedEmail");     // 삭제
```

## SessionStorage
- sessionStorage도 브라우저 저장 공간입니다.
- 하지만 localStorage와 가장 큰 차이는 브라우저 탭(세션)에 종속적이라는 것입니다.
- 브라우저 탭을 닫으면 데이터가 사라집니다.
- 임시 장바구니, 폼 입력값 저장

```tsx
  sessionStorage.setItem("tempCartItem", item); // 저장
  sessionStorage.getItem("tempCartItem");      // 읽기 (없으면 null)
  sessionStorage.removeItem("tempCartItem");   // 삭제
```

## Token
- Token은 로그인한 사용자를 인증하기 위한 정보입니다.
- Token 자체는 저장 공간이 아닙니다.

### Access Token
- Access Token은 서버가 사용자에게 발급하는 일회용 증표
- 만료 시간이 짧음 (예: 30분)
- 민감하지 않은 정보 저장 (사용자 ID, 권한 수준 등)
- 보통 쿠키나 로컬 스토리지에 저장

### Refresh Token
- Refresh Token은 Access Token을 갱신하기 위해 사용되는 토큰
- 만료 시간이 김 (예: 7일, 1개월)
- 민감한 정보 저장 (사용자 ID, 권한 수준 등)
- 보통 쿠키나 로컬 스토리지에 저장
- 