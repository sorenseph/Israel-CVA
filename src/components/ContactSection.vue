<script setup lang="ts">
import { ref } from 'vue'
import { motion } from 'motion-v'
import { profile } from '../data/cv'
import { isSupabaseConfigured } from '../lib/supabase'
import { submitContactForm } from '../lib/contact-form'
import SectionTitle from './ui/SectionTitle.vue'
import GradientButton from './ui/GradientButton.vue'
import HumanFigure from './ui/HumanFigure.vue'

const form = ref({ name: '', email: '', message: '' })
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMsg = ref('')

const successDetail = ref('')

async function onSubmit() {
  status.value = 'loading'
  errorMsg.value = ''
  successDetail.value = ''

  try {
    const result = await submitContactForm({
      name: form.value.name,
      email: form.value.email,
      message: form.value.message,
    })

    status.value = 'success'
    form.value = { name: '', email: '', message: '' }

    if (result.emailSent && result.savedToDb) {
      successDetail.value = `Correo enviado a ${profile.email} y guardado en el feed de demos.`
    } else if (result.emailSent) {
      successDetail.value = `Correo enviado a ${profile.email}. Te responderé pronto.`
    } else {
      successDetail.value = 'Mensaje guardado. Revisa el feed en la sección Demos.'
    }
  } catch (err) {
    status.value = 'error'
    errorMsg.value = err instanceof Error ? err.message : 'Error al enviar el mensaje'
  }
}
</script>

<template>
  <section id="contacto" class="contact">
    <HumanFigure name="partner" size="lg" class="contact__figure" :delay="0.1" />
    <motion.div
      class="container contact__inner"
      :initial="{ opacity: 0, y: 30 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :viewport="{ once: true }"
    >
      <SectionTitle
        label="Contacto"
        title="Hablemos de tu proyecto"
        subtitle="Envía un mensaje y recibiré un correo en mi bandeja. También aparece en el feed de demos si Supabase está activo."
      />

      <div class="contact__grid">
        <div class="contact__info">
          <motion.a
            class="contact__card"
            :href="`mailto:${profile.email}`"
            :while-hover="{ scale: 1.02 }"
          >
            <span class="contact__label">Email</span>
            <span>{{ profile.email }}</span>
          </motion.a>
          <motion.a
            class="contact__card"
            :href="`tel:${profile.phone.replace(/\s/g, '')}`"
            :while-hover="{ scale: 1.02 }"
          >
            <span class="contact__label">Teléfono</span>
            <span>{{ profile.phone }}</span>
          </motion.a>
          <div class="contact__card contact__card--static">
            <span class="contact__label">Ubicación</span>
            <span>{{ profile.location }}</span>
          </div>
          <div v-if="isSupabaseConfigured" class="contact__badge">Supabase conectado</div>
        </div>

        <form class="contact__form" @submit.prevent="onSubmit">
          <div class="contact__field">
            <label for="name">Nombre</label>
            <input id="name" v-model="form.name" type="text" required placeholder="Tu nombre" />
          </div>
          <div class="contact__field">
            <label for="email">Email</label>
            <input id="email" v-model="form.email" type="email" required placeholder="tu@email.com" />
          </div>
          <div class="contact__field">
            <label for="message">Mensaje</label>
            <textarea
              id="message"
              v-model="form.message"
              required
              rows="5"
              placeholder="Describe tu proyecto, plazos y presupuesto aproximado..."
            />
          </div>
          <GradientButton tag="button" variant="primary" :disabled="status === 'loading'">
            {{ status === 'loading' ? 'Enviando…' : 'Enviar mensaje' }}
          </GradientButton>
          <p v-if="status === 'success'" class="contact__sent">
            {{ successDetail || 'Mensaje enviado correctamente.' }}
          </p>
          <p v-if="status === 'error'" class="contact__error">{{ errorMsg }}</p>
        </form>
      </div>
    </motion.div>
  </section>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.contact {
  position: relative;
  overflow: hidden;
}

.contact__figure {
  position: absolute;
  left: 0;
  bottom: 0;
  opacity: 0.35;
  pointer-events: none;
  z-index: 0;

  @media (max-width: 900px) {
    display: none;
  }
}

.contact__inner {
  position: relative;
  z-index: 1;
  padding-bottom: 2rem;
}

.contact__grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.contact__info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact__badge {
  font-size: 0.75rem;
  padding: 0.4rem 0.75rem;
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: $radius-full;
  color: #22c55e;
  text-align: center;
}

.contact__card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1.25rem;
  background: $bg-card;
  border: 1px solid $border-subtle;
  border-radius: $radius-md;
  transition: border-color $transition;
  text-decoration: none;
  color: inherit;

  &:hover {
    border-color: rgba(99, 102, 241, 0.4);
  }

  &--static {
    cursor: default;
  }
}

.contact__label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: $text-dim;
}

.contact__form {
  background: $bg-card;
  border: 1px solid $border-subtle;
  border-radius: $radius-lg;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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
    background: rgba(255, 255, 255, 0.04);
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

.contact__sent {
  font-size: 0.85rem;
  color: $accent-secondary;
}

.contact__error {
  font-size: 0.85rem;
  color: #f87171;
}
</style>
