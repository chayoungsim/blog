---
title: "TypeScript 함수와 타입"
date: "2026-08-25"
description: ""
---

## 함수의 타입을 정의하는 방법

```ts
// 자바스크립트에서
// 함수를 설명하는 가장 좋은 방법
// 어떤 매개변수를 받고, 어떤 결과값을 반환하는지 설명
function func(a, b) {
  return a + b;
}

// 타입스크립트에서
// 어떤 타입의 매개변수를 받고, 
// 어떤 타입의 값을 반환하는지 이야기 하면 됩니다.

function func(a: number, b: number) {
    return a+b;
}

```
### 화살표 함수 타입 정의하기
```ts
//함수 선언식과 동일합니다
const add = (a: number, b: number) : number => a + b;

//화살표 함수 역시 반환값의 타입은 자동으로 추론됩니다.
const add = (a: number, b: number) => a + b;

```

### 매개변수 기본값 설정하기
```ts
//매개변수에 기본값이 설정되어있으면 타입이 자동으로 추론됩니다. 
function introduce(name="김석진") {
    console.log(`name : ${name}`)
}

//기본값과 다른 타입의 값을 인수로 전달해도 오류가 발생합니다.
introduce(1) // 오류
```

### 선택적 매개변수 설정하기
- 다음과 같이 매개변수의 이름뒤에 물음표(?)를 붙여주면 선택적 매개변수가 되어 생략이 가능합니다.
```ts   
function introduce(name="김석진", tall?: number) {
    console.log(`name : ${name}`);
    console.log(`tall : ${tall}`);

    introduce("김석진",180)
    introduce("김석진")
}
// tall 같은 선택적 매개변수의 타입은 자동으로 undefined와 유니온 된 타입으로 추론됩니다.
// number | undefined이 됩니다. 

function introduce(name="김석진", tall?:number) {
    console.log(`name : ${name}`);
    if(typeof tall === "number") {
        console.log(`tall: ${tall + 10}`);
    }
}
// 또 한가지 주의할 점은 선택적 매개변수는 필수 매개변수 앞에 올 수 없습니다. 
// 반드시 뒤에 배치해야 합니다.

```
### 나머지 매개변수
- 자바스크립트의 rest 파라미터(나머지 매개변수) 관련 내용입니다.
- [스프레드 연산자와 rest 매개변수](https://reactjs.winterlood.com/4e81b92b-4097-4fd8-8c67-09a7588c94d6#c027776dc2ea440d9867381b8ec296fe)

```ts
function getSum(...rest) {
    let sum=0;
    rest.forEach((it) => (sum+=it))
    return sum;
}

// rest 파라미터의 타입은 다음과 같이 정의하면 됩니다.
function getSum(...rest: number[]) {
  let sum = 0;
  rest.forEach((it) => (sum += it));
  return sum;
}

// 나머지 매개변수의 길이를 고정하고 싶다면 다음과 같이 튜플 타입을 이용해도 됩니다.
function getSum(...rest :[number, number, number]) {
    let sum =0;
    rest.forEach((it) => (sum+=it));
    return sum;
}
getSum(1,2,3) // O
getSum(1,2,3,4) // X

```

## 함수 타입 표현식
- 다음과 같이 함수 타입을 타입 별칭과 함께 별도로 정의할 수 있습니다. 
- 이를 함수 타입 표현식(Function Type Expression)이라고 부릅니다.
```ts
type Add = (a: number, b: number) => number;
const add: Add = (a, b) => a + b;

```
### [Function Type Expressions](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-type-expressions)

```ts
const add = (a: number, b: number) => a + b;
const sub = (a: number, b: number) => a - b;
const multiply = (a: number, b: number) => a * b;
const divide = (a: number, b: number) => a / b;
```
- 위 코드를 함수 타입 표현식을 이용하면 다음과 같이 간결하게 만들 수 있습니다. 
- 또 나중에 동일한 타입의 함수가 추가되어도 타입 주석을 이용해 타입 정의만 해주면 되어 매우 편리합니다.
```ts
type Operation = (a: number, b: number) => number;

const add: Operation = (a, b) => a + b;
const sub: Operation = (a, b) => a - b;
const multiply: Operation = (a, b) => a * b;
const divide: Operation = (a, b) => a / b;

// 함수 타입 표현식이 반드시 타입 별칭과 함께 사용되어야 하는 것은 아닙니다. 
// 다음과 같이 그냥 함수 타입 표현식을 타입 주석에 사용해도 문제는 없습니다.

const add: (a: number, b: number) => number = (a, b) => a + b;

```

## 호출 시그니처
- 호출 시그니쳐(Call Signature)는 함수 타입 표현식과 동일하게 함수의 타입을 별도로 정의하는 방식입니다

```ts
type Operation2 = {
  (a: number, b: number): number;
};

const add2: Operation2 = (a, b) => a + b;
const sub2: Operation2 = (a, b) => a - b;
const multiply2: Operation2 = (a, b) => a * b;
const divide2: Operation2 = (a, b) => a / b;
```
- 자바스크립트에서는 함수도 객체이기 때문에, 위 코드처럼 객체를 정의하듯 함수의 타입을 별도로 정의할 수 있습니다.
- 이때 다음과 같이 호출 시그니쳐 아래에 프로퍼티를 추가 정의하는 것도 가능합니다. 
- 이렇게 할 경우 함수이자 일반 객체를 의미하는 타입으로 정의되며 이를 하이브리드 타입이라고 부릅니다.

```ts
type Operation2 = {
  (a: number, b: number): number;
  name: string;
};

const add2: Operation2 = (a, b) => a + b;
(...)

add2(1, 2);
add2.name;
```