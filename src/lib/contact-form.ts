import { supabase, isSupabaseConfigured } from './supabase'
import { validateContactForm, type ContactFormFields } from './contact-validation'

export type ContactPayload = ContactFormFields

export type ContactSubmitResult = {
  savedToDb: boolean
  emailSent: boolean
}

async function saveLead(payload: ContactPayload): Promise<void> {
  if (!supabase) return
  const { error } = await supabase.from('contact_leads').insert({
    name: payload.name,
    email: payload.email,
    message: `[Tel: ${payload.phone}] ${payload.message}`,
  })
  if (error) throw new Error(error.message)
}

async function sendViaApiRoute(payload: ContactPayload): Promise<boolean> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = (await res.json()) as { ok?: boolean; error?: string }
  if (!res.ok) throw new Error(data.error ?? 'No se pudo enviar el correo')
  return Boolean(data.ok)
}

async function sendViaSupabaseFunction(payload: ContactPayload): Promise<boolean> {
  if (!supabase) return false
  const { data, error } = await supabase.functions.invoke('send-contact', {
    body: payload,
  })
  if (error) throw new Error(error.message)
  if (data && typeof data === 'object' && 'error' in data && data.error) {
    throw new Error(String(data.error))
  }
  return true
}

export async function submitContactForm(payload: ContactPayload): Promise<ContactSubmitResult> {
  const trimmed: ContactPayload = {
    name: payload.name.trim(),
    email: payload.email.trim(),
    phone: payload.phone.trim(),
    message: payload.message.trim(),
  }

  const validationError = validateContactForm(trimmed)
  if (validationError) throw new Error(validationError)

  let emailSent = false
  let apiError: Error | null = null

  try {
    emailSent = await sendViaApiRoute(trimmed)
  } catch (err) {
    apiError = err instanceof Error ? err : new Error('Error al enviar')
  }

  if (!emailSent && isSupabaseConfigured) {
    try {
      emailSent = await sendViaSupabaseFunction(trimmed)
    } catch (err) {
      throw apiError ?? (err instanceof Error ? err : new Error('No se pudo enviar el mensaje'))
    }
  }

  if (!emailSent) {
    throw (
      apiError ??
      new Error(
        'No se pudo enviar el mensaje. Añade RESEND_API_KEY en .env.local (desarrollo) o en Vercel.',
      )
    )
  }

  if (!emailSent) throw new Error('No se pudo enviar el correo.')

  let savedToDb = false
  if (isSupabaseConfigured) {
    try {
      await saveLead(trimmed)
      savedToDb = true
    } catch {
      /* correo ya enviado */
    }
  }

  return { savedToDb, emailSent }
}
