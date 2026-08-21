import { useEffect } from "react"

interface DocumentMetaOptions {
  title: string
  description: string
}

// react-helmet-async 같은 라이브러리 없이, 라우트가 바뀔 때마다 탭 제목과
// 메타 설명만 갱신한다. SPA라 검색엔진/소셜 크롤러가 JS를 실행하지 않으면
// 반영되지 않는 한계는 있지만, 실제 브라우저 탭·즐겨찾기·스크린리더에는 유효하다.
export function useDocumentMeta({ title, description }: DocumentMetaOptions) {
  useEffect(() => {
    document.title = title

    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute("content", description)
    }
  }, [title, description])
}
