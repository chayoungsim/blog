---
title: "조건부 타입"
date: "2026-08-27"
description: "extends와 infer를 이용한 조건부 타입, 분산적인 조건부 타입, Exclude/Extract 구현, ReturnType 추론까지 정리합니다."
---

## 조건부 타입
조건부 타입은 extends와 삼항 연산자를 이용해 조건에 따라 각각 다른 타입을 정의하도록 돕는 문법입니다.
```ts
type A = number extends string ? number : string
```
### 제네릭 조건부 타입
- 조건부 타입은 제네릭과 함께 사용할 때 그 위력이 극대화 됩니다.
- 다음은 타입변수에 Number 타입이 할당되면 String 타입을 반환하고 그렇지 않다면 Number 타입을 반환하는 조건부 타입입니다.
```ts
type StringNumberSwitch<T> = T extends number ? string : number;

let varA : StringNumberSwitch<number>
//string

let varB : StringNumberSwitch<string>
//number

```
## 분산적인 조건부 타입
```ts
// 조건부 타입의 타입 변수에 Union 타입을 할당하면 분산적인 조건부 타입으로 조건부 타입이 업그레이드 되기 때문입니다.
type StringNumberSwitch<T> = T extends number ? string : number;

let c : StringNumberSwitch<number | string>

//string | number

```
### Exclude 조건부 타입 구현하기    
Union 타입으로부터 특정 타입만 제거하는 Exclude(제외하다) 타입을 다음과 같이 정의할 수 있습니다.
```ts
type Exclude<T,U> = T extends U ? never : T;
type A = Exclude<number | string | boolean, string>;

// 1단계
// Exclude<number, string>
// Exclude<string, string>
// Exclude<boolean, string>

// 2단계
// number | never | boolean

// 결과
// number | boolean

type Extract<T,U> = T extends U ? T : never;

type B = Extract<number|string|boolean,string>
// 1단계
// Exclude<number, string>
// Exclude<string, string>
// Exclude<boolean, string>

// 2단계
// never | string | never

// 결과
// string

```

## infer (inferece 추론하다)
- infer는 조건부 타입 내에서 특정 타입을 추론하는 문법입니다.
- infer는 다음과 같이 특정 함수 타입에서 반환값의 타입만 추출하는 특수한 조건부 타입인 ReturnType을 만들 때 이용할 수 있습니다.

```ts
// 조건식 T extends () => infer R에서 infer R은 이 조건식을 참이 되도록 만들 수 있는 최적의 R 타입을 추론하라는 의미입니다.
type ReturnType<T> = T extends ()=> infer R ? R :never;

type FuncA = () => string;
type FuncB = () => number;

type A = ReturnType<FuncA>;
// string

type B = ReturnType<FuncB>;
// number

type C = ReturnType<number>;
// 조건식을 만족하는 R추론 불가능
// never

```

```ts
type PromiseUnpack<T> = T extends Promise<infer R> ? R : never;
// 1. T는 프로미스 타입이어야 한다.
// 2. 프로미스 타입의 결과값 타입을 반환해야 한다

type PromiseA = PromiseUnpack<Promise<number>>
//number

type PromiseB = PromiseUnpack<Promise<string>>;
//string

```
