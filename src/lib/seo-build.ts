import { profile, socialLinks } from '../data/cv'
import { deliverableMeta } from '../data/cv'
import { defaultOgImage } from '../data/seo-assets'
import { faqItems as defaultFaqItems } from '../data/landing'
import type { FaqItemMessage, Locale } from '../i18n/types'

export const DEFAULT_SITE_URL = 'https://www.studioicva.com'

export function normalizeSiteUrl(url?: string): string {
  return (url?.trim() || DEFAULT_SITE_URL).replace(/\/$/, '')
}

const IN_LANGUAGE: Record<Locale, string> = {
  es: 'es-MX',
  en: 'en',
}

export interface PageStructuredDataInput {
  siteUrl: string
  locale: Locale
  page: 'home' | 'simulator' | 'demo'
  path: string
  title: string
  description: string
  breadcrumbLabels?: {
    home: string
    explore: string
    current: string
  }
  faqItems?: FaqItemMessage[]
}

function organizationNode(siteUrl: string, image: string) {
  return {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${siteUrl}/#organization`,
    name: profile.name,
    url: siteUrl,
    image,
    logo: { '@type': 'ImageObject', url: image },
    description: profile.summary,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'MX',
    },
    areaServed: { '@type': 'Country', name: 'México' },
    priceRange: '$$',
    knowsAbout: [
      'Desarrollo web',
      'Aplicaciones SaaS',
      'E-commerce',
      'CRM',
      'Aplicaciones móviles',
      'Plataformas digitales',
    ],
    sameAs: socialLinks.map((link) => link.url),
  }
}

function websiteNode(siteUrl: string, description: string, inLanguage: string) {
  return {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: profile.name,
    description,
    url: siteUrl,
    inLanguage,
    publisher: { '@id': `${siteUrl}/#organization` },
  }
}

function faqNode(siteUrl: string, items: FaqItemMessage[]) {
  return {
    '@type': 'FAQPage',
    '@id': `${siteUrl}/#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

/** Datos estructurados dinámicos por página e idioma (runtime). */
export function buildPageStructuredData(input: PageStructuredDataInput) {
  const { siteUrl, locale, page, path, title, description } = input
  const inLanguage = IN_LANGUAGE[locale]
  const image = `${siteUrl}${defaultOgImage}`
  const pageUrl = `${siteUrl}${path}`
  const pageId = `${pageUrl}#webpage`
  const faq = input.faqItems ?? defaultFaqItems

  const graph: Record<string, unknown>[] = [
    organizationNode(siteUrl, image),
    websiteNode(siteUrl, description, inLanguage),
    {
      '@type': 'WebPage',
      '@id': pageId,
      url: pageUrl,
      name: title,
      description,
      inLanguage,
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#organization` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: image,
      },
    },
  ]

  if (page === 'home') {
    graph.push(faqNode(siteUrl, faq))
  }

  if (page === 'simulator' && input.breadcrumbLabels) {
    const { home, explore, current } = input.breadcrumbLabels
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: home,
          item: `${siteUrl}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: explore,
          item: `${siteUrl}/#proyectos`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: current,
          item: pageUrl,
        },
      ],
    })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

/** Datos estructurados estáticos para el build (HTML inicial en español). */
export function buildStructuredData(siteUrl: string) {
  return buildPageStructuredData({
    siteUrl,
    locale: 'es',
    page: 'home',
    path: '/',
    title: `${profile.name} | Agencia de productos digitales`,
    description:
      'Studio ICVA — agencia de productos digitales. Sitios web, webapps, SaaS, e-commerce, CRM, plataformas de servicios y apps móviles a medida.',
    faqItems: defaultFaqItems,
  })
}

export function buildSitemapXml(siteUrl: string) {
  const lastmod = new Date().toISOString().slice(0, 10)
  const simulatorUrls = deliverableMeta
    .map((item) => item.slug)
    .map(
      (slug) => `  <url>
    <loc>${siteUrl}/explorar/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/demo</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${simulatorUrls}
</urlset>
`
}

export function buildRobotsTxt(siteUrl: string) {
  return `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`
}
