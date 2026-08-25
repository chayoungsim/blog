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

## 함수 타입의 호환성이란?
- 함수 타입의 호환성이란 특정 함수 타입을 다른 함수 타입으로 괜찮은지 판단하는 것을 의미합니다.
- 다음 2가지 기준으로 함수 타입의 호환성을 판단하게 됩니다.
-- 두 함수의 반환값 타입이 호환되는가?
-- 두 함수의 매개변수의 타입이 호환되는가?

### 기준 1 : 반환값 타입이 호환되는가?
- A와 B 함수 타입이 있다고 가정할 때 A 반환값 타입이 B 반환값 타입의 슈퍼타입이라면 두 타입은 호환됩니다.
```ts
type A = () => number;
type B = () => 10;

let a: A = () => 10;
let b: B = () => 10;

a = b; // ✅
b = a; // ❌
// A의 반환값 타입은 Number, B의 반환값 타입은 Number Literal 입니다. 
// 따라서 변수 a에 b를 할당하는 것은 가능하나 반대로는 불가능 합니다.

```

### 기준 2 : 매개변수의 타입이 호환되는가?
- 2-1. 매개변수의 개수가 같을 때
- 두 함수 타입 C와 D가 있다고 가정할 때 두 타입의 매개변수의 개수가 같다면 C 매개변수의 타입이 D 매개변수 타입의 서브 타입일 때에 호환됩니다.
```ts
type C = (value: number) => void;
type D = (value: 10) => void;

let c: C = (value) => {};
let d: D = (value) => {};

c = d; // ❌
d = c; // ✅
```
```ts
type Animal = {
  name: string;
};

type Dog = {
  name: string;
  color: string;
};

let animalFunc = (animal: Animal) => {
  console.log(animal.name);
};

let dogFunc = (dog: Dog) => {
  console.log(dog.name);
  console.log(dog.color);
};

animalFunc = dogFunc; // ❌
dogFunc = animalFunc; // ✅
```
### 2-2. 매개변수의 개수가 다를 때
매개변수의 개수가 다를 때에는 비교적 간단합니다.
```ts
type Func1 = (a: number, b: number) => void;
type Func2 = (a: number) => void;

let func1: Func1 = (a, b) => {};
let func2: Func2 = (a) => {};

func1 = func2; // ✅
func2 = func1; // ❌
```

## 함수 오버로딩
- 함수 오버로딩이란 하나의 함수를 매개변수의 개수나 타입에 따라 다르게 동작하도록 만드는 문법입니다.
/**
 * 함수 오버로딩
 * 같은 함수를 매개변수의 개수나 타입에 따라
 * 여러가지 버전으로 만드는 문법
 * -> 하나의 함수 func
 * -> 일단 모든 매개변수는 넘버타입
 * -> Ver1. 매개변수가 1개일 때에는 매개변수에 20을 곱한 값을 출력
 * -> Ver2. 매개변수가 3개일 때에는 모든 매개변수를 더한 값을 출력
 */


 ```ts
 // 버전들 -> 오버로드 시그니쳐
function func(a: number): void;
function func(a: number, b: number, c: number): void;

// 실제 구현부 -> 구현 시그니쳐
function func(a: number, b?: number, c?: number) {
  if (typeof b === "number" && typeof c === "number") {
    console.log(a + b + c);
  } else {
    console.log(a * 20);
  }
}

func(1);        // ✅ 버전 1 - 오버로드 시그니쳐
func(1, 2);     // ❌ 
func(1, 2, 3);  // ✅ 버전 3 - 오버로드 시그니쳐
```

## 사용자 저의 타입가드

```ts
type Dog = {
    name: string;
    isBark: boolean;
}

type Cat = {
    name: string;
    isScratch: boolean;
}

type Animal =  Dog | Cat;

function warning(animal:Animal) {
    if("isBark" in animal) {
        console.log(animal.isBark ? "짖습니다" : "안짖어요")

    } else if("isScratch" in animal) {
        console.log(animal.isScratch ? "할큅니다." : "안할퀴어요");
    }
}

```
- 만약 Dog 타입의 프로퍼티가 다음과 같이 중간에 이름이 수정되거나 추가 또는 삭제될 경우에는 타입 가드가 제대로 동작하지 않을 수도 있습니다.
- 따라서 이럴 때에는 다음과 같이 함수를 이용해 커스텀 타입 가드를 만들어 타입을 좁히는게 더 좋습니다.
```ts

//Dog 타입인지 확인하는 타입가드
function isDog(animal: Animal) : animal is Dog {
    return(animal as Dog).isBark !== undefined;
}

//Cat 타입인지 확인하는 타입카드
function isCat(animal:Animal) : animal is Cat {
    return (animal as Cat).isScratch !== undefined;
}

function warning(animal:Animal) {
    if(isDog(animal)) {
        console.log(animal.isBark ? "짖습니다." : "안짖어요")
    } else {
        console.log(animal.isScratch ? "할큅니다" : "안할퀴어요")
    }
}

```

