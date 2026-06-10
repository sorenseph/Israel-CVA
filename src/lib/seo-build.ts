import { profile, socialLinks } from '../data/cv'
import { publicLogoPath } from '../data/brand'
import { faqItems } from '../data/landing'

export const DEFAULT_SITE_URL = 'https://www.studioicva.com'

export function normalizeSiteUrl(url?: string): string {
  return (url?.trim() || DEFAULT_SITE_URL).replace(/\/$/, '')
}

export function buildStructuredData(siteUrl: string) {
  const image = `${siteUrl}${publicLogoPath}`
  const description =
    'Studio ICVA — agencia de productos digitales. Sitios web, webapps, SaaS, e-commerce, CRM, plataformas de servicios y apps móviles a medida.'

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
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
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: profile.name,
        description,
        url: siteUrl,
        inLanguage: 'es-MX',
        publisher: { '@id': `${siteUrl}/#organization` },
      },
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/#webpage`,
        url: siteUrl,
        name: `${profile.name} | Agencia de productos digitales`,
        description,
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#organization` },
        inLanguage: 'es-MX',
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
    ],
  }
}

export function buildSitemapXml(siteUrl: string) {
  const lastmod = new Date().toISOString().slice(0, 10)
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
}

export function buildRobotsTxt(siteUrl: string) {
  return `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`
}
