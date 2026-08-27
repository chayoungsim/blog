---
title: "프로미스와 제네릭"
date: "2026-08-27"
description: "제네릭 클래스로 구현된 Promise의 타입 변수 설정 방법과 resolve/reject 타입, 함수 반환값을 Promise<T>로 명시하는 방법을 정리합니다."
---

## Promise 사용하기
```ts
const promise = new Promise(function(resolve,reject) {
    setTimeout(() => {
        //resolve("성공")
        reject("실패")
    },500)
})

promise.then(function(res) {
    console.log(res)
})
// 성공

promise.then(function(err) {
    console.log(err)
})
//실패

```
Promise는 제네릭 클래스로 구현되어 있습니다. 
따라서 새로운 Promise를 생성할 때 다음과 같이 타입 변수에 할당할 타입을 직접 설정해 주면 해당 타입이 바로 resolve 결과값의 타입이 됩니다.

```ts
const promise = new Promise<number>((resolve, reject) => {
    setTimeout(() => {
        resolve(20)
    },3000)
})

promise.then((response) => {
    //response는 number 타입
    console.log(response)
})

// 아쉽게도 reject 함수에 인수로 전달하는 값 즉 실패의 결과값 타입은 정의할 수 없습니다. 
// any 타입으로 고정되어 있기 때문에 catch 메서드에서 사용하려면 타입 좁히기를 통해 안전하게 사용하는걸 권장합니다.
promise.catch((error) => {
    if(typeof error === "string) {
        console.log(error)
    }
})

```

### 어떤 함수가 Promise 객체를 반환한다면 함수의 반환값 타입을 위해 다음과 같이 할 수 있습니다
```ts
interface Post {
    id: number;
    title: string;
    content: string;
}

// 1
function fetchPost() {
    return new Promise<Post>((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id:1,
                title:"게시글제목",
                content:"게시글 내용"
            })
        },3000)
    })
}

//2 - 추천방식 반환값 타입을 직접 명시
function fetchPost() : Promise<Post> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id:1,
                title:"게시글제목",
                content:"게시글 내용"
            })
        },3000)
    })
}

```
