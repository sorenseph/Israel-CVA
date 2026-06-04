<script setup lang="ts">
import { ref } from 'vue'
import { submitContactForm } from '../lib/contact-form'
import {
  CONTACT_LIMITS,
  isAllowedNameKey,
  isAllowedPhoneKey,
  sanitizeEmail,
  sanitizeMessage,
  sanitizeName,
  sanitizePhone,
  validateContactForm,
} from '../lib/contact-validation'
import SectionTitle from './ui/SectionTitle.vue'
import GradientButton from './ui/GradientButton.vue'
import FormNotice from './ui/FormNotice.vue'
import AnimateIn from './ui/AnimateIn.vue'

const NAV_KEYS = new Set([
  'Backspace',
  'Delete',
  'Tab',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Home',
  'End',
])

const form = ref({ name: '', email: '', phone: '', message: '' })
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMsg = ref('')

function onNameInput(e: Event) {
  form.value.name = sanitizeName((e.target as HTMLInputElement).value)
}

function onNameKeydown(e: KeyboardEvent) {
  if (NAV_KEYS.has(e.key) || e.ctrlKey || e.metaKey) return
  if (!isAllowedNameKey(e.key)) e.preventDefault()
}

function onEmailInput(e: Event) {
  form.value.email = sanitizeEmail((e.target as HTMLInputElement).value)
}

function onEmailKeydown(e: KeyboardEvent) {
  if (NAV_KEYS.has(e.key) || e.ctrlKey || e.metaKey) return
  if (e.key.length === 1 && !/^[a-zA-Z0-9@._+\-]$/.test(e.key)) e.preventDefault()
}

function onPhoneInput(e: Event) {
  form.value.phone = sanitizePhone((e.target as HTMLInputElement).value)
}

function onPhoneKeydown(e: KeyboardEvent) {
  if (NAV_KEYS.has(e.key) || e.ctrlKey || e.metaKey) return
  if (e.key.length === 1 && !isAllowedPhoneKey(e.key)) e.preventDefault()
}

function onPhonePaste(e: ClipboardEvent) {
  e.preventDefault()
  const pasted = e.clipboardData?.getData('text') ?? ''
  form.value.phone = sanitizePhone(form.value.phone + pasted)
}

function onMessageInput(e: Event) {
  form.value.message = sanitizeMessage((e.target as HTMLTextAreaElement).value)
}

async function onSubmit() {
  status.value = 'loading'
  errorMsg.value = ''

  form.value.name = sanitizeName(form.value.name)
  form.value.email = sanitizeEmail(form.value.email)
  form.value.phone = sanitizePhone(form.value.phone)
  form.value.message = sanitizeMessage(form.value.message)

  const clientError = validateContactForm(form.value)
  if (clientError) {
    status.value = 'error'
    errorMsg.value = clientError
    return
  }

  try {
    await submitContactForm(form.value)
    status.value = 'success'
    form.value = { name: '', email: '', phone: '', message: '' }
  } catch (err) {
    status.value = 'error'
    errorMsg.value = err instanceof Error ? err.message : 'Error al enviar el mensaje'
  }
}
</script>

<template>
  <section id="contacto" class="contact section-block">
    <div class="container contact__inner">
      <AnimateIn>
        <SectionTitle
          label="Contacto"
          title="Cuéntanos tu proyecto"
          subtitle="Completa el formulario y te respondemos en menos de 24 horas con los siguientes pasos."
        />

        <form class="contact__form" @submit.prevent="onSubmit">
          <div class="contact__row">
            <div class="contact__field">
              <label for="name">Nombre</label>
              <input
                id="name"
                :value="form.name"
                type="text"
                required
                :maxlength="CONTACT_LIMITS.nameMax"
                placeholder="Tu nombre o empresa"
                autocomplete="name"
                @input="onNameInput"
                @keydown="onNameKeydown"
              />
              <span class="contact__hint">{{ form.name.length }}/{{ CONTACT_LIMITS.nameMax }}</span>
            </div>
            <div class="contact__field">
              <label for="phone">Teléfono</label>
              <input
                id="phone"
                :value="form.phone"
                type="text"
                inputmode="numeric"
                pattern="[0-9]{10}"
                required
                :maxlength="CONTACT_LIMITS.phoneDigits"
                placeholder="10 dígitos"
                autocomplete="tel"
                @input="onPhoneInput"
                @keydown="onPhoneKeydown"
                @paste="onPhonePaste"
              />
              <span class="contact__hint">{{ form.phone.length }}/{{ CONTACT_LIMITS.phoneDigits }}</span>
            </div>
          </div>

          <div class="contact__field">
            <label for="email">Correo</label>
            <input
              id="email"
              :value="form.email"
              type="text"
              required
              :maxlength="CONTACT_LIMITS.emailMax"
              placeholder="tu@email.com"
              autocomplete="email"
              @input="onEmailInput"
              @keydown="onEmailKeydown"
            />
            <span class="contact__hint">{{ form.email.length }}/{{ CONTACT_LIMITS.emailMax }}</span>
          </div>

          <div class="contact__field">
            <label for="message">Mensaje</label>
            <textarea
              id="message"
              :value="form.message"
              required
              rows="5"
              :maxlength="CONTACT_LIMITS.messageMax"
              placeholder="¿Qué producto necesitas? (webapp, tienda, CRM, app móvil…) Plazos y objetivos."
              @input="onMessageInput"
            />
          </div>

          <GradientButton tag="button" variant="primary" :disabled="status === 'loading'">
            {{ status === 'loading' ? 'Enviando…' : 'Enviar mensaje' }}
          </GradientButton>

          <FormNotice
            :show="status === 'success'"
            variant="success"
            title="Mensaje enviado"
            message="Recibimos tu solicitud. Te contactaremos en menos de 24 horas."
          />
          <FormNotice
            :show="status === 'error'"
            variant="error"
            title="No se pudo enviar"
            :message="errorMsg"
          />
        </form>
      </AnimateIn>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.contact {
  background: $bg-deep;
}

.contact__inner {
  max-width: 640px;
  margin: 0 auto;
  padding-bottom: 2rem;
}

.contact__form {
  background: $bg-card;
  border: 1px solid $border-subtle;
  border-radius: $radius-lg;
  padding: 2rem;
  backdrop-filter: blur(12px);
  box-shadow: $shadow-card;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.contact__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
}

.contact__field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  label {
    font-size: 0.85rem;
    color: $text-muted;
  }

  input,
  textarea {
    background: $bg-surface;
    border: 1px solid $border-subtle;
    border-radius: $radius-sm;
    padding: 0.75rem 1rem;
    color: $text-primary;
    font-family: inherit;
    font-size: 0.95rem;
    transition: border-color $transition;

    &::placeholder {
      color: $text-dim;
    }

    &:focus {
      outline: none;
      border-color: $accent-primary;
    }
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }
}

.contact__hint {
  font-size: 0.72rem;
  color: $text-dim;
  text-align: right;
}

</style>
