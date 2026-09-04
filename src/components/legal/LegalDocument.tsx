import Link from 'next/link'
import { localizedPath } from '@/lib/i18n-utils'
import { legalContent, type LegalPageKey } from '@/lib/legal-content'

export function LegalDocument({ page, locale }: { page: LegalPageKey; locale: string }) {
  const content = legalContent[page]
  return <article className="hub-width legal-document">
    <header><p className="eyebrow">AI Juicing / The details</p><h1>{content.title}</h1><p className="legal-intro">{content.intro}</p><p className="legal-updated">Last updated: September 3, 2026</p></header>
    <nav aria-label="On this page" className="legal-contents">{content.sections.map((section, index) => <a key={section.title} href={`#section-${index + 1}`}>{section.title}</a>)}</nav>
    <div className="legal-body">{content.sections.map((section, index) => <section key={section.title} id={`section-${index + 1}`}><h2>{section.title}</h2>{section.paragraphs.map(text => <p key={text}>{text}</p>)}</section>)}</div>
    {page !== 'legal' && <section className="legal-resources"><h2>Google’s information and controls</h2><ul><li><a href="https://policies.google.com/privacy">Google Privacy Policy</a></li><li><a href="https://policies.google.com/technologies/partner-sites">How Google uses information from sites that use its services</a></li><li><a href="https://support.google.com/analytics/answer/11397207?hl=en">Google Analytics cookie details</a></li><li><a href="https://tools.google.com/dlpage/gaoptout">Google Analytics opt-out browser add-on</a></li><li><a href="https://support.google.com/youtube/answer/171780?hl=en">YouTube privacy-enhanced embeds</a></li><li><a href="https://www.youtube.com/t/terms">YouTube Terms of Service</a></li></ul></section>}
    <footer className="legal-links"><Link href={localizedPath('/contact', locale)}>Contact AI Juicing ↗</Link>{(Object.keys(legalContent) as LegalPageKey[]).filter(key => key !== page).map(key => <Link key={key} href={localizedPath(`/${key}`, locale)}>{legalContent[key].title} ↗</Link>)}</footer>
  </article>
}
