'use client'
import { useState } from 'react'
export function ProjectVideo({ youtubeId, title }: { youtubeId: string; title: string }) {
  const [loaded, setLoaded] = useState(false)
  return <div className="project-video">
    {loaded ? <iframe src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`} title={title} allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> : <button type="button" onClick={() => setLoaded(true)} aria-label={`Load ${title}`}><span className="video-play" aria-hidden="true">▶</span><strong>{title}</strong><span>Load video from YouTube</span></button>}
    <a className="text-link" href={`https://www.youtube.com/watch?v=${youtubeId}`} target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>
  </div>
}
