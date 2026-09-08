---
title: "한 입 크기로 잘라먹는 Nextjs "
date: "2026-09-08"
description: "한 입 크기로 잘라먹는 Next.js 영상강의 정리. React와 Next.js의 차이, Page Router와 동적 경로, 네비게이팅과 프리페칭, API Routes, 데이터 페칭, 그리고 SSR·SSG·ISR 사전 렌더링 방식을 다룬다."
---

## 한 입 크기로 잘라먹는 Nextjs 영상강의 

- [예제코트 확인] (https://winterlood.notion.site/f1b93a3e78894147b98f10c0dbc34b8f?v=91b33efe41ce459f83cbaf1b5155b793)

### React.js(Library) 
- 주도권을 개발자가 가짐 기능 구현을 원하는 방향으로 진행한다 쓰고싶은 도구, 쓰고 싶은 기술을 쓴다
- 자유도가 높다
- 클라이언트 사이드 랜더링 CSR(Client Side Rendering) FCP(초기 접속 속도)가 느려진다.

### Next.js(Framework) 
- 주도권을 Framework가 가진 프레임워크가 제공하는 기능을 이용하거나 허용하는 범위 내에서만 추가 도구 시용 가능
- 자유도가 낮다
- 거의 모든 기능을 제공
- React.js 확장판

### 사전 렌더링
- 서버 사이드 렌더링 SSR (Server Side Rendering)
- 빠른 FCP - TTI
- 빠른페이지 이동

### database
- [https://supabase.com/] (https://supabase.com/)

### Page Router 핵심정리
- Pages/ 폴더의 구조를 기반으로 페이지 라우팅을 제공함
- 동적 경로(Dynamic Routers) [id].tsx / catch all segment [...id].tsx / optional catch all segment [[...id]] - /어떤경로가 있든 없든 다 나타남

#### 네비게이팅
```tsx
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const onClickButton = () => {
        router.push("/test");
    };

    return (
        <>
            <header>
                <Link href={"/"}>index</Link>
                &nbsp;
                <Link href={"/search"}>search</Link>
                &nbsp;
                <Link href={"/book/1"}>book/1</Link>
                <div>
                    <button onClick={onClickButton}>/test페이지로 이동</button>
                </div>
            </header>
            <Component {...pageProps} />
        </>
    );
}

```

#### 프리페칭 Pre Fetching
- 연결된 모든 페이지의 JS Bundle 불러옴
```ts
    const onClickButton = () => {
        router.push("/test");
    };
    // 프리패치는 Link로 연결된 파일에서 실행되는데..프리패치가 이루어지도록
    // 링크의 프리패치를 제거 할때 prefetch={false}
    useEffect(() => {
        router.push("/test");
    },[])

    <Link href={"/search"} prefetch={false}>search</Link>

```
### API Routes

```ts
import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}

```

### React App에서의 데이터 페칭
1. 불러온 데이터를 보관할 State생성
2. 데이터 페칭 함수 생성
3. 컴포넌트 마운트 시점에 fetchData호출
4. 데이터 로딩중일때의 예외처리
```ts
export default function Page() {
    const [state, setState] = useState();

    cosnt fetchData = async () => {
        const response = await fetch("...");
        const data = await response.json();

        setState(data);
    }

    useEffect(() => {
        fetchData()
    },[])

    if(!state) return "Loading ...";

    return <div>...</div>;
}
```
### Next.js 다양한 사전 렌더링
1. 서버사이트 렌더리(SSR) - Server Site Rendering
- 가장 기본적이 사전 렌더링방식
- 요청이 들어올 때 마다 사전 렌더링을 진행 함


2. 정적 사이트 생성 (SSG) - Static Site Generation
- SSR의 단점을 해결하는 사전 렌더링 방식
- 빌드 타임에 미리 페이지를 사전 렌더링 해 둠
- 사전 렌더링에 많은 시간이 소요되는 페이지더라도 사용자의 요청에는 매우 빠른속도로 응답 가능
- 매번 똑같은 페이지만 응답함, 최신 데이터 반영은 어렵다

3. 증분 정적 재생성(ISR)