import { useEffect, useState } from "react"

export type Theme = "light" | "dark"

const STORAGE_KEY = "theme"

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === "light" || stored === "dark") return stored

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

// index.html의 인라인 스크립트가 첫 페인트 전에 이미 html[data-theme]를 설정해두므로,
// 여기서는 같은 로직으로 React state를 초기값과 맞추기만 하면 깜빡임(FOUC)이 없다.
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  return { theme, toggleTheme }
}
