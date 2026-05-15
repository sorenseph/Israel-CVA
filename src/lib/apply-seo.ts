import { seo, absoluteUrl, resolveSiteUrl } from '../data/seo'
import { profile } from '../data/cv'

function upsertMeta(
  attr: 'name' | 'property',
  key: string,
  content: string,
) {
  if (!content) return
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  if (!href) return
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

function injectJsonLd() {
  const id = 'portfolio-json-ld'
  document.getElementById(id)?.remove()

  const url = resolveSiteUrl() || undefined
  const script = document.createElement('script')
  script.id = id
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': url ? `${url}/#person` : '#person',
        name: profile.name,
        jobTitle: profile.role,
        description: profile.summary,
        email: `mailto:${profile.email}`,
        telephone: profile.phone,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Ciudad de México',
          addressCountry: 'MX',
        },
        url,
        image: url ? absoluteUrl(seo.image) : seo.image,
        knowsAbout: [
          'Vue.js',
          'Angular',
          'TypeScript',
          'Microfrontends',
          'Supabase',
          'CI/CD',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': url ? `${url}/#website` : '#website',
        name: seo.siteName,
        description: seo.description,
        url,
        inLanguage: 'es-MX',
        publisher: { '@id': url ? `${url}/#person` : '#person' },
      },
      {
        '@type': 'ProfilePage',
        '@id': url ? `${url}/#profile` : '#profile',
        name: seo.title,
        description: seo.description,
        url,
        isPartOf: { '@id': url ? `${url}/#website` : '#website' },
        about: { '@id': url ? `${url}/#person` : '#person' },
        inLanguage: 'es-MX',
      },
    ],
  })
  document.head.appendChild(script)
}

/** Refuerza meta tags y datos estructurados en el cliente (SPA). */
export function applySeo() {
  const canonical = resolveSiteUrl() ? `${resolveSiteUrl()}/` : undefined
  const image = absoluteUrl(seo.image)

  document.title = seo.title
  document.documentElement.lang = 'es'

  upsertMeta('name', 'description', seo.description)
  upsertMeta('name', 'keywords', seo.keywords)
  upsertMeta('name', 'author', seo.author)
  upsertMeta('name', 'robots', 'index, follow, max-image-preview:large')
  upsertMeta('name', 'theme-color', seo.themeColor)
  upsertMeta('name', 'format-detection', 'telephone=yes')

  upsertMeta('property', 'og:type', seo.ogType)
  upsertMeta('property', 'og:site_name', seo.siteName)
  upsertMeta('property', 'og:title', seo.title)
  upsertMeta('property', 'og:description', seo.description)
  upsertMeta('property', 'og:image', image)
  upsertMeta('property', 'og:image:alt', seo.imageAlt)
  upsertMeta('property', 'og:locale', seo.locale)
  if (canonical) upsertMeta('property', 'og:url', canonical)

  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', seo.title)
  upsertMeta('name', 'twitter:description', seo.description)
  upsertMeta('name', 'twitter:image', image)
  upsertMeta('name', 'twitter:image:alt', seo.imageAlt)

  if (canonical) upsertLink('canonical', canonical)

  injectJsonLd()
}
