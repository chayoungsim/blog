import { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import ButtonMode from "@/components/ui/ButtonMode"
import logo from "@/assets/images/chayoungsim-tech.svg"

const NAV_ITEMS = [
  { to: "/", label: "Home", end: true },
  { to: "/posts", label: "Posts", end: false },
  { to: "/projects", label: "Projects", end: false },
  { to: "/about", label: "About", end: false },
]

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const closeMenu = () => setIsOpen(false)

  // 메뉴가 열려 있는 동안 Esc / 바깥 클릭으로 닫을 수 있게 한다
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousedown", handleClickOutside)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <header ref={headerRef} id="header">
      <div className="static header-inner">
        <NavLink to="/" end className="header-logo" aria-label="홈으로 이동" onClick={closeMenu}>
          <img src={logo} alt="" />
        </NavLink>

        <div className="header-actions">
          <nav id="primary-nav" aria-label="주요 메뉴" className={isOpen ? "is-visible" : undefined}>
            <ul>
              {NAV_ITEMS.map(({ to, label, end }) => (
                <li key={to}>
                  <NavLink to={to} end={end} onClick={closeMenu}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <ButtonMode />

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={isOpen}
            aria-controls="primary-nav"
            aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
