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
    <div className="min-h-screen bg-canvas text-ink transition-colors">
      <header className="fixed top-0 w-full bg-canvas/85 backdrop-blur-md border-b border-edge z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center py-4 gap-4">
            <button
              onClick={scrollToTop}
              className="focus-ring font-mono text-sm tracking-wide hover:text-accent transition-colors"
            >
              NOAH&nbsp;GALLO
            </button>

            <Navigation />

            <button
              onClick={toggleTheme}
              className="focus-ring p-2 rounded-md border border-edge hover:border-accent hover:text-accent transition-colors"
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
