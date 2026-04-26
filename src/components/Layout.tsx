/**
 * Layout — fixed top header with site title, primary navigation, and a
 * theme-toggle button. Wraps all page sections.
 */
import type { ReactNode } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { Navigation } from './Navigation'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { theme, toggleTheme } = useTheme()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <header className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center py-4 gap-4">
            <button
              onClick={scrollToTop}
              className="focus-ring text-xl font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Noah Gallo
            </button>

            <Navigation />

            <button
              onClick={toggleTheme}
              className="focus-ring p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className="pt-20">{children}</main>
    </div>
  )
}
