import { useState, useEffect, useRef } from 'react'
import { Eye } from 'lucide-react'

export function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null)
  const hasFetched = useRef(false)

  useEffect(() => {
    // Prevent double API calls in development
    if (hasFetched.current) return
    hasFetched.current = true

    const fetchVisitorCount = async () => {
      try {
        // Different URLs for development vs production
        const isDevelopment = window.location.hostname === 'localhost'
        const apiUrl = isDevelopment 
          ? 'http://localhost:7071/api/GetResumeCounter'  // Local Azure Function
          : '/api/GetResumeCounter'                        // Production

        const response = await fetch(apiUrl)
        const data = await response.json()
        setVisitorCount(data.count)
      } catch (error) {
        console.error('Failed to fetch visitor count:', error)
      }
    }

    fetchVisitorCount()
  }, [])

  if (visitorCount === null) return null

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        <Eye size={16} />
        <span>Visitors: {visitorCount.toLocaleString()}</span>
      </div>
    </div>
  )
}
