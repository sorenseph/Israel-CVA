import { computed } from 'vue'
import { useLocale } from '../i18n'
import { crmLeadAvatars, personaImages, storeProductMeta, teamAvatars } from '../data/simulator-assets'

export function useDemoData() {
  const { messages } = useLocale()

  const storeProducts = computed(() =>
    storeProductMeta.map((item, i) => ({
      ...item,
      name: messages.value.demos.store.products[i]?.name ?? '',
      tag: messages.value.demos.store.products[i]?.tag ?? '',
    })),
  )

  const teamMembers = computed(() =>
    messages.value.demos.team.map((member, i) => ({
      ...member,
      avatar: teamAvatars[i],
    })),
  )

  const crmLeads = computed(() =>
    messages.value.demos.crm.leads.map((lead, i) => ({
      ...lead,
      avatar: crmLeadAvatars[i],
    })),
  )

  return {
    storeProducts,
    teamMembers,
    crmLeads,
  }
}

export function useDemoPersonas() {
  return { personaImages }
}
