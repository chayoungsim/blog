import { NavLink } from "react-router-dom"
import { getAllCategories } from "@/lib/posts"

const CategoryNav = () => {
  const categories = getAllCategories()

  return (
    <nav aria-label="카테고리" className="category-nav">
      <ul>
        <li>
          <NavLink to="/posts" end>
            전체
          </NavLink>
        </li>
        {categories.map((category) => (
          <li key={category}>
            <NavLink to={`/category/${encodeURIComponent(category)}`}>{category}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default CategoryNav
