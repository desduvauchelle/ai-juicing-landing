'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── useGsap ────────────────────────────────────────────────────────────────
// Low-level hook: runs a GSAP callback inside a context for automatic cleanup.
//
// Usage:
//   const container = useRef<HTMLDivElement>(null)
//   useGsap((ctx) => {
//     gsap.from('.card', { opacity: 0, y: 40, stagger: 0.1 })
//   }, container, [])

export function useGsap(
  callback: (ctx: gsap.Context) => void,
  scope: React.RefObject<HTMLElement | null>,
  deps: React.DependencyList = [],
) {
  // This low-level adapter deliberately accepts the caller's dependency list,
  // just like useEffect. Static hook analysis cannot inspect that list here.
  // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/use-memo
  const stableCallback = useCallback(callback, deps)

  useEffect(() => {
    if (!scope.current) return

    const ctx = gsap.context(() => {
      stableCallback(ctx)
    }, scope.current)

    return () => ctx.revert()
  }, [scope, stableCallback])
}

// ─── useScrollReveal ────────────────────────────────────────────────────────
// High-level hook: returns a ref. Attach it to any element and it fades/slides
// into view on scroll. Set `stagger` to animate direct children sequentially.
//
// Usage:
//   const ref = useScrollReveal<HTMLDivElement>()
//   <div ref={ref}>I fade in on scroll</div>
//
//   const ref = useScrollReveal<HTMLDivElement>({ y: 60, stagger: 0.15 })
//   <div ref={ref}>
//     <div>Card 1</div>  <!-- each child staggers in -->
//     <div>Card 2</div>
//   </div>

export interface ScrollRevealOptions {
  /** Starting Y offset in px (default: 40) */
  y?: number
  /** Starting X offset in px (default: 0) */
  x?: number
  /** Starting opacity (default: 0) */
  opacity?: number
  /** Animation duration in seconds (default: 0.8) */
  duration?: number
  /** Stagger delay between children in seconds. When set, animates children instead of the element itself. */
  stagger?: number
  /** ScrollTrigger start position (default: 'top 85%') */
  start?: string
  /** Delay before animation starts in seconds (default: 0) */
  delay?: number
  /** Ease function (default: 'power2.out') */
  ease?: string
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {},
) {
  const ref = useRef<T>(null)
  // Scroll reveals use their initial options and run once per mount.
  const [initialOptions] = useState(options)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      y = 40,
      x = 0,
      opacity = 0,
      duration = 0.8,
      stagger,
      start = 'top 85%',
      delay = 0,
      ease = 'power2.out',
    } = initialOptions

    const fromVars: gsap.TweenVars = {
      opacity,
      y,
      x,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    }

    let ctx: gsap.Context

    if (stagger != null) {
      ctx = gsap.context(() => {
        gsap.from(el.children, { ...fromVars, stagger })
      }, el)
    } else {
      ctx = gsap.context(() => {
        gsap.from(el, fromVars)
      }, el)
    }

    return () => ctx.revert()
  }, [initialOptions])

  return ref
}

export { gsap, ScrollTrigger }
