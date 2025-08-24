"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { SunIcon } from "./icons/SunIcon"
import { MoonIcon } from "./icons/MoonIcon"
import { Theme } from "../types"

export const ThemeToggle = (): React.ReactNode => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialTheme = savedTheme || (prefersDark ? Theme.DARK : Theme.LIGHT)

    setTheme(initialTheme)
    if (initialTheme === Theme.DARK) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  useEffect(() => {
    if (theme === Theme.DARK) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
      aria-label="Toggle theme"
    >
      {theme === Theme.LIGHT ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
    </button>
  )
}
