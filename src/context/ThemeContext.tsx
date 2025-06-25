import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

// Define what our theme context will contain
type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

// Create the context (like a "box" to store our theme data)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Provider component - wraps our app and provides theme to all children
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light') // Default to light

  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  // Apply theme to HTML element (for Tailwind dark mode)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook to use theme in any component
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
