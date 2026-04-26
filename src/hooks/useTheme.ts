/**
 * useTheme — read the current theme and toggle it from any component.
 *
 * Lives in its own file so React Fast Refresh keeps working in dev
 * (Fast Refresh requires component files to export only components).
 */
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
