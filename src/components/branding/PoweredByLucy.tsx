'use client'

// Vendored from Growth Engine sdk-client's unreleased branding component.
// Replace with the SDK export once a release includes PoweredByLucy.
import { useEffect, useRef, useState } from 'react'

export interface PoweredByLucyProps {
	/** Muted lead-in text. Override for i18n (e.g. "Propulsé par"). */
	label?: string
	/** `chip` = bordered pill, `inline` = logo + text with no border or background. */
	variant?: 'chip' | 'inline'
	/** `auto` follows the visitor's colour scheme; `light` / `dark` force it. */
	theme?: 'auto' | 'light' | 'dark'
	/** Defaults to `noopener` (followed link). */
	rel?: string
	className?: string
}

/** Clean backlink target: no query string, so every client site links the same canonical URL. */
export const POWERED_BY_LUCY_URL = 'https://recursive-solutions.com/'
const TITLE = 'Powered by Lucy by Recursive Solutions'
/** Two wave cycles (2 x 1.6s) plus a small buffer. */
const WAVE_MS = 3300

// Self-contained on purpose: this renders on third-party sites, so it must not depend on
// Tailwind / daisyUI or the host's CSS variables. Colours come from the Lucy avatar palette.
const CSS = `
.lucy-pb{--lucy-pb-fg:#4b5563;--lucy-pb-strong:#2e3a55;--lucy-pb-border:#d9dde5;--lucy-pb-border-hover:#ff6f8e;--lucy-pb-bg:#ffffff;--lucy-pb-tile:#ff6f8e;--lucy-pb-tile-fg:#ffffff;display:inline-flex;align-items:center;gap:8px;box-sizing:border-box;font:400 13px/1.2 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:var(--lucy-pb-fg);text-decoration:none;transition:border-color .15s ease,color .15s ease}
.lucy-pb *{box-sizing:border-box}
.lucy-pb[data-variant="chip"]{padding:4px 12px 4px 4px;border:1px solid var(--lucy-pb-border);border-radius:9999px;background:var(--lucy-pb-bg)}
.lucy-pb[data-variant="inline"]{padding:0;border:0;background:none}
.lucy-pb__mark{display:block;flex:none;width:24px;height:24px;border-radius:9999px;overflow:hidden;background:#fde8ee}
.lucy-pb__arm{transform-origin:86px 112px}
.lucy-pb__hand{transform-origin:92px 70px}
.lucy-pb[data-waving="true"] .lucy-pb__arm,.lucy-pb:hover .lucy-pb__arm{animation:lucy-pb-wave 1.6s ease-in-out 2}
.lucy-pb[data-waving="true"] .lucy-pb__hand,.lucy-pb:hover .lucy-pb__hand{animation:lucy-pb-flap .8s ease-in-out 4}
@keyframes lucy-pb-wave{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(10deg)}}
@keyframes lucy-pb-flap{0%,100%{transform:rotate(-16deg)}50%{transform:rotate(16deg)}}
@media (prefers-reduced-motion:reduce){.lucy-pb *{animation:none!important}}
.lucy-pb__label{color:var(--lucy-pb-fg)}
.lucy-pb__name{font-weight:700;color:var(--lucy-pb-strong)}
.lucy-pb:hover{border-color:var(--lucy-pb-border-hover)}
.lucy-pb:hover .lucy-pb__name{color:var(--lucy-pb-border-hover)}
.lucy-pb:focus-visible{outline:2px solid var(--lucy-pb-border-hover);outline-offset:2px}
.lucy-pb[data-theme="dark"]{--lucy-pb-fg:#a8b0c0;--lucy-pb-strong:#f3f4f6;--lucy-pb-border:#3a4358;--lucy-pb-bg:#171c28;--lucy-pb-border-hover:#ff8fa6}
@media (prefers-color-scheme:dark){.lucy-pb[data-theme="auto"]{--lucy-pb-fg:#a8b0c0;--lucy-pb-strong:#f3f4f6;--lucy-pb-border:#3a4358;--lucy-pb-bg:#171c28;--lucy-pb-border-hover:#ff8fa6}}
html[data-theme="light"] .lucy-pb[data-theme="auto"]{--lucy-pb-fg:#4b5563;--lucy-pb-strong:#2e3a55;--lucy-pb-border:#d9dde5;--lucy-pb-bg:#ffffff;--lucy-pb-border-hover:#ff6f8e}
html[data-theme="dark"] .lucy-pb[data-theme="auto"]{--lucy-pb-fg:#a8b0c0;--lucy-pb-strong:#f3f4f6;--lucy-pb-border:#3a4358;--lucy-pb-bg:#171c28;--lucy-pb-border-hover:#ff8fa6}
`
	.replace(/\n/g, '')
	.trim()

