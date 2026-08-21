---
title: "본문 바로가기 링크, 왜 눈에는 안 보이게 만들까"
date: "2026-08-18"
category: "Accessibility"
description: "스킵 링크를 직접 구현하면서 position과 focus 상태를 어떻게 다뤄야 하는지 정리했다."
---

## 스킵 링크란

키보드나 스크린리더 사용자가 매번 헤더 메뉴를 거치지 않고 바로 본문(`main`)으로 이동할 수 있게 해주는 링크다.

## 구현 포인트

- 평소에는 화면에 보이지 않아야 한다 (`width: 1px; height: 1px; overflow: hidden`).
- `:focus`일 때는 다시 보여야 한다. 그래야 키보드 사용자가 포커스 위치를 알 수 있다.
- `display: none`으로 숨기면 포커스 자체가 불가능해지므로 사용하면 안 된다.

```css
#accessibility a {
  position: relative;
  height: 1px;
  width: 1px;
  overflow: hidden;

  &:focus {
    position: absolute;
    height: auto;
    width: 100%;
  }
}
```

## 정리

접근성 요소는 "평소엔 안 보이지만 완전히 숨기지는 않는다"는 감각이 핵심이다.
