export function ProjectVideo({ youtubeId, title }: { youtubeId: string; title: string }) {
  return <div className="project-video">
    <iframe src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`} title={title} allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
    <a className="text-link" href={`https://www.youtube.com/watch?v=${youtubeId}`} target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>
  </div>
}
