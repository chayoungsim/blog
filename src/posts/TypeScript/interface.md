---
title: "인터페이스"
date: "2026-08-25"
description: "인터페이스 기본 문법부터 선택적/읽기 전용 프로퍼티, 메서드 오버로딩, 하이브리드 타입, 인터페이스 확장, 선언 합침까지 타입 별칭과의 차이 중심으로 정리"
---

## 인터페이스
- 인터페이스란 타입 별칭과 동일하게 타입에 이름을 지어주는 또 다른 문법입니다.
- 예를 들어 간단한 Person 객체의 타입을 정의한다면 다음과 같이 할 수 있습니다.
```ts
interface Person {
    name: string;
    age : number;
}
//이렇게 정의한 인터페이스를 타입 주석과 함께 사용해 변수의 타입을 정의할 수 있습니다.
const Person : Person = {
    name: "김석진",
    age: 27
}
// 이렇듯 인터페이스는 타입 별칭과 문법만 조금 다를 뿐 기본적인 기능은 거의 같다고 볼 수 있습니다.
```
### 선택적 프로퍼티
```ts
interface Person {
  name: string;
  age?: number;
}

const person: Person = {
  name: "이정환",
  // age: 27,
};
```
### 읽기 전용 프로퍼티
- 읽기 전용 프로퍼티 또한 동일한 방법으로 설정 가능합니다.
```ts
interface Person {
    readonly name: string;
    age?: number
}

const person : Person = {
    name: "김석진"
}

person.name = '홍길동' // ❌
```

### 메서드 타입 정의하기
```ts
interface Person {
  readonly name: string;
  age?: number;
  sayHi: () => void;;
}
```

### 메서드 오버로딩
- 함수 타입 표현식으로 메서드의 타입을 정의하면 메서드의 오버로딩 구현이 불가능합니다.
```ts
interface Person {
  readonly name: string;
  age?: number;
  sayHi: () => void; 
  sayHi: (a: number, b: number) => void; // ❌
}
```
- 그러나 호출 시그니처를 이용해 메서드의 타입을 정의하면 오버로딩 구현이 가능합니다.
```ts

interface Person {
  readonly name: string;
  age?: number;
  sayHi(): void; // 호출시그니처
  sayHi(a: number): void;
  sayHi(a: number, b: number): void;
}

```
### 하이브리드 타입
- 인터페이스또한 함수이자 일반 객체인 하이브리드 타입을 정의할 수 있습니다.
```ts
interface Func2 {
  (a: number): string;
  b: boolean;
}

const func: Func2 = (a) => "hello";
func.b = true;
```
### 주의할 점
타입 별칭에서는 다음과 같이 Union이나 Intersection 타입을 정의할 수 있었던 반면 인터페이스에서는 할 수 없습니다.

```ts
type Type1 = number | string | Person;
type Type2 = number & string & Person;

const person: Person & string = {
  name: "이정환",
  age: 27,
};
```

## 인터페이스 확장
```ts
interface Animal {
  name: string;
  age: number;
}

interface Dog {
  name: string;
  age: number;
  isBark: boolean;
}

interface Cat {
  name: string;
  age: number;
  isScratch: boolean;
}

interface Chicken {
  name: string;
  age: number;
  isFly: boolean;
}
```
특정 인터페이스를 기반으로 여러개의 인터페이스가 파생되는 경우 중복 코드가 발생할 수 있는데 이럴 때에는 인터페이스의 확장 기능을 이용하면 좋습니다.
```ts
interface Animal {
  name: string;
  color: string;
}

// name을 Number 타입으로 재 정의 하는것은 불가능합니다.
interface Dog extends Animal {
  name: number; // ❌   
  breed: string;
}

interface Cat extends Animal {
  isScratch: boolean;
}

interface Chicken extends Animal {
  isFly: boolean;
}
```
### 타입 별칭을 확장하기
참고로 인터페이스는 인터페이스 뿐만 아니라 타입 별칭으로 정의된 객체도 확장할 수 있습니다.
```ts
type Animal =  {
    name:string;
    color:string
}
interface Dog extends Animal {
    breed:string;
}
```

### 다중확장
```ts
interface DogCat extends Dog, Cat {}

const dogCat: DogCat = {
  name: "",
  color: "",
  breed: "",
  isScratch: true,
};
```

## 선언 합침(Declaration Merging)
타입 별칭은 동일한 스코프 내에 중복된 이름으로 선언할 수 없는 반면 인터페이스는 가능합니다.
```ts
type Person = {
    name: string
}
type Person = {❌
    age: number 
}

interface Person {
    name: string;
}
interface Person { // ✅
    age: number
}
// 위 코드에 선언한 Person 인터페이스들을 결국 합쳐져 다음과 같은 인터페이스가 됩니다.
interface Person {
    name: string;
    age: number;
}
```
```ts
interface Person {
  name: string;
}

interface Person {
  age: number;
}

const person: Person = {
  name: "이정환",
  age: 27,
};
```

### 주의할 점
그런데 만약 다음과 같이 동일한 이름의 인터페이스들이 동일한 이름의 프로퍼티를 서로 다른 타입으로 정의한다면 오류가 발생합니다.
```ts
interface Person {
  name: string;
}

interface Person {
  name: number;
  age: number;
}
```