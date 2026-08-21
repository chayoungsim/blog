---
title: "transition과 animation, 언제 뭘 쓸지 헷갈릴 때"
date: "2026-08-15"
description: "상태 변화에 반응하면 transition, 스스로 반복/재생되면 animation으로 구분해봤다."
---

## 핵심 차이

- **transition**: 상태(hover, focus, 클래스 토글 등)가 바뀔 때 "시작값 → 끝값"을 자동으로 보간해준다. 트리거가 필요하다.
- **animation**: `@keyframes`로 여러 단계를 직접 정의하고, 트리거 없이도 재생·반복할 수 있다.

## transition — 헤더 메뉴 hover

```css
.menu-toggle span {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
```

hover나 `aria-expanded` 같은 상태 변화가 있을 때만 값이 바뀌므로 transition으로 충분하다.

## animation — 로딩 스피너

```css
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

이런 무한 반복은 상태 변화와 무관하게 계속 재생돼야 하므로 transition으로는 표현할 수 없다.

## 접근성 체크

`prefers-reduced-motion`을 존중하지 않으면 애니메이션이 멀미나 어지러움을 유발할 수 있다. 프로젝트 리셋 CSS에 이미 다음 블록이 들어 있다.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 정리

"트리거가 있고 한 번만 움직이면" transition, "스스로 반복되거나 여러 단계를 거치면" animation. 기준을 세워두니 CSS 작성 속도가 확실히 빨라졌다.
