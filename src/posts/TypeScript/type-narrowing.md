---
title: "unknown 타입, if문 하나로 좁혀 쓰는 법"
date: "2026-08-05"
description: "any 대신 unknown을 쓰기 시작하면서 타입 좁히기(narrowing)가 왜 필요한지 체감한 기록."
---

## 문제

외부 API 응답이나 JSON.parse 결과처럼 타입을 확신할 수 없는 값에 `any`를 쓰면 이후 코드에서 타입 체크가 전부 무력화된다. `unknown`은 값을 받아두되, 실제로 사용하기 전에 타입을 좁히도록 강제한다.

## 타입 좁히기 방법

```ts
function printLength(value: unknown) {
  if (typeof value === "string") {
    // 이 블록 안에서는 value가 string으로 좁혀진다
    console.log(value.length)
  }
}
```

`typeof`, `instanceof`, `in` 연산자, 커스텀 타입가드(`value is Type`) 모두 좁히기 도구로 쓸 수 있다.

```ts
interface User {
  name: string
}

function isUser(value: unknown): value is User {
  return typeof value === "object" && value !== null && "name" in value
}
```

## 정리

`any`는 타입 체크를 끄는 것이고, `unknown`은 "확인하기 전엔 아무것도 못 하게" 막는 것이다. 확인하는 코드(narrowing)를 한 번 더 쓰는 대신 런타임 에러를 컴파일 타임에 잡아낼 수 있다.
