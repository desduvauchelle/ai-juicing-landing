# Channel lessons

Public YouTube metadata and playlist order reviewed September 3, 2026. The channel page uses a local editorial snapshot, not a live API or scraper. Summaries paraphrase the video descriptions; “Give it a go” exercises are editorial additions.

## Public playlists

- [AI Basics](https://www.youtube.com/playlist?list=PLzzixGKRRklWVEN20-z3-hYEyGc6w9jf2): iHaS6riS244, 8QPkHVkSpN8, SGdpHtES6EU, NKLncaV6esk, in that order.
- [AI Prompts - YouTube Gen AI](https://www.youtube.com/playlist?list=PLzzixGKRRklU-QzcrHcGR8b579JjP6PCJ): zYYg5Eaobw0, rTbiNaZVfG0, RdBC7UBt580, in that order.

“More from the channel” is a separate editorial selection, not a claimed YouTube playlist:

- [AI capabilities and limits](https://www.youtube.com/watch?v=un31wwPPv_8)
- [GitHub for AI builders](https://www.youtube.com/watch?v=YxjtH2aO0zg)

Titles, durations, descriptions, and thumbnails came from public watch-page metadata. All nine videos reported playability OK and embedding enabled at review time. Thumbnail files in `public/images/channel/` are optimized WebP copies of the corresponding channel thumbnails. This does not guarantee future availability or playback in every browser or region.

The website mounts one privacy-enhanced YouTube iframe after a visitor selects a video. Playback is user initiated, with manual Previous/Next navigation, fullscreen support, and a direct YouTube fallback link. No automatic next-video behavior or saved progress is implied. To refresh the collection, update `src/lib/channel.ts` and the corresponding thumbnail files.
