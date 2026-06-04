import { profile } from './cv'
import { brand } from './brand'

const siteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ?? ''

export const seo = {
  siteName: profile.name,
  title: `${profile.name} | Agencia de productos digitales`,
  titleTemplate: '%s | Agencia de productos digitales',
  description:
    'Studio ICVA — agencia en CDMX. Sitios web, webapps, SaaS, e-commerce, CRM, plataformas de servicios y apps móviles a medida.',
  keywords: [
    'agencia desarrollo web',
    'desarrollo webapps',
    'SaaS México',
    'e-commerce CDMX',
    'CRM a medida',
    'aplicaciones móviles',
    'plataformas digitales',
    'Studio ICVA',
    'productos digitales',
  ].join(', '),
  author: profile.name,
  locale: 'es_MX',
  themeColor: '#f4f3ef',
  twitterHandle: '',
  ogType: 'website',
  image: brand.logoPng,
  imageAlt: brand.alt,
  email: profile.email,
  phone: profile.phone,
  location: profile.location,
  jobTitle: profile.role,
  siteUrl,
} as const

export function resolveSiteUrl(): string {
  if (seo.siteUrl) return seo.siteUrl
  if (typeof window !== 'undefined') return window.location.origin
  return ''
}

export function absoluteUrl(path: string): string {
  const base = resolveSiteUrl()
  const normalized = path.startsWith('/') ? path : `/${path}`
  return base ? `${base}${normalized}` : normalized
}
