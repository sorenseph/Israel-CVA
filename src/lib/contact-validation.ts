export const CONTACT_LIMITS = {
  nameMax: 50,
  emailMax: 50,
  phoneDigits: 10,
  messageMax: 2000,
} as const

/** Letras, números y caracteres habituales en correos (@ . _ - +) */
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

export function validateContactForm(fields: ContactFormFields): string | null {
  const name = fields.name.trim()
  const email = fields.email.trim()
  const phone = fields.phone.trim()
  const message = fields.message.trim()

  if (!name) return 'Escribe tu nombre.'
  if (name.length > CONTACT_LIMITS.nameMax) {
    return `El nombre no puede superar ${CONTACT_LIMITS.nameMax} caracteres.`
  }
  if (!NAME_CHARS.test(name)) {
    return 'El nombre solo puede incluir letras, números, espacios, punto, guion y apóstrofo.'
  }

  if (!email) return 'Escribe tu correo.'
  if (email.length > CONTACT_LIMITS.emailMax) {
    return `El correo no puede superar ${CONTACT_LIMITS.emailMax} caracteres.`
  }
  if (!EMAIL_CHARS.test(email)) {
    return 'El correo solo puede incluir letras, números y @ . _ - +'
  }
  if (!email.includes('@') || email.indexOf('@') === 0) {
    return 'Ingresa un correo válido.'
  }

  if (!phone) return 'Escribe tu teléfono.'
  if (!/^\d{10}$/.test(phone)) {
    return 'El teléfono debe tener exactamente 10 dígitos numéricos.'
  }

  if (!message) return 'Escribe tu mensaje.'
  if (message.length > CONTACT_LIMITS.messageMax) {
    return `El mensaje no puede superar ${CONTACT_LIMITS.messageMax} caracteres.`
  }
  if (!MESSAGE_CHARS.test(message)) {
    return 'El mensaje contiene caracteres no permitidos.'
  }

  return null
}
