import type { ContactValidationMessages } from '../i18n/types'
import esMessages from '../i18n/messages/es'

export const CONTACT_LIMITS = {
  nameMax: 50,
  emailMax: 50,
  phoneDigits: 10,
  messageMax: 2000,
} as const

const EMAIL_CHARS = /^[a-zA-Z0-9@._+\-]+$/
const NAME_CHARS = /^[\p{L}\p{N}\s'.-]+$/u
const MESSAGE_CHARS = /^[\p{L}\p{N}\s.,;:!?¿¡()\-"'\n\r]+$/u

export type ContactFormFields = {
  name: string
  email: string
  phone: string
  message: string
}

export function sanitizeName(value: string): string {
  return value
    .replace(/[^\p{L}\p{N}\s'.-]/gu, '')
    .slice(0, CONTACT_LIMITS.nameMax)
}

export function sanitizeEmail(value: string): string {
  return value
    .replace(/[^a-zA-Z0-9@._+\-]/g, '')
    .slice(0, CONTACT_LIMITS.emailMax)
}

export function sanitizePhone(value: string): string {
  return value.replace(/\D/g, '').slice(0, CONTACT_LIMITS.phoneDigits)
}

export function sanitizeMessage(value: string): string {
  return value
    .replace(/[^\p{L}\p{N}\s.,;:!?¿¡()\-"'\n\r]/gu, '')
    .slice(0, CONTACT_LIMITS.messageMax)
}

export function isAllowedNameKey(key: string): boolean {
  if (key.length !== 1) return true
  return /^[\p{L}\p{N}\s'.-]$/u.test(key)
}

export function isAllowedPhoneKey(key: string): boolean {
  return /^\d$/.test(key)
}

export function validateContactForm(
  fields: ContactFormFields,
  messages: ContactValidationMessages = esMessages.contact.validation,
): string | null {
  const name = fields.name.trim()
  const email = fields.email.trim()
  const phone = fields.phone.trim()
  const message = fields.message.trim()

  if (!name) return messages.nameRequired
  if (name.length > CONTACT_LIMITS.nameMax) return messages.nameMaxLength
  if (!NAME_CHARS.test(name)) return messages.nameInvalidChars

  if (!email) return messages.emailRequired
  if (email.length > CONTACT_LIMITS.emailMax) return messages.emailMaxLength
  if (!EMAIL_CHARS.test(email)) return messages.emailInvalidChars
  if (!email.includes('@') || email.indexOf('@') === 0) return messages.emailInvalid

  if (!phone) return messages.phoneRequired
  if (!/^\d{10}$/.test(phone)) return messages.phoneInvalid

  if (!message) return messages.messageRequired
  if (message.length > CONTACT_LIMITS.messageMax) return messages.messageMaxLength
  if (!MESSAGE_CHARS.test(message)) return messages.messageInvalidChars

  return null
}
