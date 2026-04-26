/**
 * VisitorCounter — tiny floating widget at bottom-right that shows how many
 * times the page has been visited. Backed by the Python Azure Function in
 * /api/function_app.py, which atomically increments a counter in Cosmos DB
 * and returns the new value.
 *
 * The widget hides itself silently if the API call fails — no error UI,
 * since the counter is decorative, not load-bearing.
 */
import { useEffect, useRef, useState } from 'react'
import { Eye } from 'lucide-react'

export function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const hasFetched = useRef(false)

  useEffect(() => {
    // Guard against React 19 strict-mode double-invoke in dev
    if (hasFetched.current) return
    hasFetched.current = true

    const fetchVisitorCount = async () => {
      try {
        const isDevelopment = window.location.hostname === 'localhost'
        const apiUrl = isDevelopment
          ? 'http://localhost:7071/api/GetResumeCounter'
          : '/api/GetResumeCounter'

        const response = await fetch(apiUrl)
        const data = (await response.json()) as { count?: number }
        if (typeof data.count === 'number') {
          setVisitorCount(data.count)
          // Brief delay so the slide-in transition fires after the count is set
          window.setTimeout(() => setIsVisible(true), 100)
        }
      } catch (error) {
        console.error('Failed to fetch visitor count:', error)
      }
    }

    fetchVisitorCount()
  }, [])

  if (visitorCount === null) return null

  return (
    <div
      className={`fixed bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:scale-105 hover:shadow-xl group ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        <Eye size={16} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
        <span className="font-medium">
          Visitors:{' '}
          <span className="text-blue-600 dark:text-blue-400 font-semibold">
            {visitorCount.toLocaleString()}
          </span>
        </span>
      </div>
    </div>
  )
}
