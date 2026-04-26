/**
 * Navigation — desktop top-nav links + mobile hamburger menu.
 *
 * Active section is auto-tracked using IntersectionObserver against each
 * section's `id`, so the highlighted link follows the user's scroll position
 * without any manual click state.
 */
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Experience', id: 'experience' },
  { name: 'Skills', id: 'skills' },
  { name: 'Certifications', id: 'certifications' },
  { name: 'Projects', id: 'projects' },
  { name: 'Contact', id: 'contact' },
] as const

export function Navigation() {
  const [activeSection, setActiveSection] = useState<string>('home')
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Scroll-spy: keep `activeSection` in sync with the section currently in view.
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    )

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that is intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      // -40% top margin means a section becomes "active" only once it's near
      // the top of the viewport, which feels right for top-nav highlighting.
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsMobileOpen(false)
  }

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex space-x-8" aria-label="Primary">
        {NAV_ITEMS.map((item) => {
          const active = activeSection === item.id
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`focus-ring relative font-medium transition-colors duration-200 ${
                active
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              {item.name}
              {/* Underline grows on hover/active */}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 ${
                  active ? 'w-full' : 'w-0'
                }`}
              />
            </button>
          )
        })}
      </nav>

      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setIsMobileOpen((v) => !v)}
        className="focus-ring md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMobileOpen}
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile dropdown */}
      {isMobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg">
          <nav className="flex flex-col p-4 gap-1" aria-label="Mobile primary">
            {NAV_ITEMS.map((item) => {
              const active = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`focus-ring text-left px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    active
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.name}
                </button>
              )
            })}
          </nav>
        </div>
      )}
    </>
  )
}
