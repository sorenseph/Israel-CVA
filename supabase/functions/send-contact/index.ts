import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const TO_EMAIL = Deno.env.get('CONTACT_TO_EMAIL') ?? 'israelcardenas6@gmail.com'
const FROM_EMAIL =
  Deno.env.get('CONTACT_FROM_EMAIL') ?? 'Portfolio IC <onboarding@resend.dev>'

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
    const { name, email, message } = await req.json()

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return json({ error: 'Faltan campos obligatorios' }, 400)
    }

    const safeName = escapeHtml(String(name).trim())
    const safeEmail = escapeHtml(String(email).trim())
    const safeMessage = escapeHtml(String(message).trim()).replaceAll('\n', '<br />')

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: String(email).trim(),
        subject: `Portfolio — mensaje de ${String(name).trim()}`,
        html: `
          <h2>Nuevo mensaje del portfolio</h2>
          <p><strong>Nombre:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${safeMessage}</p>
        `,
      }),
    })

    if (!res.ok) {
      const detail = await res.text()
      console.error('Resend error:', detail)
      return json({ error: 'No se pudo enviar el correo' }, 502)
    }

    return json({ ok: true })
  } catch (err) {
    console.error(err)
    return json({ error: 'Error interno al enviar' }, 500)
  }
})
