import { supabase, isSupabaseConfigured } from './supabase'
import { validateContactForm, type ContactFormFields } from './contact-validation'

export type ContactPayload = ContactFormFields

export type ContactSubmitResult = {
  savedToDb: boolean
  emailSent: boolean
}

const useSupabaseEmail =
  import.meta.env.VITE_CONTACT_USE_SUPABASE_FUNCTION === 'true'

const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

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

async function sendViaWeb3Forms(payload: ContactPayload): Promise<boolean> {
  if (!web3formsKey?.trim()) return false

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: web3formsKey.trim(),
      subject: `Studio ICVA — mensaje de ${payload.name}`,
      from_name: payload.name,
      email: payload.email,
      phone: payload.phone,
      message: payload.message,
    }),
  })

  const data = (await res.json()) as { success?: boolean; message?: string }
  if (!res.ok || !data.success) {
    throw new Error(data.message ?? 'No se pudo enviar el mensaje')
  }
  return true
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

  const errors: string[] = []
  let emailSent = false

  try {
    emailSent = await sendViaApiRoute(trimmed)
  } catch (err) {
    errors.push(err instanceof Error ? err.message : 'API de contacto no disponible')
  }

  if (!emailSent && web3formsKey?.trim()) {
    try {
      emailSent = await sendViaWeb3Forms(trimmed)
    } catch (err) {
      errors.push(err instanceof Error ? err.message : 'Web3Forms falló')
    }
  }

  if (!emailSent && useSupabaseEmail && isSupabaseConfigured) {
    try {
      emailSent = await sendViaSupabaseFunction(trimmed)
    } catch (err) {
      errors.push(err instanceof Error ? err.message : 'Función send-contact no disponible')
    }
  }

  if (!emailSent) {
    const hint =
      errors[0] ??
      'Configura RESEND_API_KEY en Vercel (/api/contact) o VITE_WEB3FORMS_ACCESS_KEY en el deploy.'
    throw new Error(hint)
  }

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
