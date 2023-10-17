'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }

  return (
    <button
      aria-label="Toggle Dark Mode"
      className="w-8 h-8"
      onClick={() => setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
        <HiOutlineSun className="w-7 h-7 m-auto" />
      ) : (
        <HiOutlineMoon className="w-6 h-6 m-auto" />
      )}
    </button>
  )
}

export default ThemeSwitch
