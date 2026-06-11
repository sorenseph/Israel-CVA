import type { Locale } from '../i18n'
import { seo, absoluteUrl, resolveSiteUrl } from '../data/seo'
import { defaultOgImage } from '../data/seo-assets'
import { buildStructuredData } from './seo-build'

const JSON_LD_ID = 'portfolio-json-ld'

const OG_LOCALE: Record<Locale, string> = {
  es: 'es_MX',
  en: 'en_US',
}

const OG_LOCALE_ALT: Record<Locale, string> = {
  es: 'en_US',
  en: 'es_MX',
}

const HTML_LANG: Record<Locale, string> = {
  es: 'es-MX',
  en: 'en',
}

export interface PageSeoInput {
  title: string
  description: string
  keywords?: string
  path: string
  locale: Locale
  imagePath?: string
  imageAlt?: string
  ogType?: string
  robots?: string
  structuredData?: unknown
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
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
  let el = document.querySelector(`link[rel="${rel}"]:not([hreflang])`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

function setHreflangAlternates(canonical: string) {
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove())

  for (const hreflang of ['es-MX', 'en', 'x-default'] as const) {
    const link = document.createElement('link')
    link.rel = 'alternate'
    link.hreflang = hreflang
    link.href = canonical
    document.head.appendChild(link)
  }
}

function injectJsonLd(data: unknown | undefined) {
  document.getElementById(JSON_LD_ID)?.remove()
  if (!data) return

  const script = document.createElement('script')
  script.id = JSON_LD_ID
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}

/** Actualiza title, meta, Open Graph, Twitter Cards, canonical, hreflang y JSON-LD. */
export function applyPageSeo(input: PageSeoInput) {
  const canonical = absoluteUrl(input.path)
  const imagePath = input.imagePath ?? defaultOgImage
  const image = absoluteUrl(imagePath)
  const imageAlt = input.imageAlt ?? seo.imageAlt
  const ogLocale = OG_LOCALE[input.locale]
  const ogLocaleAlt = OG_LOCALE_ALT[input.locale]

  document.title = input.title
  document.documentElement.lang = HTML_LANG[input.locale]

  upsertMeta('name', 'description', input.description)
  if (input.keywords) upsertMeta('name', 'keywords', input.keywords)
  upsertMeta('name', 'author', seo.author)
  upsertMeta('name', 'robots', input.robots ?? 'index, follow, max-image-preview:large')
  upsertMeta('name', 'googlebot', 'index, follow, max-image-preview:large')
  upsertMeta('name', 'theme-color', seo.themeColor)
  upsertMeta('name', 'format-detection', 'telephone=yes')
  upsertMeta('name', 'application-name', seo.siteName)
  upsertMeta('name', 'apple-mobile-web-app-title', seo.siteName)

  upsertMeta('property', 'og:type', input.ogType ?? 'website')
  upsertMeta('property', 'og:site_name', seo.siteName)
  upsertMeta('property', 'og:title', input.title)
  upsertMeta('property', 'og:description', input.description)
  upsertMeta('property', 'og:url', canonical)
  upsertMeta('property', 'og:locale', ogLocale)
  upsertMeta('property', 'og:locale:alternate', ogLocaleAlt)
  upsertMeta('property', 'og:image', image)
  upsertMeta('property', 'og:image:secure_url', image)
  upsertMeta('property', 'og:image:alt', imageAlt)
  upsertMeta('property', 'og:image:type', seo.ogImageType)
  upsertMeta('property', 'og:image:width', String(seo.ogImageWidth))
  upsertMeta('property', 'og:image:height', String(seo.ogImageHeight))

  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', input.title)
  upsertMeta('name', 'twitter:description', input.description)
  upsertMeta('name', 'twitter:image', image)
  upsertMeta('name', 'twitter:image:alt', imageAlt)
  if (seo.twitterHandle) upsertMeta('name', 'twitter:site', seo.twitterHandle)

  upsertLink('canonical', canonical)
  setHreflangAlternates(canonical)
  injectJsonLd(input.structuredData)
}

/** SEO inicial antes de montar Vue (crawlers y primera pintura). */
export function applyDefaultSeo() {
  const siteUrl = resolveSiteUrl()
  if (!siteUrl) return

  applyPageSeo({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    path: '/',
    locale: 'es',
    imagePath: defaultOgImage,
    structuredData: buildStructuredData(siteUrl),
  })
}
