---
title: "styled-components"
date: "2026-09-15"
description: "React 스타일드 컴포넌트 셋팅"
---


## 스타일드 컴포넌트 설치
npm install styled-components
- [https://styled-components.com/](https://styled-components.com/)



```
// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #BF4F74;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

// Use Title and Wrapper like any other React component – except they're styled!
render(
  <Wrapper>
    <Title>
      Hello World!
    </Title>
  </Wrapper>
);

```