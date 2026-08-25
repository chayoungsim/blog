---
title: "TypeScript Start"
date: "2026-08-25
description: "any 대신 unknown을 쓰기 시작하면서 타입 좁히기(narrowing)가 왜 필요한지 체감한 기록."
---

## 한 입 크키로 잘라먹는 타입스크립트 강의
- [https://ts.winterlood.com/](https://ts.winterlood.com/)
- Node.js 설치하기 [https://nodejs.org/ko](https://nodejs.org/ko)

## 타입스크립트
타입스크립트는 기존의 자바스크립트를 더 안전하게 사용할 수 있도록 타입 관련된 여러가지 기능들을 추가한 언어입니다. 
그래서 타입스크립트는 쉽게 말해서 자바스크립트의 확장판 이라고 부를 수 있습니다.
점진적 타입 시스템 : 실행 전 검사를 통한 타입 안정성 확보 자동으로 변수의 타입을 추론함

## 타입스트립트는 어떻게 실행될까
TypeScript - AST(추상 문법 트리) - 타입검사 성공 - Javascript(타입검사를 통과한 안전한 자바스크립트 코드) - AST(추상 문법 트리) - 바이트 코드 - 실행
```ts
//Node.js 패키지 초기화
npm init

//@types/node 설치하기 : Node.js 내장 기능들의 타입 정보를 담고있는 @types/node 라는 패키지를 설치
//@types/node가 성공적으로 설치되면 패키지의 node_modules 폴더에 @types 폴더가 생성됩니다. 
npm i @type/node

//타입스크립트 컴파일러 설치하기
npm i -g typescript
tsc -v

//tsc컴파일 실행하기
tsc src/index.ts
node src/index.js

// ts-node --> tsx  TSX(TypeScript Execute)로 실행하기
npm i -g tsx
tsx src/index.ts
//결과 자바스크립트 파일을 생성하지 않고 한번에 타입스크립트 파일을 실행합니다.

```

### TSX 사용을 권장

## 컴파일러 옵션
컴파일러 옵션을 아주 자유롭고 쉽게 설정할 수 있다
프로젝트의 성격에 따라 프로젝트에 최적화된 맞춤 설정을 만들어 사용할 수 있습니다.

### 컴파일러 옵션 자동 생성하기
```ts
tsc --init
//이 파일을 열어보면 굉장히 많은 옵션이 기본적으로 설정되어 있는걸로 보입니다. 
```

### 컴파일러 옵션 직접 설정하기 
```ts
//tsconfig.json
{
    // 컴파일 결과 생성되는 자바스크립트 코드의 버전을 설정하는 target 옵션
    "compilerOptions": {

        "target": "ES5", 
        // TypeScript가 최신 문법을 ES5 수준의 JavaScript로 변환합니다.
        // 과거에는 IE 같은 오래된 브라우저 지원 때문에 많이 사용했습니다.
        // 코드가 불필요하게 변환됨
        // 번들 크기 증가 가능
        // 최신 JavaScript 기능 활용도가 떨어짐
        // Polyfill이 필요한 경우가 많음

        "target": "es2023", //추천
        // 현재 React + TypeScript + Vite 같은 현대적인 프론트엔드 개발 환경이라면 보통 ES2023 쪽이 최종 선택
        // 최신 JavaScript 문법을 최대한 유지합니다.
        // ES2023 표준을 기준으로 컴파일
        // 특정 버전에 고정

        "target": "ESNext",
        // 현재 TypeScript가 지원하는 가장 최신 JavaScript 표준을 기준으로 컴파일
        // 최신 표준을 따라감

        "module": "CommonJS",
        // Node.js의 전통적인 CommonJS 프로젝트
        // const React = require("react");
        // module.exports = something;


        "module": "esnext", // 추천
        // React + Vite + 최신 프론트엔드 프로젝트
        // ES Module 방식을 그대로 유지합니다.
        // import export 를 사용하는 현대적인 모듈 시스템입니다.

        "outDir": "dist",
        // 컴파일 결과 생성할 자바스크립트 코드의 위치를 결정하는 outDir 옵션

        "strict": true,
        // strict는 엄격한 타입 검사를 의미하는 옵션

        "moduleDetection": "force",
        // 자동으로 모든 타입스크립트 파일이 로컬 모듈(독립 모듈)로 취급됩니다.

    },

    // 이렇게 설정하면 이제 tsc 명령어만 입력해도 src 폴더 아래의 모든 타입스크립트 파일이 동시에 컴파일됩니다.
    "include": ["src"]
}
```