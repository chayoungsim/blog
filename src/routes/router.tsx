import { createBrowserRouter } from "react-router-dom"
import App from "@/App"
import Home from "@/pages/Home"
import About from "@/pages/About"
import Posts from "@/pages/Posts"
import PostDetail from "@/pages/PostDetail"
import CategoryPage from "@/pages/CategoryPage"
import Projects from "@/pages/Projects"
import ProjectDetail from "@/pages/ProjectDetail"
import NotFound from "@/pages/NotFound"
import { getAllCategories, getAllPosts, getPostBySlug, getPostsByCategory } from "@/lib/posts"
import { getAllProjects, getProjectBySlug } from "@/lib/projects"

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "posts", element: <Posts />, loader: () => getAllPosts() },
        {
          path: "posts/:slug",
          element: <PostDetail />,
          loader: ({ params }) => {
            const post = getPostBySlug(params.slug ?? "")
            if (!post) {
              throw new Response("Not Found", { status: 404 })
            }
            return post
          },
          errorElement: <NotFound />,
        },
        {
          path: "category/:category",
          element: <CategoryPage />,
          loader: ({ params }) => {
            const category = params.category ?? ""
            if (!getAllCategories().includes(category)) {
              throw new Response("Not Found", { status: 404 })
            }
            return getPostsByCategory(category)
          },
          errorElement: <NotFound />,
        },
        { path: "projects", element: <Projects />, loader: () => getAllProjects() },
        {
          path: "projects/:slug",
          element: <ProjectDetail />,
          loader: ({ params }) => {
            const project = getProjectBySlug(params.slug ?? "")
            if (!project) {
              throw new Response("Not Found", { status: 404 })
            }
            return project
          },
          errorElement: <NotFound />,
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  // GitHub Pages 프로젝트 페이지(/blog/) 배포용. vite.config.ts의 base와 값이 같아야 한다.
  { basename: "/blog" },
)

export default router
