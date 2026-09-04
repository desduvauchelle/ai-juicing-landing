'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { channelSeries, lessonDuration, seriesMinutes, lessonEmbedUrl } from '@/lib/channel'

export function LessonLibrary() {
  const [seriesIndex, setSeriesIndex] = useState(0)
  const [lessonIndex, setLessonIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const player = useRef<HTMLDivElement>(null)
  const series = channelSeries[seriesIndex]
  const lesson = series.lessons[lessonIndex]

  function selectLesson(index: number) {
    setLessonIndex(index)
    setLoaded(true)
    // Selecting below the player on a phone returns the viewer to the lesson.
    // Native scrolling respects the site's reduced-motion rule.
    player.current?.scrollIntoView({ block: 'start', behavior: 'instant' })
  }

  return <section id="lessons" className="lesson-library" aria-labelledby="lessons-heading">
    <div className="section-heading"><p className="eyebrow">Pick a path. Press play.</p><h2 id="lessons-heading">A little less mystery.<br />A lot more “I can do that.”</h2></div>
    <div className="series-picker" role="group" aria-label="Choose a learning series">
      {channelSeries.map((item, index) => <button key={item.slug} type="button" aria-pressed={seriesIndex === index} onClick={() => { setSeriesIndex(index); setLessonIndex(0); setLoaded(false) }}>
        <span className="series-label">{item.label}</span><strong>{item.name}</strong><span>{item.lessons.length} videos · {seriesMinutes(item)} min</span>
      </button>)}
    </div>
    <div className="series-intro"><div><h3>{series.name}</h3><p>{series.description}</p></div>{series.playlistId && <a href={`https://www.youtube.com/playlist?list=${series.playlistId}`} target="_blank" rel="noopener noreferrer" className="text-link">Playlist on YouTube ↗</a>}</div>
    <div className="lesson-layout">
      <div ref={player} className="lesson-main">
        <div className="lesson-player">
          {loaded ? <iframe key={lesson.id} src={lessonEmbedUrl(lesson.id)} title={lesson.title} allow="encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /> : <button className="lesson-poster" type="button" onClick={() => setLoaded(true)} aria-label={`Load video: ${lesson.title}`}>
            <Image src={`/images/channel/${lesson.id}.webp`} alt="" fill sizes="(max-width: 900px) 100vw, 800px" priority />
            <span className="lesson-play"><span aria-hidden="true">▶</span><strong>Watch this lesson</strong></span>
          </button>}
        </div>
        <div className="lesson-caption"><p className="lesson-position" role="status">Lesson {lessonIndex + 1} of {series.lessons.length} · {lessonDuration(lesson.seconds)}</p><h3>{lesson.title}</h3><p>{lesson.summary}</p></div>
        <div className="lesson-next-prev"><button type="button" disabled={lessonIndex === 0} onClick={() => selectLesson(lessonIndex - 1)}>← Previous lesson</button><button type="button" disabled={lessonIndex === series.lessons.length - 1} onClick={() => selectLesson(lessonIndex + 1)}>Next lesson →</button></div>
        <div className="lesson-practice"><span>Give it a go</span><p>{lesson.tryIt}</p></div>
        <a className="lesson-external" href={`https://www.youtube.com/watch?v=${lesson.id}${series.playlistId ? `&list=${series.playlistId}` : ''}`} target="_blank" rel="noopener noreferrer">Watch on YouTube or join the comments ↗</a>
      </div>
      <aside className="lesson-queue" aria-label={`${series.name} lesson list`}>
        <h3>In this {series.playlistId ? 'playlist' : 'selection'}</h3><p>Watch in order, or jump to what you need.</p>
        <ol>{series.lessons.map((item, index) => <li key={item.id}><button type="button" aria-current={index === lessonIndex ? 'step' : undefined} onClick={() => selectLesson(index)}>
          <span className="lesson-number">{String(index + 1).padStart(2, '0')}</span><div className="lesson-thumb"><Image src={`/images/channel/${item.id}.webp`} alt="" fill sizes="96px" /></div><span className="lesson-list-copy"><strong>{item.topic}</strong><span>{lessonDuration(item.seconds)}{index === lessonIndex ? ' · Selected' : ''}</span></span>
        </button></li>)}</ol>
      </aside>
    </div>
  </section>
}
