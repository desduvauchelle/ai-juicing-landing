'use client'

import Image from 'next/image'
import { useState } from 'react'
import { channelSeries, lessonDuration, lessonEmbedUrl } from '@/lib/channel'
import { useVisualMotionPaused } from './CosmicScene'

export function ChannelPreview() {
  const [loaded, setLoaded] = useState(false)
  const paused = useVisualMotionPaused()
  const lesson = channelSeries[0].lessons[0]

  return <div className="channel-preview" data-still={paused || loaded}>
    <div className="channel-video-window">
      <div className="channel-window-bar"><span aria-hidden="true" className="channel-window-dots">● ● ●</span><span>AI JUICING / PLAY & LEARN</span><span aria-hidden="true">↗</span></div>
      <div className="channel-window-screen">
        {loaded ? <iframe src={lessonEmbedUrl(lesson.id)} title={lesson.title} allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> : <button type="button" onClick={() => setLoaded(true)} aria-label={`Load video: ${lesson.title}`}>
          <Image src={`/images/channel/${lesson.id}.webp`} alt="" fill sizes="(max-width: 767px) 100vw, 520px" />
          <span className="channel-preview-play" aria-hidden="true">▶</span>
          <span className="channel-preview-duration">{lessonDuration(lesson.seconds)}</span>
        </button>}
      </div>
      <div className="channel-window-footer"><div><span>START WITH THE BASICS</span><strong>How does AI actually work?</strong></div><span aria-hidden="true" className="channel-preview-spark">✳</span></div>
    </div>
    <p className="channel-preview-note">One small dot. A whole lot of understanding.</p>
    {loaded && <a className="text-link" href={`https://www.youtube.com/watch?v=${lesson.id}`} target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>}
  </div>
}
