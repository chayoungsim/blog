---
title: "제네릭"
date: "2026-08-26"
description: "타입스크립트 제네릭의 개념과 제네릭 함수, 타입 변수 제한, 제네릭 인터페이스·타입 별칭·클래스까지 예제로 정리합니다."
---

## 제네릭
제네릭이란 함수나 인터페이스, 타입 별칭, 클래스 등을 다양한 타입과 함께 동작하도록 만들어 주는 타입스크립트의 놀라운 기능 중 하나 입니다.

### 제네릭(Generic) 함수
두루두루 모든 타입의 값을 다 적용할 수 있는 그런 범용적인 함수이다 

```ts
function func<T>(value: T) : T {
    return value;
}

let num = func(10);
// number 타입

let str = func("string");
// string 타입

```
## 타입 변수 응용하기

### 사례 1 
만약 2개의 타입 변수가 필요한 상황이라면 다음과 같이 T, U 처럼 2개의 타입 변수를 사용해도 됩니다.
```ts
function swap<T,U>(a:T,b:U) {
    retrun[b,a]
}

const [a,b] = swap("1",2);

```
### 사례 2
다양한 배열 타입을 인수로 받는 제네릭 함수를 만들어야 한다면 다음과 같이 할 수 있습니다.
```ts
function returnFirstValue<T>(data:T[]) {
    return data[0]
}

let num = retrunFirstValue([0,1,2])
//number

let str = returnFirstValue([1,"hello", "mynamaeis"])
// number | string

```

### 사례3
위 사례에서 만약 반환값의 타입을 배열의 첫번째 요소의 타입이 되도록 하려면 다음과 같이 튜플 타입과 나머지 파라미터를 이용하면 됩니다.
```ts
function retrunFirstValue<T>(data: [T,...unknown[]]){
    return data[0]
}

let str = returnFirstValue([1, "hello","mynameis"])
// number
```

### 사례4
타입 변수를 제한한다는 것은 함수를 호출하고 인수로 전달할 수 있는 값의 범위에 제한을 두는 것을 의미합니다.
```ts
//타입 변수를 제한할 때에는 확장(extends)을 이용합니다. 
function getLength<T extends {length: number}>(data:T) {
    return data.length;
}
getLength("123");            // ✅
getLength([1, 2, 3]);        // ✅
getLength({ length: 1 });    // ✅
getLength(undefined);        // ❌
getLength(null);             // ❌

```

## map 메서드
```ts
const arr = [1, 2, 3];

function map<T, U>(arr: T[], callback: (item: T) => U): U[] {
  (...)
}

map(arr, (it) => it.toString());
// string[] 타입의 배열을 반환
// 결과 : ["1", "2", "3"]

```

## ForEach
```ts
function forEach<T>(arr: T[], callback: (item: T) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i]);
  }
}
```

## 제네릭 인터페이스
```ts
interface KeyPair<K,V> {
    key: K;
    value: V;
}

let keyPair : KeyPair<string, number> = {
    key:"key",
    value:0
}

let keyPair2 : KeyPair<boolean, string[]> = {
    key:true,
    value:[1],
}
```

## 인덱스 시그니처

```ts
interface Map<V> {
    [key:string] : V
}

let stringMap:Map<string> = {
    key:"value"
}

let booleanMap: Map<boolean> = {
    key:true,
}
```
## 제네릭 타입 별칭
```ts
type Map2<V> = {
    [key:string] :V;
}

let stringMap2 : Map2<string> = {
    key: "hello",
}
```

## 제네릭 인터페이스 활용 예
```ts
interface Student {
  type: "student";
  school: string;
}

interface Developer {
  type: "developer";
  skill: string;
}

interface User {
  name: string;
  profile: Student | Developer;
}

function goToSchool(user: User<Student>) {
  if (user.profile.type !== "student") {
    console.log("잘 못 오셨습니다");
    return;
  }

  const school = user.profile.school;
  console.log(`${school}로 등교 완료`);
}

const developerUser: User = {
  name: "이정환",
  profile: {
    type: "developer",
    skill: "typescript",
  },
};

const studentUser: User = {
  name: "홍길동",
  profile: {
    type: "student",
    school: "가톨릭대학교",
  },
};
```

## 제네릭 클래스

```ts
//  제네릭 클래스를 사용해 여러 타입의 리스트를 생성할 수 있는 범용적을 클래스를 정의
class List<T> {
  constructor(private list: T[]) {}

  push(data: T) {
    this.list.push(data);
  }

  pop() {
    return this.list.pop();
  }

  print() {
    console.log(this.list);
  }
}

const numberList = new List([1, 2, 3]);
const stringList = new List(["1", "2"]);
//const numberList = new List<number>([1, 2, 3]);
//const stringList = new List<string>(["1", "2"]);

// 클래스는 생성자를 통해 타입 변수의 타입을 추론할 수 있기 때문에 
// 생성자에 인수로 전달하는 값이 있을 경우 타입 변수에 할당할 타입을 생략해도 됩니다.

```
