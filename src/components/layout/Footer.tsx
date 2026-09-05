import Image from 'next/image'
import Link from 'next/link'
import type { Dictionary } from '@/i18n'
import { localizedPath } from '@/lib/i18n-utils'
import { ThemeToggle } from './ThemeToggle'

export function Footer({ dict, locale }: { dict: Dictionary; locale: string }) {
	const year = new Date().getFullYear()

	return (
		<footer className="hub-footer border-t border-base-300">
			<div className="hub-width py-10">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div>
						<Image src="/images/ai-juicing-logo-full.webp" alt="AI Juicing" width={1018} height={251} className="footer-full-logo" />
						<p className="text-base-content/60 text-sm">
							A little curiosity goes a long way.
						</p>
					</div>

					<div>
						<h4 className="font-semibold mb-2">{dict['footer.navigation']}</h4>
						<nav className="flex flex-col gap-1">
							<Link href={localizedPath('/', locale)} className="text-sm text-base-content/60 hover:text-primary">{dict['nav.home']}</Link>
							<Link href={localizedPath('/channel', locale)} className="text-sm text-base-content/60 hover:text-primary">The channel</Link>
							<Link href={localizedPath('/projects', locale)} className="text-sm text-base-content/60 hover:text-primary">Projects</Link>
							<Link href={localizedPath('/blog', locale)} className="text-sm text-base-content/60 hover:text-primary">{dict['nav.blog']}</Link>
							<Link href={localizedPath('/newsletter', locale)} className="text-sm text-base-content/60 hover:text-primary">Newsletter</Link>
							<Link href={localizedPath('/contact', locale)} className="text-sm text-base-content/60 hover:text-primary">{dict['nav.contact']}</Link>
						</nav>
					</div>

					<div>
						<h4 className="font-semibold mb-2">{dict['footer.legal']}</h4>
						<nav className="flex flex-col gap-1">
							<Link href={localizedPath('/legal', locale)} className="text-sm text-base-content/60 hover:text-primary">{dict['footer.legal.notice']}</Link>
							<Link href={localizedPath('/privacy', locale)} className="text-sm text-base-content/60 hover:text-primary">{dict['footer.privacy.policy']}</Link>
							<Link href={localizedPath('/cookies', locale)} className="text-sm text-base-content/60 hover:text-primary">{dict['footer.cookie.policy']}</Link>
						</nav>
					</div>
				</div>

				<div className="divider" />

				<div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
					<p className="text-sm text-base-content/50">
						{dict['footer.copyright'].replace('{year}', String(year))}
					</p>
					<a href="https://www.recursive-solutions.com" className="text-sm text-base-content/60 hover:text-primary underline underline-offset-4">
						{dict['footer.powered.by']}
					</a>
					<ThemeToggle dict={dict} />
				</div>
			</div>
		</footer>
	)
}
