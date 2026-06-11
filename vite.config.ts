import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  buildRobotsTxt,
  buildSitemapXml,
  buildStructuredData,
  normalizeSiteUrl,
} from './src/lib/seo-build'
import { defaultOgImage } from './src/data/seo-assets'
const LIMITS = { nameMax: 50, emailMax: 50, messageMax: 2000 }
const EMAIL_CHARS = /^[a-zA-Z0-9@._+\-]+$/
const NAME_CHARS = /^[\p{L}\p{N}\s'.-]+$/u

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function contactApiDevPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'contact-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res, next) => {
        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
          res.end()
          return
        }

        if (req.method !== 'POST') {
          next()
          return
        }

        const apiKey = env.RESEND_API_KEY
        const to = env.CONTACT_TO_EMAIL ?? 'israelcardenas6@gmail.com'
        const from = env.CONTACT_FROM_EMAIL ?? 'Studio ICVA <onboarding@resend.dev>'

        if (!apiKey) {
          res.statusCode = 503
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'RESEND_API_KEY no definida en .env.local' }))
          return
        }

        const chunks: Buffer[] = []
        req.on('data', (c) => chunks.push(c))
        req.on('end', async () => {
          try {
            const body = JSON.parse(Buffer.concat(chunks).toString()) as {
              name?: string
              email?: string
              phone?: string
              message?: string
            }
            const name = String(body.name ?? '').trim()
            const email = String(body.email ?? '').trim()
            const phone = String(body.phone ?? '').trim()
            const message = String(body.message ?? '').trim()

            if (!name || name.length > LIMITS.nameMax || !NAME_CHARS.test(name)) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'Nombre inválido.' }))
              return
            }
            if (!email || email.length > LIMITS.emailMax || !EMAIL_CHARS.test(email) || !email.includes('@')) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'Correo inválido.' }))
              return
            }
            if (!/^\d{10}$/.test(phone)) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'Teléfono inválido.' }))
              return
            }
            if (!message || message.length > LIMITS.messageMax) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'Mensaje inválido.' }))
              return
            }

            const sendRes = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                from,
                to: [to],
                reply_to: email,
                subject: `Studio ICVA — mensaje de ${name}`,
                html: `
                  <h2>Nuevo contacto</h2>
                  <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
                  <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
                  <p><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>
                  <p>${escapeHtml(message).replaceAll('\n', '<br />')}</p>
                `,
              }),
            })

            res.setHeader('Content-Type', 'application/json')
            if (!sendRes.ok) {
              res.statusCode = 502
              res.end(JSON.stringify({ error: 'Resend rechazó el envío.' }))
              return
            }
            res.statusCode = 200
            res.end(JSON.stringify({ ok: true, emailSent: true }))
          } catch {
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'Error interno.' }))
          }
        })
      })
    },
  }
}

function seoBuildPlugin(siteUrl: string): Plugin {
  const canonical = `${siteUrl}/`
  const ogImage = `${siteUrl}${defaultOgImage}`
  const jsonLd = JSON.stringify(buildStructuredData(siteUrl))

  return {
    name: 'seo-build',
    transformIndexHtml(html) {
      return html
        .replaceAll('__SITE_URL__', siteUrl)
        .replaceAll('__CANONICAL__', canonical)
        .replaceAll('__OG_IMAGE__', ogImage)
        .replace('<!--SEO_JSON_LD-->', jsonLd)
    },
    closeBundle() {
      const dist = join(process.cwd(), 'dist')
      writeFileSync(join(dist, 'sitemap.xml'), buildSitemapXml(siteUrl), 'utf8')
      writeFileSync(join(dist, 'robots.txt'), buildRobotsTxt(siteUrl), 'utf8')
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = normalizeSiteUrl(env.VITE_SITE_URL)
  return {
    plugins: [vue(), contactApiDevPlugin(env), seoBuildPlugin(siteUrl)],
  }
})
