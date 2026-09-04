'use client'

import { useEffect, useRef } from 'react'
import { useVisualMotionPaused } from '@/components/landing/CosmicScene'
import styles from './NeonHeading.module.css'

import { neonColors as colors, runNeonBurst } from './neon-flicker'

/** Quiet, random letter highlights. Text and layout never disappear or move. */
export function NeonHeading({ text, as: Tag = 'h2', className = '', paused = false, pace = 'calm' }: {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  className?: string
  paused?: boolean
  pace?: 'calm' | 'playful'
}) {
  const root = useRef<HTMLHeadingElement>(null)
  const globallyPaused = useVisualMotionPaused()

  useEffect(() => {
    const heading = root.current
    if (!heading || paused || globallyPaused) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const letters = Array.from(heading.querySelectorAll<HTMLElement>('[data-neon-letter]'))
    let visible = false
    let last = -1
    let lastShape = -1
    let timer: ReturnType<typeof setTimeout> | undefined
    let cancelBurst: (() => void) | undefined
    let activeLetter: HTMLElement | undefined
    const stop = () => {
      clearTimeout(timer)
      cancelBurst?.()
      activeLetter?.removeAttribute('data-neon-lit')
      activeLetter = undefined
    }
    const pulse = () => {
      if (!visible || document.hidden || reduced.matches || !letters.length) return
      let index = Math.floor(Math.random() * letters.length)
      if (index === last) index = (index + 1) % letters.length
      last = index
      const letter = letters[index]
      letter.style.setProperty('--neon-color', colors[Math.floor(Math.random() * colors.length)])
      activeLetter?.removeAttribute('data-neon-lit')
      activeLetter = letter
      letter.style.setProperty('--neon-tilt', `${Math.random() < .5 ? -5 : 5}deg`)
      const shapes = ['trapezoid', 'blob', 'ticket'] as const
      // Keep each burst consistent, but avoid repeating the previous silhouette.
      const shapeIndex = lastShape < 0
        ? Math.floor(Math.random() * shapes.length)
        : (lastShape + 1 + Math.floor(Math.random() * (shapes.length - 1))) % shapes.length
      lastShape = shapeIndex
      letter.dataset.neonShape = shapes[shapeIndex]
      // Literal on/off states, with no interpolation or animation easing.
      // Four uneven strikes on the same letter, then a separate cooldown.
      cancelBurst = runNeonBurst(lit => letter.toggleAttribute('data-neon-lit', lit), () => {
        activeLetter = undefined
        timer = setTimeout(pulse, 900 + Math.random() * (pace === 'calm' ? 1700 : 500))
      })
    }
    const resume = () => {
      stop()
      if (visible && !document.hidden && !reduced.matches) timer = setTimeout(pulse, 300 + Math.random() * 400)
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume() }, { threshold: .15 })
    observer.observe(heading)
    document.addEventListener('visibilitychange', resume)
    reduced.addEventListener('change', resume)
    return () => {
      stop()
      observer.disconnect()
      document.removeEventListener('visibilitychange', resume)
      reduced.removeEventListener('change', resume)
    }
  }, [text, paused, globallyPaused, pace])

  return <Tag ref={root} className={`${styles.heading} ${className}`}>
    <span className="sr-only">{text}</span>
    <span aria-hidden="true">{text.split(/(\s+)/).map((word, index) => /\s/.test(word) ? word :
      <span className={styles.word} key={index}>{Array.from(word).map((letter, i) =>
        <span className={styles.letter} data-neon-letter key={i}>
          <span className={styles.block}>
            <svg className={styles.squiggle} viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
              <path d="M 13 5 L 5 0 L 10 -6 L 0 -12 M 89 79 C 109 72 108 86 97 88 S 86 102 107 98" />
            </svg>
          </span>
          <span className={styles.ink}>{letter}</span>
        </span>)}</span>)}</span>
  </Tag>
}
