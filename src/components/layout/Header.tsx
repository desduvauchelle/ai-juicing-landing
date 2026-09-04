import Image from 'next/image'
import Link from 'next/link'
import type { Dictionary } from '@/i18n'
import { localizedPath } from '@/lib/i18n-utils'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MobileMenu } from './MobileMenu'

export function Header({ dict, locale }: { dict: Dictionary; locale: string }) {
	const NAV_LINKS = [
		{ href: localizedPath('/channel', locale), label: 'The channel' },
		{ href: localizedPath('/projects', locale), label: 'Projects' },
		{ href: localizedPath('/blog', locale), label: dict['nav.blog'] },
		{ href: localizedPath('/contact', locale), label: dict['nav.contact'] },
	]

	return (
		<header className="navbar hub-header sticky top-0 z-50">
			<div className="hub-width flex items-center justify-between">
				<Link href={localizedPath('/', locale)} className="hub-wordmark">
					<Image src="/images/ai-juicing-logo-full.webp" alt="AI Juicing" width={1018} height={251} className="brand-full-logo" priority />
				</Link>

				{/* Desktop nav */}
				<nav className="hidden md:flex items-center gap-7">
					{NAV_LINKS.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="text-base-content/70 hover:text-primary transition-colors"
						>
							{link.label}
						</Link>
					))}
					<LanguageSwitcher locale={locale} />
				</nav>

				{/* Mobile nav — client component handles toggle state */}
				<MobileMenu links={NAV_LINKS} locale={locale} />
			</div>
		</header>
	)
}
