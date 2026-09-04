# AI Juicing legal content review

Drafted September 3, 2026 for the public AI channel/project website, without visitor accounts. This is website-specific drafting, not a legal-compliance certification.

## Confirm before publishing

- Legal operator/controller name, country, applicable business registration and address details, and a monitored public contact/privacy email. Do not infer a legal entity from the AI Juicing brand.
- Hosting provider and relevant processing locations; actual contact-form fields and processing providers. The local form is not connected because the Growth Engine credentials are absent.
- Retention settings for contact submissions, host logs, and the GA4 property. The draft uses criteria instead of inventing fixed periods.
- Analytics consent approach. Current code loads a configured GA tag automatically after interactivity. The cookie policy states this honestly; it does not claim a consent banner exists. Obtain appropriate consent before activating optional tracking where required. The user has been asked whether to implement opt-in consent.
- Check whether the intended audience and operator location require additional disclosures or local notices. Have the operator or their adviser review before public launch.

## Implementation evidence

- `GoogleAnalytics.tsx`: enabled only with NEXT_PUBLIC_GA_MEASUREMENT_ID; no consent selector currently.
- `theme.ts`: browser local storage key `theme`, set by the appearance selector.
- YouTube: local thumbnails and user-triggered youtube-nocookie.com embeds in the channel, homepage preview, and project video components. Lesson selection also loads the player; actual playback is a further interaction. No claim of zero Google processing.
- Contact: Growth Engine FormRenderer, configured remotely through the existing site backend; no new provider or account introduced.
- Search Console: planned by owner; no additional tracking script added by this work.

## Official references reviewed

- Google Analytics safeguards: https://support.google.com/analytics/answer/6004245?hl=en
- GA4 cookies and defaults: https://support.google.com/analytics/answer/11397207?hl=en
- YouTube privacy-enhanced embeds: https://support.google.com/youtube/answer/171780?hl=en
- Search Console overview: https://support.google.com/webmasters/answer/9128668?hl=en
- ICO privacy-information requirements, including identity, purposes, recipients, retention criteria, and rights: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/
- CNIL audience-measurement guidance: https://www.cnil.fr/fr/node/677
