import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const TO_EMAIL = Deno.env.get('CONTACT_TO_EMAIL') ?? 'israelcardenas6@gmail.com'
const FROM_EMAIL =
  Deno.env.get('CONTACT_FROM_EMAIL') ?? 'Studio ICVA <onboarding@resend.dev>'

const LIMITS = { nameMax: 50, emailMax: 50, messageMax: 2000 }
const EMAIL_CHARS = /^[a-zA-Z0-9@._+\-]+$/
const NAME_CHARS = /^[\p{L}\p{N}\s'.-]+$/u

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  })
}

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
}) {
  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const message = String(body.message ?? '').trim()

  if (!name || name.length > LIMITS.nameMax || !NAME_CHARS.test(name)) {
    return { error: 'Nombre inválido (máx. 50 caracteres).' }
  }
  if (!email || email.length > LIMITS.emailMax || !EMAIL_CHARS.test(email) || !email.includes('@')) {
    return { error: 'Correo inválido (máx. 50 caracteres).' }
  }
  if (!/^\d{10}$/.test(phone)) {
    return { error: 'Teléfono inválido (10 dígitos).' }
  }
  if (!message || message.length > LIMITS.messageMax) {
    return { error: 'Mensaje inválido.' }
  }

  return { name, email, phone, message }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: cors })
  }

  if (req.method !== 'POST') {
    return json({ error: 'Método no permitido' }, 405)
  }

  if (!RESEND_API_KEY) {
    return json({ error: 'RESEND_API_KEY no configurada en Supabase' }, 503)
  }

  try {
    const parsed = validate(await req.json())
    if ('error' in parsed && parsed.error) {
      return json({ error: parsed.error }, 400)
    }

    const { name, email, phone, message } = parsed as {
      name: string
      email: string
      phone: string
      message: string
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
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

    if (!res.ok) {
      console.error('Resend error:', await res.text())
      return json({ error: 'No se pudo enviar el correo' }, 502)
    }

    return json({ ok: true })
  } catch (err) {
    console.error(err)
    return json({ error: 'Error interno al enviar' }, 500)
  }
})
