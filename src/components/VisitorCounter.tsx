/**
 * VisitorCounter — always-visible corner tag at the bottom-right of the
 * viewport. Backed by the Python Azure Function in /api/function_app.py,
 * which atomically increments a counter in Cosmos DB and returns the new
 * value.
 *
 * Renders immediately with an em-dash placeholder so the tag is always
 * present (recognisable as part of the page chrome). If the API request
 * fails, the dash stays — no error UI, since the counter is decorative
 * metadata, not load-bearing.
 */
import { useEffect, useRef, useState } from 'react'

export function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const hasFetched = useRef(false)

  useEffect(() => {
    // Fade-in once the component is on the page
    const t = window.setTimeout(() => setMounted(true), 50)
    return () => window.clearTimeout(t)
  }, [])

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
        }
      } catch (error) {
        // Decorative — fail silently and leave the placeholder in place.
        console.error('Failed to fetch visitor count:', error)
      }
    }

    fetchVisitorCount()
  }, [])

  return (
    <div
      className={`fixed bottom-0 right-0 z-40 border-t border-l border-edge bg-canvas/90 backdrop-blur-md px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-opacity duration-700 ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
      aria-live="polite"
    >
      <span className="text-muted">Visitors&nbsp;·&nbsp;</span>
      <span className="text-accent tabular-nums">
        {visitorCount !== null ? visitorCount.toLocaleString() : '—'}
      </span>
    </div>
  )
}