/**
 * "Powered by Lucy" footer badge. The link and text are rendered on the server (this client
 * component is still SSR'd); only the wave trigger runs after mount.
 * A design change here reaches every client site on its next SDK bump.
 */
export function PoweredByLucy({
	label = 'Powered by',
	variant = 'chip',
	theme = 'auto',
	rel = 'noopener',
	className,
}: PoweredByLucyProps) {
	const ref = useRef<HTMLAnchorElement>(null)
	const [waving, setWaving] = useState(false)

	useEffect(() => {
		const el = ref.current
		if (!el || typeof IntersectionObserver === 'undefined') return
		let timer: ReturnType<typeof setTimeout> | undefined
		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries.some((e) => e.isIntersecting)) return
				observer.disconnect()
				setWaving(true)
				timer = setTimeout(() => setWaving(false), WAVE_MS)
			},
			{ threshold: 0.6 },
		)
		observer.observe(el)
		return () => {
			observer.disconnect()
			if (timer) clearTimeout(timer)
		}
	}, [])

	return (
		<>
			<style dangerouslySetInnerHTML={{ __html: CSS }} />
			<a
				ref={ref}
				href={POWERED_BY_LUCY_URL}
				target="_blank"
				rel={rel}
				title={TITLE}
				data-variant={variant}
				data-theme={theme}
				{...(waving ? { 'data-waving': 'true' } : {})}
				className={className ? `lucy-pb ${className}` : 'lucy-pb'}
			>
				<svg
					className="lucy-pb__mark"
					viewBox="0 0 120 120"
					width="24"
					height="24"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>Recursive Solutions</title>
					<rect x="54" y="84" width="12" height="14" fill="#EDB891" />
					<path d="M26,120 Q28,100 60,96 Q92,100 94,120 Z" fill="#6DB8F2" />
					<path
						d="M34,104 Q28,114 30,124"
						fill="none"
						stroke="#4E9BD8"
						strokeWidth="11"
						strokeLinecap="round"
					/>
					<path d="M80,38 Q108,42 104,74 Q102,90 94,98 Q98,74 84,56 Z" fill="#C98F2E" />
					<circle cx="83" cy="40" r="4" fill="#F08A6E" />
					<ellipse cx="60" cy="62" rx="26" ry="29" fill="#EDB891" />
					<path d="M33,62 Q30,33 60,32 Q90,33 87,62 Q82,44 66,42 Q46,46 33,62 Z" fill="#D9A441" />
					<circle cx="42" cy="74" r="5" fill="#FF6F8E" opacity=".3" />
					<circle cx="78" cy="74" r="5" fill="#FF6F8E" opacity=".3" />
					<g stroke="#A8792A" strokeWidth="2.8" strokeLinecap="round" fill="none">
						<path d="M44,53 Q50,50 55,53" />
						<path d="M65,53 Q70,50 76,53" />
					</g>
					<ellipse cx="50" cy="65" rx="4.6" ry="6.4" fill="#2E3A55" />
					<ellipse cx="70" cy="65" rx="4.6" ry="6.4" fill="#2E3A55" />
					<circle cx="51.4" cy="62.6" r="1.4" fill="#fff" />
					<circle cx="71.4" cy="62.6" r="1.4" fill="#fff" />
					<path
						d="M52,76 Q60,86 68,76"
						fill="none"
						stroke="#C0526A"
						strokeWidth="3.6"
						strokeLinecap="round"
					/>
					<g className="lucy-pb__arm">
						<path
							d="M86,122 Q94,100 92,76"
							fill="none"
							stroke="#4E9BD8"
							strokeWidth="11"
							strokeLinecap="round"
						/>
						<g className="lucy-pb__hand">
							<rect x="85" y="48" width="14" height="24" rx="7" fill="#EDB891" />
							<rect
								x="80"
								y="58"
								width="7"
								height="12"
								rx="3.5"
								fill="#EDB891"
								stroke="#D39A74"
								strokeWidth="1"
							/>
						</g>
					</g>
				</svg>
				<span>
					<span className="lucy-pb__label">{label}</span>{' '}
					<span className="lucy-pb__name">Lucy</span>
				</span>
			</a>
		</>
	)
}
