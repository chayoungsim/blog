---
title: "formData"
date: "2026-09-16"
description: "FormData로 폼 입력값을 한번에 가져오고, 배열과 JSON 객체로 변환하는 방법 정리"
---

## HTML <form> 안에 사용자가 입력한 값을 한꺼번에 가져오는 방법
```tsx
const formData = new FormData(formElRef.current!);
console.log(formData.get("name"), formData.get("email"), formData.get("option"))
// name, email, option 세 값에 해당하는 폼 입력값을 가져옴. 없으면 null 반환
```

## 폼 데이터 객체를 배열로
```tsx
const items = Array.from(formData.entries());
// [['name', '손흥민'], ['email', 'son@example.com'], ['option', 'yes']]
```

## 배열을 JSON 객체로 변환 
```tsx
const json = Object.fromEntries(items);
// { name: '손흥민', email: 'son@example.com', option: 'yes' }
```