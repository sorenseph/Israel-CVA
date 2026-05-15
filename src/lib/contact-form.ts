import { supabase, isSupabaseConfigured } from './supabase'

export type ContactPayload = {
  name: string
  email: string
  message: string
}

export type ContactSubmitResult = {
  savedToDb: boolean
  emailSent: boolean
}

const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

async function saveLead(payload: ContactPayload): Promise<void> {
  if (!supabase) return
  const { error } = await supabase.from('contact_leads').insert(payload)
  if (error) throw new Error(error.message)
}

async function sendViaWeb3Forms(payload: ContactPayload): Promise<boolean> {
  if (!web3formsKey?.trim()) return false
  const formData = new FormData()
  formData.append('access_key', web3formsKey.trim())
  formData.append('name', payload.name)
  formData.append('email', payload.email)
  formData.append('message', payload.message)
  formData.append('subject', `Portfolio - mensaje de ${payload.name}`)
  const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
  const data = (await res.json()) as { success?: boolean; message?: string }
  if (!res.ok || !data.success) throw new Error(data.message ?? 'No se pudo enviar el correo')
  return true
}

export async function submitContactForm(payload: ContactPayload): Promise<ContactSubmitResult> {
  const trimmed = {
    name: payload.name.trim(),
    email: payload.email.trim(),
    message: payload.message.trim(),
  }
  let savedToDb = false
  const emailSent = web3formsKey?.trim() ? await sendViaWeb3Forms(trimmed) : false
  if (!emailSent) throw new Error('No se pudo enviar el correo.')
  if (isSupabaseConfigured) {
    try {
      await saveLead(trimmed)
      savedToDb = true
    } catch {
      /* email already sent */
    }
  }
  return { savedToDb, emailSent }
}
