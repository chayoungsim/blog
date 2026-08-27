---
title: "Axios"
date: "2026-08-27"
description: "Axios의 특징과 설치 방법, GET/POST/PUT/DELETE 요청, Axios Instance를 이용한 baseURL·타임아웃 설정까지 정리합니다."
---

## Axios
- 브라우저와 Node.js 환경에서 서버와 비동기 HTTP 통신을 할 수 있게 해주는 Promise 기반의 자바스크립트 라이브러리입니다. 
- Promise 기반: 비동기 처리를 직관적이고 간편하게 작성할 수 있습니다.
- 자동 JSON 변환: 서버로부터 받은 JSON 데이터를 자동으로 객체로 변환해 줍니다.
- 인터셉터(Interceptor): 요청이나 응답을 보내기 전후에 가로채서 특정 로직(헤더 수정, 에러 처리 등)을 수행할 수 있습니다.
- 요청 취소 및 보호: 진행 중인 요청을 취소할 수 있으며, XSRF(사이트 간 요청 위조) 보호 기능을 제공합니다.


```
// installing
npm install axios

// import
import axios from "axios"
import type { User } from "../types/user"

const API_URL = "https://jsonplaceholder.typicode.com/users";

export async function getUsers() : Promise<User[]> {
    const response = await axios.get<User[]>(API_URL);
    return response.data;
}
```
### get / post / put / delete
```
GET     → 조회
POST    → 생성
PUT     → 전체 수정
PATCH   → 일부 수정
DELETE  → 삭제
```

### Axios Instance
```ts
// api/client.ts
import axios from "axios";

const api = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com/",
    timeout: 5000,
})
export default api

// api/userApi.ts
import api fro './client';
import type { User } from '../types/user";

export async function getUsers() : Promise<User[]> {
    try {
        const response = await api.get<User[]>("/users");
        return response.data;
    } catch(error) {
        console.error("Failed to fetch user:", error);
        throw error; //호출하는 쪽에서 에러 상태를 처리할 숭 있도록 throw
    }
}

```

