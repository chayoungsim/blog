---
title: "유틸리티 타입"
date: "2026-09-01"
description: "Partial, Required, Readonly, Pick, Omit, Record, Exclude, Extract, ReturnType 등 자주 쓰는 유틸리티 타입의 개념과 직접 구현 방식을 정리합니다."
---

## 유틸리티 타입이란
- 타입스크립트가 자체적으로 제공하는 특수한 타입들입니다. 
- 우리가 지금까지 배웠던 제네릭, 맵드 타입, 조건부 타입 등의 타입 조작 기능을 이용해 실무에서 자주 사용되는 유용한 타입들을 모아 놓은 것을 의미합니다.
- [Utility Types] (https://www.typescriptlang.org/docs/handbook/utility-types.html)

### Partial<T> 
- 부분적인, 일부분의
- 특정 객체 타입의 모든 프로퍼티를 선택적 프로퍼티 바꿔주는 타입

```ts
interface Post {
    title: string;
    tags: string[];
    content: string;
    thumbnailURL?: string
}

// 직접구현
type Partial<T> = {
    [key in keyof T]? :T[key];
}

// 모든 프로퍼티를 선택적 프로퍼티로 바꿔주는 타입
const draft: Partial<Post> = {
    title: "제목 나중에",
    content:"초안..."
}



```

### Required<T>
- 필수의 , 필수적인
- 특정 객체 타입의 모든 프로퍼티를 필수 프로퍼티로 바꿔주는 타입

```ts

// 직접구현
type Required<T> = {
    [key in keyof T]-? : T[key];
}

const withThumbnailPost : Required<Post> = {
    title: "한입 타입스크립트",
    tags :["ts"],
    content:"",
    thumbnailURL:"httmp:..."
}

```

### Readonly<T>
- 읽기전용, 수정불가
- 특정 객체 타입에서 모든 프로퍼티를 읽기 전용 프로퍼리로 만들어주는 타입

```ts

//직접구현
type Readonly<T> = {
    readonly [key in keyof T] : T{key}
}

const readonlyPost : Readonly<Post> =  {
    title:"보호된 게시글 입니다",
    tags:[],
    content:""
}

```

### Pick<T, K>
- 뽑다, 고르다
- 객체 타입으로부터 특정 프로퍼티만 딱 골라내는 그런 타입

```ts
interface Post {
    title: string;
    tags: string[];
    content: string;
    thumbnailURL?:string;
}

//직접구현
type Pick<T, K extends keyof T> = {
    // K extends 'title'| 'tags'|'content' | 'thumbnailURL'
    //
    [key in K] : T[key]
}


const legacyPost : Pick<Post, "title" | "content"> = {
    title:"옛날 글",
    contnet: "옛날 컨텐츠",
}

```


### Omit<T,K>
- 생략하다, 빼다
- 객체 타입으로부터 특정 프로퍼티를 제거하는 타입

```ts

//직접구현
type Omit<T,K extends keyof T> = Pick<T, Exclude<keyof T, K>>
// T = Post, K = 'title'
// Pick<Post, Exclude<keyof Post, 'title'>>
// Pick<Post, Exclude<'title' | 'contnet' | 'tags' | 'thumbnailURL','title'>>
// Pick<Post, 'content' | 'tags' | 'thumbnailURL'>

const noTitlePost : Omit<Post, "title"> = {
    content:"",
    tags:[],
    thumbnailURL:"",
}

```

### Record<K, V>

```ts

// type Thumbnail = {
//     large: {
//         url: string
//     };
//     medium: {
//         url: string;
//     };
//     small: {
//         url: string;
//     }
//     watch: {
//         url: string;
//     }
// }

// 직접구현
type Record<K extends keyof any, V> = {
    [key in K] : V;
}

type Thumbnail = Record<"large" |"medium" | "small", {url:string}>

```
### Exclude<T, U> = T extends U ? never: T
- 제외하다, 추방하다
- T에서 U를 제거하는 타입

```ts
type Exclude<T,U> = T extends U ? never :T;
//1단계
// Exclude<string, boolean>
// Exclude<boolean, boolean>

//2단계
// string |
// never

//최종적으로는
//string

```
### Extract<T, U>
- T에서 U를 추출하는 타입

```ts
type Extract<T,U> = T extends U ? T : never

type B = Extract<string | boolean, boolean>

```

### ReturnType<T>
- 함수의 반환값 타입을 추출하는 타입

```ts
type ReturnType<T extends (...args: any) => any> = T extends(...agrs: any) => infer R ? R :never;


function funcA() {
    return "hello"
}
function funcB() {
    return 10;
}

type ReturnA = ReturnType<typeof funcA>; //string
type ReturnB = ReturnType<typeof funcB>; //number

```