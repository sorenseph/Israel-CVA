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

function readStoredLocale(): Locale {
  if (typeof localStorage === 'undefined') return 'es'
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'en' ? 'en' : 'es'
}

function applyDocumentLang(locale: Locale) {
  document.documentElement.lang = locale === 'es' ? 'es-MX' : 'en'
}

function createLocaleContext(): LocaleContext {
  const locale = ref<Locale>(readStoredLocale())

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
