---
title: "타입 조작하기"
date: "2026-08-27"
description: "인덱스드 액세스 타입, keyof 연산자, 맵드 타입, 템플릿 리터럴 타입 등 타입스크립트의 타입 조작 기능을 예제로 정리합니다."
---

## 타입 조작
타입스크립트의 타입 조작(Type Manipulation)은 기존에 존재하는 타입을 변형하거나 조합하여 새롭고 유연한 타입을 만드는 기능입니다.

### 인덱스드 액세스 타입 (Indexed Access Types)
객체, 배열, 튜플 등의 특정 프로퍼티나 요소의 타입 자체에 접근하여 추출합니다
```ts
type User = {
    id:number;
    info :{ name: string; email:string}
}
type InfoType = User["info"] // { name:string; email:string}
```
```ts
// 객체 프로퍼티의 타입 추출하기
interface Post {
    title:string;
    content:string;
    author: {
        id:number;
        name:string;
    }
}

const post:Post = {
    title:"게시글 제목",
    content:"게시글 본문".
    author: {
        id:1,
        name:"김석진",
    }
}

function printAuthorInfo(author: Post["author"]) { // 여기서 "author" 은 타입이다
    console.log(`${author.id} - ${author.name}`)
}

// 다음과 같이 인덱스를 중첩하여 사용할 수도 있습니다.
function printAuthorInfo(authorId : Post["author"]["id"]) {
    console.log(authorId)
}
```
```ts
// 배열요소의 타입 추출하기
type PostList = {
    title:string;
    content: string;
    author: {
        id:number;
        name:string;
        age:number;
    }
}[]

// PostList[number]는 PostList 배열 타입으로부터 요소의 타입을 추출하는 인덱스드 엑세스 타입입니다.
const post: PostList[number] = {
  title: "게시글 제목",
  content: "게시글 본문",
  author: {
    id: 1,
    name: "이정환",
    age: 27,
  },
};

//  인덱스에 다음과 같이 Number Literal 타입을 넣어도 됩니다.
const post: PostList[0] = {
  title: "게시글 제목",
  content: "게시글 본문",
  author: {
    id: 1,
    name: "이정환",
    age: 27,
  },
};

```
```ts
// 튜플의 요소 타입 추출하기
type Tup =[number, string,boolean];

type Tup0=Tup[0]
//number

type Tup1=Tup[1]
//string

type Tup2 = Tup[2];
//boolean

// 인덱스에 number 타입을 넣으면 마치 튜플을 배열 처럼 인식해 배열 요소의 타입을 추출하게 됩니다.
type Tup3 = Tub[number]
// number | string | boolean

```

### keyof 연산자
keyof 연산자는 객체 타입으로 부터 프로퍼티의 모든 key들을 String Literal Union 타입으로 추출하는 연산자입니다.
```ts
interface Person {
    name: string;
    age:number
}

function getPropertyKey(person : Person, key: keyof Person) {
    return person[key];
}

// Typeof와 Keyof 함께 사용하기
// typeof 연산자는 자바스크립트에서 특정 값의 타입을 문자열로 반환하는 연산자 였습니다. 
// 그러나 다음과 같이 타입을 정의할 때 사용하면 특정 변수의 타입을 추론하는 기능도 가지고 있습니다.
function getPropertyKey(person: Person, key: keyof typeof person) {
  return person[key];
}

const person:Person = {
    name:"김석진",
    age: 27
}

```

### 맵드 타입 (Mapped Types)
맵드 타입은 기존의 객체 타입을 기반으로 새로운 객체 타입을 만드는 마법같은 타입 조작 기능입니다.

```ts
interface User {
    id:number;
    name:string;
    age:number;
}

type PartialUser = {
    [key in "id" | "name" | "age"] : User[key]
}

type PartialUser = {
    [key in keyof User]?: User[key]
}

type ReadonlyUser = {
    readonly [key in keyof User] : User[key]
}

```

### 템플릿 리터럴 타입 (Template Literal Types)
템플릿 리터럴 타입은 타입 조작 기능들 중 가장 단순한 기능으로 템플릿 리터럴을 이용해 특정 패턴을 갖는 String 타입을 만드는 기능입니다.
```ts
type Color = "red" | "black" | "green"
type Animal = "dog" |"cat"|"chicken";
type ColoredAnimal = `${Color} - ${Animal}`

```