import { Link } from "react-router-dom"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"

const NotFound = () => {
  useDocumentMeta({
    title: "페이지를 찾을 수 없음 | My Blog",
    description: "요청하신 페이지를 찾을 수 없습니다.",
  })

  return (
    <section className="static not-found">
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>요청하신 페이지가 삭제되었거나 잘못된 주소입니다.</p>
      <Link to="/">홈으로 돌아가기</Link>
    </section>
  )
}

export default NotFound
