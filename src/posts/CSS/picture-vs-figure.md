---
title: "<picture>와 <figure>는 언제 써야 할까"
date: "2026-09-03"
description: ""
---

## picture
- <picture> — 반응형 이미지 소스 선택
- 화면 조건(뷰포트, 해상도, 포맷 지원)에 따라 어떤 이미지 파일을 로드할지 브라우저가 고르게 하는 태그입니다. - 시각적 의미는 없고 순수하게 "소스 분기" 역할입니다.

```html
<picture>
  <source srcset="hero.avif" type="image/avif" />
  <source srcset="hero.webp" type="image/webp" />
  <source media="(max-width: 600px)" srcset="hero-mobile.jpg" />
  <img src="hero.jpg" alt="메인 배너" />
</picture>
```

## figure
- <figure>  - 독립적인 콘텐츠 단위
— 미디어와 그에 대한 부연 설명을 그룹화
- 이미지를 단독 콘텐츠로 사용하면서 아래에 캡션(설명)을 붙이고 싶을 때 씁니다. 
- 시맨틱 태그이고, <figcaption>을 자식으로 가집니다.
- 안에 이미지가 아니어도 됨 (코드 블록, 표, 인용문도 가능)

```html
<figure>
  <img src="cat-in-box.jpg" alt="상자 안에서 잠든 고양이" />
  <figcaption>햇볕이 잘 드는 창가 상자에서 곤히 잠든 고양이의 평화로운 오후.</figcaption>
</figure>
```

### 함께쓰기
— 서로 배타적이지 않아서 중첩이 자연스럽습니다. 반응형 이미지 + 캡션이 둘 다 필요할 때
```html
<figure>
  <picture>
    <source srcset="diagram.webp" type="image/webp" />
    <img src="diagram.jpg" alt="시스템 아키텍처 구성도" />
  </picture>
  <figcaption>그림 2. 전체 시스템 구성</figcaption>
</figure>
```

## 한 줄 요약: 
- picture는 "어떤 파일을 보여줄까", 
- figure는 "이 콘텐츠가 무엇인가" 를 다룹니다.