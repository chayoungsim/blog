---
title: "React Getting Started"
date: "2026-08-24"
description: "React 프로젝트 생성, 구조 셋팅"
---

## 프로젝트 생성 Vite 이용
```tsx
$npm create vite@latest my-react-app 
// Select a framework: react
// Select a variant: TypeScript
// Which linter to use? ESLint
// Install with npm and start now?

$cd my-react-app
$npm install
$npm run dev

```
## 필수 라이브러리 설치
```tsx

// 라우팅
$npm install react-router-dom

// 상태 관리
npm install zustand 
npm install @tanstack/react-query
npm install axios

// Sass(SCSS) 컴파일러 설치
npm install -D sass

//  GSAP
npm install gsap

// form
npm install react-hook-form zod @hookform/resolvers

// charts
npm install recharts

// 날짜
npm install date-fns

// Icon
npm install lucide-react

```

## date-fns 설치
```tsx
//설치 
npm install date-fns

// 날짜 포맷팅 (Format)
// 날짜를 원하는 모양의 문자열로 바꿀 때 사용합니다.
import { format } from 'date-fns';
import { ko } from 'date-fns/locale'; // 한국어 설정

const now = new Date();

// 결과: "2026년 05월 07일"
const formattedDate = format(now, 'yyyy년 MM월 dd일', { locale: ko });


// 날짜 계산 (Add / Subtract)
// 날짜를 더하거나 뺄 때 유용합니다
import { addDays, subMonths } from 'date-fns';

const today = new Date();
const nextWeek = addDays(today, 7);    // 7일 뒤
const lastMonth = subMonths(today, 1); // 한 달 전

//상대적 시간 표시 (Distance to Now)
//"방금 전", "3일 전" 같은 표시를 구현할 때 씁니다.
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

const postDate = new Date('2026-05-01');

// 결과: "6일 전" (오늘이 5월 7일인 경우)
const distance = formatDistanceToNow(postDate, { addSuffix: true, locale: ko });
```
