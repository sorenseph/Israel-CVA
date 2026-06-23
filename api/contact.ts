import type { VercelRequest, VercelResponse } from '@vercel/node'

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'info@studioicva.com'
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? 'Studio ICVA <onboarding@resend.dev>'

const LIMITS = { nameMax: 50, emailMax: 50, phoneDigits: 10, messageMax: 2000 }
const EMAIL_CHARS = /^[a-zA-Z0-9@._+\-]+$/
const NAME_CHARS = /^[\p{L}\p{N}\s'.-]+$/u

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function validate(body: {
  name?: string
  email?: string
  phone?: string
  message?: string
}): { ok: true; data: { name: string; email: string; phone: string; message: string } } | { ok: false; error: string } {
  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const message = String(body.message ?? '').trim()

  if (!name || name.length > LIMITS.nameMax || !NAME_CHARS.test(name)) {
    return { ok: false, error: 'Nombre inválido (máx. 50 caracteres).' }
  }
  if (!email || email.length > LIMITS.emailMax || !EMAIL_CHARS.test(email) || !email.includes('@')) {
    return { ok: false, error: 'Correo inválido (máx. 50 caracteres).' }
  }
  if (!/^\d{10}$/.test(phone)) {
    return { ok: false, error: 'Teléfono inválido (10 dígitos).' }
  }
  if (!message || message.length > LIMITS.messageMax) {
    return { ok: false, error: 'Mensaje inválido.' }
  }

  return { ok: true, data: { name, email, phone, message } }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return res.status(503).json({ error: 'Servicio de correo no configurado.' })
  }

  const checked = validate(req.body ?? {})
  if (checked.ok === false) {
    return res.status(400).json({ error: checked.error })
  }

  const { name, email, phone, message } = checked.data

  try {
    const sendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `Studio ICVA — mensaje de ${name}`,
        html: `
          <h2>Nuevo contacto desde el sitio</h2>
          <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
          <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
          <p><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${escapeHtml(message).replaceAll('\n', '<br />')}</p>
        `,
      }),
    })

    if (!sendRes.ok) {
      console.error('Resend:', await sendRes.text())
      return res.status(502).json({ error: 'No se pudo enviar el correo.' })
    }

    return res.status(200).json({ ok: true, emailSent: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Error interno al enviar.' })
  }
}
