<script setup lang="ts">
import { ref } from 'vue'
import { useLocale } from '../i18n'
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

const { messages } = useLocale()

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

  const clientError = validateContactForm(form.value, messages.value.contact.validation)
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
    errorMsg.value = err instanceof Error ? err.message : messages.value.contact.form.submitError
  }
}
</script>

<template>
  <section id="contacto" class="contact section-block">
    <div class="container contact__inner">
      <AnimateIn>
        <SectionTitle
          :label="messages.sections.contact.label"
          :title="messages.sections.contact.title"
          :subtitle="messages.sections.contact.subtitle"
        />

        <form class="contact__form" @submit.prevent="onSubmit">
          <div class="contact__row">
            <div class="contact__field">
              <label for="name">{{ messages.contact.form.nameLabel }}</label>
              <input
                id="name"
                :value="form.name"
                type="text"
                required
                :maxlength="CONTACT_LIMITS.nameMax"
                :placeholder="messages.contact.form.namePlaceholder"
                autocomplete="name"
                @input="onNameInput"
                @keydown="onNameKeydown"
              />
              <span class="contact__hint">{{ form.name.length }}/{{ CONTACT_LIMITS.nameMax }}</span>
            </div>
            <div class="contact__field">
              <label for="phone">{{ messages.contact.form.phoneLabel }}</label>
              <input
                id="phone"
                :value="form.phone"
                type="text"
                inputmode="numeric"
                pattern="[0-9]{10}"
                required
                :maxlength="CONTACT_LIMITS.phoneDigits"
                :placeholder="messages.contact.form.phonePlaceholder"
                autocomplete="tel"
                @input="onPhoneInput"
                @keydown="onPhoneKeydown"
                @paste="onPhonePaste"
              />
              <span class="contact__hint">{{ form.phone.length }}/{{ CONTACT_LIMITS.phoneDigits }}</span>
            </div>
          </div>

          <div class="contact__field">
            <label for="email">{{ messages.contact.form.emailLabel }}</label>
            <input
              id="email"
              :value="form.email"
              type="text"
              required
              :maxlength="CONTACT_LIMITS.emailMax"
              :placeholder="messages.contact.form.emailPlaceholder"
              autocomplete="email"
              @input="onEmailInput"
              @keydown="onEmailKeydown"
            />
            <span class="contact__hint">{{ form.email.length }}/{{ CONTACT_LIMITS.emailMax }}</span>
          </div>

          <div class="contact__field">
            <label for="message">{{ messages.contact.form.messageLabel }}</label>
            <textarea
              id="message"
              :value="form.message"
              required
              rows="5"
              :maxlength="CONTACT_LIMITS.messageMax"
              :placeholder="messages.contact.form.messagePlaceholder"
              @input="onMessageInput"
            />
          </div>

          <GradientButton tag="button" variant="primary" :disabled="status === 'loading'">
            {{ status === 'loading' ? messages.contact.form.submitting : messages.contact.form.submit }}
          </GradientButton>

          <FormNotice
            :show="status === 'success'"
            variant="success"
            :title="messages.contact.form.successTitle"
            :message="messages.contact.form.successMessage"
          />
          <FormNotice
            :show="status === 'error'"
            variant="error"
            :title="messages.contact.form.errorTitle"
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
