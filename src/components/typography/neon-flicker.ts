export const neonColors = ['#ff26ce', '#00eaff', '#ffe832', '#a678ff', '#ff783b']
export const neonShapes = ['trapezoid', 'blob', 'ticket'] as const

/** Shared hard-cut timing for the standalone heading and site-wide enhancement. */
export function runNeonBurst(setLit: (lit: boolean) => void, complete: () => void) {
  const holds = [90, 260, 120, 290, 160, 270, 340]
  let timer: ReturnType<typeof setTimeout>
  let beat = 0
  const advance = () => {
    if (beat === holds.length) { setLit(false); complete(); return }
    setLit(beat % 2 === 0)
    timer = setTimeout(advance, holds[beat++])
  }
  advance()
  return () => { clearTimeout(timer); setLit(false) }
}
