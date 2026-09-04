'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { neonColors, neonShapes, runNeonBurst } from './neon-flicker'
import styles from './NeonHeadingEffects.module.css'

/** Decorate real heading glyphs without replacing React/SDK text, links, or HTML. */
export function NeonHeadingEffects() {
  const pathname = usePathname()
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused || pathname.includes('/heading-preview')) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    let timer: ReturnType<typeof setTimeout> | undefined
    let cancelBurst: (() => void) | undefined
    let overlay: HTMLSpanElement | undefined
    let lastHeading: HTMLElement | undefined
    let lastShape = -1
    let disposed = false
    const clear = () => {
      clearTimeout(timer)
      cancelBurst?.()
      cancelBurst = undefined
      overlay?.remove()
      overlay = undefined
    }
    const schedule = (delay = 800 + Math.random() * 1400) => {
      if (!disposed && !document.hidden && !reduced.matches) timer = setTimeout(pulse, delay)
    }
    const pulse = () => {
      clear()
      if (disposed || document.hidden || reduced.matches) return
      const headings = Array.from(document.querySelectorAll<HTMLElement>('main h1, main h2, main h3, main h4')).filter(heading => {
        if (heading.closest('[data-motion="paused"], [data-neon="off"], [aria-hidden="true"], [hidden]') || heading.querySelector('[data-neon-letter]') || heading.classList.contains('sr-only')) return false
        const rect = heading.getBoundingClientRect()
        const css = getComputedStyle(heading)
        return rect.width > 4 && rect.height > 4 && rect.top > 75 && rect.bottom < innerHeight - 20 && css.visibility === 'visible' && Number(css.opacity) > .95
      })
      if (!headings.length) { schedule(); return }
      const choices = headings.length > 1 ? headings.filter(h => h !== lastHeading) : headings
      const heading = choices[Math.floor(Math.random() * choices.length)]
      lastHeading = heading
      const glyphs: { node: Text; start: number; end: number; text: string }[] = []
      const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT)
      while (walker.nextNode()) {
        const node = walker.currentNode as Text
        const parent = node.parentElement
        if (!parent || parent.closest('.sr-only, [hidden], svg, script, style')) continue
        // aria-hidden letter copies in TypedText are the visible glyphs; their
        // screen-reader duplicate is excluded above.
        const css = getComputedStyle(parent)
        if (css.visibility !== 'visible' || Number(css.opacity) < .95) continue
        let offset = 0
        for (const char of Array.from(node.data)) {
          if (/[\p{L}\p{N}]/u.test(char)) glyphs.push({ node, start: offset, end: offset + char.length, text: char })
          offset += char.length
        }
      }
      if (!glyphs.length) { schedule(); return }
      const glyph = glyphs[Math.floor(Math.random() * glyphs.length)]
      const range = document.createRange()
      range.setStart(glyph.node, glyph.start)
      range.setEnd(glyph.node, glyph.end)
      const rect = range.getBoundingClientRect()
      if (rect.width < 1 || rect.left < 15 || rect.right > innerWidth - 15) { schedule(); return }
      const css = getComputedStyle(glyph.node.parentElement!)
      overlay = document.createElement('span')
      overlay.className = styles.overlay
      overlay.setAttribute('aria-hidden', 'true')
      lastShape = (lastShape + 1 + Math.floor(Math.random() * 2)) % neonShapes.length
      overlay.dataset.shape = neonShapes[lastShape]
      overlay.style.cssText = `left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px;`
      overlay.style.fontSize = css.fontSize
      overlay.style.setProperty('--accent', neonColors[Math.floor(Math.random() * neonColors.length)])
      overlay.style.setProperty('--tilt', `${Math.random() < .5 ? -5 : 5}deg`)
      const backing = document.createElement('span')
      backing.className = styles.backing
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute('viewBox', '0 0 100 100')
      svg.setAttribute('preserveAspectRatio', 'none')
      svg.setAttribute('focusable', 'false')
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('d', 'M13 5 L5 0 L10 -6 L0 -12 M89 79 C109 72 108 86 97 88 S86 102 107 98')
      svg.append(path)
      backing.append(svg)
      const ink = document.createElement('span')
      ink.className = styles.ink
      ink.textContent = glyph.text
      for (const key of ['fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'fontStretch', 'fontVariant', 'letterSpacing', 'textTransform'] as const) ink.style[key] = css[key]
      ink.style.lineHeight = `${rect.height}px`
      overlay.append(backing, ink)
      document.body.append(overlay)
      const target = overlay
      cancelBurst = runNeonBurst(lit => target.toggleAttribute('data-lit', lit), () => { target.remove(); overlay = undefined; schedule() })
    }
    // Moving/resizing content dismisses the accent rather than leaving it behind.
    const restart = () => { clear(); schedule() }
    const motionObserver = new MutationObserver(restart)
    motionObserver.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['data-motion', 'data-theme'] })
    const contentObserver = new MutationObserver(restart)
    const main = document.querySelector('main')
    if (main) contentObserver.observe(main, { subtree: true, childList: true, characterData: true })
    window.addEventListener('scroll', restart, { passive: true, capture: true })
    window.addEventListener('resize', restart)
    document.addEventListener('visibilitychange', restart)
    reduced.addEventListener('change', restart)
    schedule(500)
    return () => {
      disposed = true
      clear()
      motionObserver.disconnect()
      contentObserver.disconnect()
      window.removeEventListener('scroll', restart, true)
      window.removeEventListener('resize', restart)
      document.removeEventListener('visibilitychange', restart)
      reduced.removeEventListener('change', restart)
    }
  }, [pathname, paused])
  if (pathname.includes('/heading-preview')) return null
  return <button type="button" className={styles.pause} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? 'Resume heading effects' : 'Pause heading effects'}</button>
}
