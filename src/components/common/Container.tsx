import { Outlet } from "react-router-dom"

const Container = () => {
  return (
    <main id="container">
        <Outlet />
    </main>
  )
}

export default Container