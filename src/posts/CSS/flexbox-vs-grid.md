---
title: "Flexbox랑 Grid, 뭘 먼저 고민해야 할까"
date: "2026-08-12"
description: "축 하나면 Flexbox, 행과 열을 동시에 맞춰야 하면 Grid로 정리한 기준."
---

## 기준

레이아웃을 짤 때마다 매번 고민하다가, 스스로 세운 기준은 이렇다.

- **한 방향(가로 또는 세로)으로 나열**되고 각 아이템 크기가 콘텐츠에 따라 유동적이면 → **Flexbox**
- **행과 열을 동시에** 맞춰야 하고, 아이템이 격자 안 정해진 자리에 들어가야 하면 → **Grid**

## Flexbox 예시 — 네비게이션

```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

아이템 개수가 바뀌어도, 각 아이템 너비가 콘텐츠에 따라 달라져도 자연스럽게 정렬된다.

## Grid 예시 — 카드 목록

```css
.post-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
  gap: 2.4rem;
}
```

카드 너비를 최소값으로 고정하고 남는 공간에 맞춰 열 개수가 자동으로 조정된다. 이런 "격자" 느낌은 Flexbox의 `flex-wrap`으로도 흉내는 낼 수 있지만, 행 사이 정렬까지 깔끔하게 맞추려면 Grid가 훨씬 간단하다.

## 정리

둘 중 하나만 써야 하는 게 아니라, 실제로는 Grid 안에 Flexbox를 넣어 쓰는 경우가 많다. "지금 맞추려는 게 1차원인가 2차원인가"만 먼저 물어보면 선택이 쉬워진다.
