import {
  ref,
  computed,
  inject,
  type App,
  type ComputedRef,
  type InjectionKey,
  type Ref,
} from 'vue'
import type { Locale, Messages } from './types'
import esMessages from './messages/es'
import enMessages from './messages/en'

export const LOCALE_KEY: InjectionKey<LocaleContext> = Symbol('icva-locale')

const STORAGE_KEY = 'icva-locale'

const messagesByLocale: Record<Locale, Messages> = {
  es: esMessages,
  en: enMessages,
}

export interface LocaleContext {
  locale: Ref<Locale>
  messages: ComputedRef<Messages>
  setLocale: (next: Locale) => void
  toggleLocale: () => void
}

/** Español del navegador/sistema → es; inglés u otro idioma → en. */
function detectBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') return 'en'

  const candidates = [
    ...(navigator.languages ?? []),
    navigator.language,
  ].filter(Boolean)

  for (const tag of candidates) {
    const primary = tag.toLowerCase().split('-')[0]
    if (primary === 'es') return 'es'
    if (primary === 'en') return 'en'
  }

  return 'en'
}

/** Preferencia guardada del usuario; si no hay, idioma del navegador/sistema. */
export function resolveInitialLocale(): Locale {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'es') return stored
  }
  return detectBrowserLocale()
}

export function getMessages(locale: Locale): Messages {
  return messagesByLocale[locale]
}

function applyDocumentLang(locale: Locale) {
  document.documentElement.lang = locale === 'es' ? 'es-MX' : 'en'
}

function createLocaleContext(): LocaleContext {
  const locale = ref<Locale>(resolveInitialLocale())

  const messages = computed(() => messagesByLocale[locale.value])

  function setLocale(next: Locale) {
    locale.value = next
    localStorage.setItem(STORAGE_KEY, next)
    applyDocumentLang(next)
  }

  function toggleLocale() {
    setLocale(locale.value === 'es' ? 'en' : 'es')
  }

  applyDocumentLang(locale.value)

  return { locale, messages, setLocale, toggleLocale }
}

export function useLocale(): LocaleContext {
  const ctx = inject(LOCALE_KEY)
  if (!ctx) {
    throw new Error('useLocale() called without i18n plugin installed')
  }
  return ctx
}

export function createI18n() {
  const context = createLocaleContext()

  return {
    install(app: App) {
      app.provide(LOCALE_KEY, context)
    },
  }
}

export type { Locale, Messages } from './types'
