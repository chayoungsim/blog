---
title: "TypeScript 이해하기"
date: "2026-08-25"
description: "타입을 집합으로 이해하고, 타입 호환성, 유니온/인터섹션 타입, 타입 추론, 타입 단언, 타입 좁히기까지 타입스크립트 타입 시스템의 핵심 개념 정리"
---

## 타입스크립트를 이해 한다는 것은
- 어떤 기준으로 타입을 정의
- 어떤 기준으로 타입들간의 관계를 정의
- 어떤 기준으로 타입스크립트 코드의 오류를 검사 

[문법들만 모아둔 치트시트](https://www.typescriptlang.org/cheatsheets/)

### 타입은 집합이다
- 타입스크립트의 '타입'은 사실 여러개의 값을 포함하는 '집합'입니다.
- 집합은 동일한 속성을 갖는 여러개의 요소들을 하나의 그룹으로 묶은 단위를 말합니다.

슈퍼타입(부모타입) - 서브타입(자식타입)
number Type - number literal Type

## 타입 호환성
- 타입 호환성이란 예를 들어 A와 B 두개의 타입이 존재할 때 A 타입의 값을 B 타입으로 취급해도 괜찮은지 판단하는 것을 의미합니다. 
- 그래서 만약 A 타입의 값이 B 타입의 값으로 취급 되어도 괜찮다면 호환된다고 하고 안된다면 호환되지 않는다고 합니다.
```ts
let num1 : number = 10;
let num2 : 10 = 10;

num1 = num2;   // num1에 num2의 값을 저장하는건 가능합니다.  업 캐스팅 OK

num2 = num1;   // num2에 num1의 값을 대입하는 것은 안된다   다운 캐스트 NO

```

### unknown 타입 (전체 집합)
- unknown 타입은 타입 계층도의 최 상단에 위치합니다.
- 따라서 unknown 타입 변수에는 모든 타입의 값을 할당할 수 있습니다.
- 바꿔 말하면 모든 타입은 unknown 타입으로 업 캐스트 할 수 있습니다.
- unknown 타입은 모든 타입의 슈퍼타입이라는 뜻 입니다. 그러므로 모든 타입은 unknown 타입의 부분집합입니다.
- unknown 타입의 값은 any를 제외한 어떤 타입의 변수에도 할당할 수 없습니다.
```ts
let a: unknown = 1;                 // number -> unknown
let b: unknown = "hello";           // string -> unknown
let c: unknown = true;              // boolean -> unknown
let d: unknown = null;              // null -> unknown
let e: unknown = undefined;         // undefined -> unknown
let f: unknown = [];                // Array -> unknown
let g: unknown = {};                // Object -> unknown
let h: unknown = () => {};          // Function -> unknown
```

### never 타입 (공집합 타입)
- never 타입은 타입 계층도에서 가장 아래에 위치합니다.
- 수학에서의 공집합은 아무것도 포함하지 않는 집합이라는 뜻 입니다.
- 또 공집합은 모든 집합의 부분 집합입니다. 
- 그러므로 never 타입은 모든 타입의 서브 타입입니다. 따라서 never 타입은 모든 타입으로 업캐스팅 할 수 있습니다.
- 반면 그 어떤 타입도 never 타입으로 다운 캐스팅 할 수 없습니다.
```ts
let neverVar: never;

let a: number = neverVar;            // never -> number
let b: string = neverVar;            // never -> string
let c: boolean = neverVar;           // never -> boolean
let d: null = neverVar;              // never -> null
let e: undefined = neverVar;         // never -> undefined
let f: [] = neverVar;                // never -> Array
let g: {} = neverVar;                // never -> Object
```
### void 타입
void 타입은 앞서 다음과 같이 아무것도 반환하지 않는 함수의 반환값 타입으로 주로 사용된다
```ts
function noReturnFunc(): void {
  console.log("hi");
}
```

### any 타입 (치트키)
any 타입은 사실상 타입 계층도를 완전히 무시합니다. any는 일종의 치트키같은 타입입니다.


## 객체 타입의 호환성

```ts
type Animal = {
  name: string;
  color: string;
};

type Dog = {
  name: string;
  color: string;
  breed: string;
};

let animal: Animal = {
  name: "기린",
  color: "yellow",
};

let dog: Dog = {
  name: "돌돌이",
  color: "brown",
  breed: "진도",
};

animal = dog; // ✅ OK
dog = animal; // ❌ NO

```

- 타입스크립트는 프로퍼티를 기준으로 타입을 정의하는 구조적 타입 시스템을 따른다고 배웠던 적 있습니다. 
- 따라서 Animal 타입은 name과 color 프로퍼티를 갖는 모든 객체들을 포함하는 집합으로 볼 수 있고 Dog 타입은 name과 color 거기에다 추가로 
- breed 프로퍼티를 갖는 모든 객체를 포함하는 집합으로 볼 수 있습니다.

### 초과 프로퍼티 검사
```ts
type Book = {
  name: string;
  price: number;
};

type ProgrammingBook = {
  name: string;
  price: number;
  skill: string;
};

(...)

let book2: Book = { // 오류 발생
  name: "한 입 크기로 잘라먹는 리액트",
  price: 33000,
  skill: "reactjs",
};


let book3: Book = programmingBook; // 앞서 만들어둔 변수

Copy
function func(book: Book) {}

func({ // 오류 발생
  name: "한 입 크기로 잘라먹는 리액트",
  price: 33000,
  skill: "reactjs",
});

```

## 대수 타입(Algebraic type)이란
- 대수 타입이란 여러개의 타입을 합성해서 만드는 타입을 말합니다. 
- 지난 시간에 객체 타입의 호환성을 이해하셨다면 이제 대수타입도 쉽게 이해하실 수 있습니다.

### 합집합(Union) 타입

```ts

// 합집합 타입 - Union 타입
let a: string | number;

//Union 타입으로 배열 타입 정의하기
let arr : (number | string | boolean)[] = [1, "hello",true]

//Union 타입과 객체 타입
type Dog = {
    name = string;
    color = string;
}

type Person =  {
    name : string;
    language: string;
}

type Union1 = Dog | Person

let union1: Union1 = { // ✅
  name: "",
  color: "",
};

let union2: Union1 = { // ✅
  name: "",
  language: "",
};

let union3: Union1 = { // ✅
  name: "",
  color: "",
  language: "",
};

// 반면 다음과 같은 객체는 포함하지 않습니다.
let union4: Union1 = { // ❌
  name: "",
};

```

### 교집합(Intersection) 타입

```ts

let variable: number & string; 
// never 타입으로 추론된다

```

#### Intersection 타입과 객체 타입
```ts
type Dog = {
  name: string;
  color: string;
};

type Person = {
  name: string;
  language: string;
};

type Intersection = Dog & Person;

let intersection1: Intersection = {
  name: "",
  color: "",
  language: "",
};
```

## 타입 추론이란
타입스크립트는 타입이 정의되어 있지 않은 변수의 타입을 자동으로 추론합니다. 이런 기능을 “타입 추론”이라고 합니다.
```ts
let a = 10;
// number 타입으로 추론

function func(param){ // 오류
}
// 이렇게 타입 추론이 불가능한 변수(ex 매개변수)에는 암시적으로 any 타입이 추론됩니다. 
// 그러나 엄격한 타입 검사 모드 (tsconfig.json의 strict 옵션을 true로 설정)에서는 이런 암시적 any 타입의 추론을 오류로 판단하게 됩니다. 
// 따라서 이번에는 어떤 상황에 타입 추론이 가능한지 살펴보겠습니다.

```

### 타입 추론이 가능한 상황들
1. 변수 선언
일반적인 변수 선언의 경우 초기값을 기준으로 타입이 잘 추론됩니다.
```ts
let a = 10;
// number 타입으로 추론

let b = "hello";
// string 타입으로 추론

let c = {
  id: 1,
  name: "이정환",
  profile: {
    nickname: "winterlood",
  },
  urls: ["https://winterlood.com"],
};
// id, name, profile, urls 프로퍼티가 있는 객체 타입으로 추론
```

2. 구조 분해 할당
객체와 배열을 구조 분해 할당하는 상황에서도 타입이 잘 추론됩니다.
```ts
let { id, name, profile } = c;
let [one, two, three] = [1, "hello", true];
```

3. 함수의 반환값
함수 반환값의 타입은 return 문을 기준으로 잘 추론됩니다.
```ts
function func() {
  return "hello";
}
// 반환값이 string 타입으로 추론된다
```

4. 기본값이 설정된 매개변수
기본값이 설정된 매개변수의 타입은 기본값을 기준으로 추론됩니다.
```ts
function func(message = "hello") {
  return "hello";
}
```
### 주의해야 할 상황들
1. 암시적으로 any 타입으로 추론
- 변수를 선언할때 초기값을 생략하면 암시적인 any 타입으로 추론됩니다. 
- 참고로 이때 매개변수의 타입이 암시적 any로 추론될 때와 달리 일반 변수의 타입이 암시적 any 타입으로 추론되는 상황은 오류로 판단하지 않습니다.
```ts
let d;
// 암시적인 any 타입으로 추론

```
2. const 상수의 추론
- const로 선언된 상수도 타입 추론이 진행됩니다. 그러나 let으로 선언한 변수와는 다른 방식으로 추론됩니다.
- 상수는 초기화 때 설정한 값을 변경할 수 없기 때문에 특별히 가장 좁은 타입으로 추론됩니다.
```ts
const num = 10;
// 10 Number Literal 타입으로 추론

const str = "hello";
// "hello" String Literal 타입으로 추론
```
### 최적 공통 타입(Best Common Type)
다음과 같이 다양한 타입의 요소를 담은 배열을 변수의 초기값으로 설정하면, 최적의 공통 타입으로 추론됩니다.
```ts
let arr = [1, "string"];
// (string | number)[] 타입으로 추론
```

## 타입 단언
```ts
type Person = {
  name: string;
  age: number;
};

let person: Person = {}
person.name = ""; // 빈 객체는 Person 타입이 아니므로 오류가 발생
person.age = 23;

// 이렇듯 값 as 타입 으로 특정 값을 원하는 타입으로 단언할 수 있습니다. 이를 타입 단언 이라고 부릅니다.
// 타입 단언은 다음과 같이 초과 프로퍼티 검사를 피할때에도 요긴하게 사용할 수 있습니다.
let person = {} as Person;
person.name = "";
person.age = 23;


type Dog = {
    name : string;
    color: string;
}

let dog: Dog = {
    name :"돌돌이",
    color: "brown",
    breed: "진도"
}  as Dog
// 위 코드에서는 breed 라는 초과 프로퍼티가 존재하지만 이 값을 Dog 타입으로 단언하여 초과 프로퍼티 검사를 피했습니다.

```

### 타입 단언의 조건
- 값 as 타입 형식의 단언식을 A as B로 표현했을 때 아래의 두가지 조건중 한가지를 반드시 만족해야 합니다.
- A가 B의 슈퍼타입이다
- A가 B의 서브타입이다

### const 단언
- 타입 단언때에만 사용할 수 있는 const 타입이 존재합니다. 
- 특정 값을 const 타입으로 단언하면 마치 변수를 const로 선언한 것 과 비슷하게 타입이 변경됩니다.
```ts
let num4 = 10 as const;
// 10 Number Literal 타입으로 단언됨

let cat = {
  name: "야옹이",
  color: "yellow",
} as const;
// 모든 프로퍼티가 readonly를 갖도록 단언됨
```

### Non Null 단언
- Non Null 단언은 지금까지 살펴본 값 as 타입 형태를 따르지 않는 단언입니다. 
- 값 뒤에 느낌표(!) 를 붙여주면 이 값이 undefined이거나 null이 아닐것으로 단언할 수 있습니다.
```ts
type Post = {
  title: string;
  author?: string;
};

let post: Post = {
  title: "게시글1",
};

const len: number = post.author!.length;
```

## 타입 좁히기
```ts
function func(value: number | string) {
  if (typeof value === "number") {
    console.log(value.toFixed());
  } else if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}
// value가 string 타입일거라고 기대하고 toUpperCase 메서드를 사용하고 싶다면 다음과 같이 조건문을 이용해 value의 타입이 string 타입임을 보장해 주어야 합니다.
// 이렇게 조건문을 이용해 조건문 내부에서 변수가 특정 타입임을 보장하면 해당 조건문 내부에서는 변수의 타입이 보장된 타입으로 좁혀집니다. 
// 따라서 첫번째 조건문 내부에서는 value의 타입이 number 타입이 되고, 두번째 조건문 내부에서는 value의 타입이 string 타입이 됩니다. 
// 이를 타입 좁히기 라고 표현합니다.

```
### instanceof 타입가드  
```ts
function func(value: number | string | Date | null) {
  if (typeof value === "number") {
    console.log(value.toFixed());
  } else if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else if (value instanceof Date) {
    console.log(value.getTime());
  }
}
// 그러나 Instanceof는 내장 클래스 또는 직접 만든 클래스에만 사용이 가능한 연산입니다. 
// 따라서 우리가 직접 만든 타입과 함께 사용할 수 없습니다.
```
### in 타입 가드
우리가 직접 만든 타입과 함께 사용하려면 다음과 같이 in 연산자를 이용해야 합니다.
```ts
type Person = {
  name: string;
  age: number;
};

function func(value: number | string | Date | null | Person) {
  if (typeof value === "number") {
    console.log(value.toFixed());
  } else if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else if (value instanceof Date) {
    console.log(value.getTime());
  } else if (value && "age" in value) {
    console.log(`${value.name}은 ${value.age}살 입니다`)
  }
}
```

## 서로소 유니온 타입
서로소 유니온 타입은 교집합이 없는 타입들 즉 서로소 관계에 있는 타입들을 모아 만든 유니온 타입을 말 합니다.
```ts
type Admin = {
  name: string;
  kickCount: number;
};

type Member = {
  name: string;
  point: number;
};

type Guest = {
  name: string;
  visitCount: number;
};

type User = Admin | Member | Guest;

function login(user: User) {
  if ("kickCount" in user) {
		// Admin
    console.log(`${user.name}님 현재까지 ${user.kickCount}명 추방했습니다`);
  } else if ("point" in user) {
		// Member
    console.log(`${user.name}님 현재까지 ${user.point}모았습니다`);
  } else {
		// Guest
    console.log(`${user.name}님 현재까지 ${user.visitCount}번 오셨습니다`);
  }
}
```
- 그러나 이렇게 코드를 작성하면 조건식만 보고 어떤 타입으로 좁혀지는지 바로 파악하기가 좀 어렵습니다. 
- 결과적으로 직관적이지 못한 코드입니다.
- 이럴 때에는 다음과 같이 각 타입에 태그 프로퍼티를 추가 정의해주면 됩니다.
```ts
type Admin = {
  tag: "ADMIN";
  name: string;
  kickCount: number;
};

type Member = {
  tag: "MEMBER";
  name: string;
  point: number;
};

type Guest = {
  tag: "GUEST";
  name: string;
  visitCount: number;
};

(...)
```

이제 login 함수의 타입가드를 다음과 같이 더 직관적으로 수정할 수 있게 됩니다.
```ts
function login(user: User) {
  if (user.tag === "ADMIN") {
    console.log(`${user.name}님 현재까지 ${user.kickCount}명 추방했습니다`);
  } else if (user.tag === "MEMBER") {
    console.log(`${user.name}님 현재까지 ${user.point}모았습니다`);
  } else {
    console.log(`${user.name}님 현재까지 ${user.visitCount}번 오셨습니다`);
  }
}
```
또는 switch를 이용해 더 직관적으로 변경할 수도 있습니다.
```ts
function login(user: User) {
  switch (user.tag) {
    case "ADMIN": {
      console.log(`${user.name}님 현재까지 ${user.kickCount}명 추방했습니다`);
      break;
    }
    case "MEMBER": {
      console.log(`${user.name}님 현재까지 ${user.point}모았습니다`);
      break;
    }
    case "GUEST": {
      console.log(`${user.name}님 현재까지 ${user.visitCount}번 오셨습니다`);
      break;
    }
  }
}
```