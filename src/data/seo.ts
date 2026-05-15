import { profile } from './cv'
import { brand } from './brand'

const siteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ?? ''

export const seo = {
  siteName: profile.name,
  title: `${profile.name} | Desarrollador Frontend`,
  titleTemplate: '%s | Desarrollador Frontend',
  description:
    'Portfolio de Israel Cárdenas Valderas, desarrollador Frontend en CDMX. Vue 3, Angular, TypeScript, microfrontends, Supabase, CI/CD y productos web a medida.',
  keywords: [
    'desarrollador frontend',
    'desarrollador web CDMX',
    'Vue.js',
    'Angular',
    'TypeScript',
    'microfrontends',
    'Supabase',
    'portfolio desarrollador',
    'Israel Cárdenas Valderas',
    'aplicaciones web',
    'CI/CD',
  ].join(', '),
  author: profile.name,
  locale: 'es_MX',
  themeColor: '#0a0b10',
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
