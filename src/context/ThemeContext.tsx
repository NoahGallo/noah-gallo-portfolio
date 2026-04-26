/**
 * ThemeContext — light/dark theme provider.
 *
 * On first load:
 *   1. Use the user's previously saved choice from localStorage if any
 *   2. Otherwise, default to light theme
 *
 * The chosen theme is applied by toggling the `dark` class on <html>,
 * which is what Tailwind's `dark:` variants key off of.
 *
 * The matching `useTheme` hook lives in `src/hooks/useTheme.ts`.
 */
import { createContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export type Theme = 'light' | 'dark'

export interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const STORAGE_KEY = 'noah-portfolio-theme'

// eslint-disable-next-line react-refresh/only-export-components -- context co-located with provider for ergonomics; matching `useTheme` hook lives in src/hooks/useTheme.ts.
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') return saved
  return 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  )
}
