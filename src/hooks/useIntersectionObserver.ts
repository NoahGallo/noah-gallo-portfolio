import { useEffect, useRef, useState } from 'react'

/**
 * Triggers a "visible" flag the first time an element scrolls into view.
 *
 * Used throughout the site to power scroll-reveal animations:
 *   const { ref, isVisible } = useIntersectionObserver()
 *   <div ref={ref} className={isVisible ? 'opacity-100' : 'opacity-0'}>
 *
 * Defaults are tuned for smooth, predictable reveals:
 *   - threshold 0.15: needs ~15% of the element on-screen to fire
 *   - rootMargin '0px 0px -50px 0px': fires only once the element is
 *     at least 50px past the bottom edge of the viewport (prevents
 *     elements triggering before they're truly visible)
 *
 * One-shot by default: once visible, the observer disconnects so the
 * animation never replays when scrolling back up. Pass { reTrigger: true }
 * to opt back into re-triggering on every scroll-in.
 */
interface Options {
  threshold?: number
  rootMargin?: string
  reTrigger?: boolean
}

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: Options = {},
) {
  const { threshold = 0.15, rootMargin = '0px 0px -50px 0px', reTrigger = false } = options

  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (!reTrigger) observer.unobserve(entry.target)
        } else if (reTrigger) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, reTrigger])

  return { ref, isVisible }
}
