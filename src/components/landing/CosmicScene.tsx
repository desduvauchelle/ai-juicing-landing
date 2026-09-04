'use client'

import { createContext, useContext, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { gsap, ScrollTrigger } from '@/hooks/useGsap'

const VisualMotionContext = createContext(false)
export const useVisualMotionPaused = () => useContext(VisualMotionContext)

/** Content is visible by default. Pausing or reduced motion restores every reveal. */
export function CosmicScene({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  const revealed = useRef(new WeakSet<HTMLElement>())

  useEffect(() => {
    if (!root.current || paused) return
    const media = gsap.matchMedia()
    media.add({ motion: '(prefers-reduced-motion: no-preference)', mobile: '(max-width: 767px)' }, context => {
      if (!context.conditions?.motion) return
      const scope = root.current!
      const mobile = context.conditions.mobile
      const animations = new Map<HTMLElement, gsap.core.Tween>()
      const seen = revealed.current
      // Returning to a section never hides it again. Only entrance motion is replay-free.
      const entrance = (element: HTMLElement, targets: gsap.TweenTarget, vars: gsap.TweenVars) => {
        if (seen.has(element)) return
        if (element.getBoundingClientRect().bottom < 0) { seen.add(element); return }
        const tween = gsap.from(targets, {
          ...vars,
          onComplete: () => { seen.add(element) },
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        })
        animations.set(element, tween)
      }
      gsap.utils.toArray<HTMLElement>('[data-type-reveal]', scope).forEach(heading => {
        const letters = heading.querySelectorAll('.typed-letter')
        entrance(heading, letters, {
          opacity: 0, y: 5, duration: .16, ease: 'power1.out',
          stagger: Math.min(.026, 1.15 / Math.max(letters.length, 1)),
        })
      })
      gsap.utils.toArray<HTMLElement>('.section-heading > p, .intro-line > span, .notes-empty, .closing-section > p, .closing-section > a, .project-shelf-actions', scope).forEach(element => {
        entrance(element, element, { opacity: 0, y: mobile ? 12 : 22, duration: .65, ease: 'power2.out' })
      })
      gsap.utils.toArray<HTMLElement>('.channel-feature, .channel-topics article, .primer-grid article, .shelf-card', scope).forEach((element, index) => {
        const fromRight = element.matches('.channel-topics article') || index % 2 === 1
        entrance(element, element, {
          opacity: 0, x: fromRight ? (mobile ? 22 : 64) : (mobile ? -15 : -36),
          y: 12, duration: .8, delay: index % 2 * .10, ease: 'power3.out',
        })
      })
      gsap.to(scope.querySelector('.cosmic-sky'), {
        y: -120, ease: 'none', scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom bottom', scrub: 1.5 },
      })
      // Tabbing to a not-yet-revealed link must make its whole card visible immediately.
      const showFocusedContent = (event: FocusEvent) => {
        if (!(event.target instanceof Node)) return
        animations.forEach((tween, element) => {
          if (element.contains(event.target as Node)) {
            tween.progress(1)
            tween.scrollTrigger?.kill()
          }
        })
      }
      scope.addEventListener('focusin', showFocusedContent)
      ScrollTrigger.refresh()
      return () => scope.removeEventListener('focusin', showFocusedContent)
    }, root)
    return () => media.revert()
  }, [paused])

  return (
    <VisualMotionContext.Provider value={paused}><div ref={root} className="cosmic-scene" data-motion={paused ? 'paused' : 'playing'}>
      <div className="cosmic-sky" aria-hidden="true">
        {Array.from({ length: 54 }, (_, i) => <span key={i} className={i % 7 === 0 ? 'space-star space-star-cross' : 'space-star'} style={{ left: `${(i * 37 + 11) % 100}%`, top: `${(i * 61 + 7) % 100}%`, '--delay': `${-(i % 9)}s`, '--size': `${i % 7 === 0 ? 9 : 2 + i % 2}px` } as CSSProperties} />)}
      </div>
      <button type="button" className="motion-toggle" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? 'Resume visual animations' : 'Pause visual animations'}>{paused ? '▶ Motion paused' : 'Ⅱ Pause motion'}</button>
      {children}
    </div></VisualMotionContext.Provider>
  )
}
