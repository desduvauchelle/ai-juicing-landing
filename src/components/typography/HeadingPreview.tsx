'use client'

import { useState } from 'react'
import { NeonHeading } from './NeonHeading'
import styles from './HeadingPreview.module.css'

export function HeadingPreview() {
  const [paused, setPaused] = useState(false)
  const [pace, setPace] = useState<'calm' | 'playful'>('calm')
  return <div className={styles.preview}>
    <div className={styles.toolbar}>
      <span className={styles.label}>AI JUICING / TYPE EXPERIMENT 01</span>
      <div className={styles.controls}>
        <button onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? 'Resume effect' : 'Pause effect'}</button>
        <label>Rhythm <select value={pace} onChange={event => setPace(event.target.value as typeof pace)}><option value="calm">Calm</option><option value="playful">Playful</option></select></label>
      </div>
    </div>
    <section className={styles.hero}>
      <p className={styles.label}>A LITTLE CURIOSITY. A LITTLE ELECTRICITY.</p>
      <NeonHeading as="h1" text={'Let’s squeeze\nmore out of AI.'} className={styles.title} paused={paused} pace={pace} />
      <p className={styles.description}>A little neon passing through. The words stay still.<br />Watch a few letters light up, then settle back into the dark.</p>
    </section>
    <section className={styles.example}>
      <p className={styles.label}>AT SECTION SIZE</p>
      <NeonHeading text={'Notes from\nthe rabbit hole.'} className={styles.subtitle} paused={paused} pace={pace} />
      <p className={styles.description}>The useful bits, written down.</p>
    </section>
    <p className={styles.footnote}>Preview only · Existing website headings haven’t changed.</p>
  </div>
}
