import type { Component } from 'vue'
import type { DeliverableSlug } from './cv'
import WebappSimulator from '../components/simulators/WebappSimulator.vue'
import StoreSimulator from '../components/simulators/StoreSimulator.vue'
import OpsSimulator from '../components/simulators/OpsSimulator.vue'
import MobileSimulator from '../components/simulators/MobileSimulator.vue'
import PaymentsSimulator from '../components/simulators/PaymentsSimulator.vue'
import CrmSimulator from '../components/simulators/CrmSimulator.vue'

export interface SimulatorConfig {
  slug: DeliverableSlug
  component: Component
}

export const simulators: SimulatorConfig[] = [
  { slug: 'webapp', component: WebappSimulator },
  { slug: 'tienda', component: StoreSimulator },
  { slug: 'operaciones', component: OpsSimulator },
  { slug: 'movil', component: MobileSimulator },
  { slug: 'pagos', component: PaymentsSimulator },
  { slug: 'crm', component: CrmSimulator },
]

export const simulatorBySlug = Object.fromEntries(
  simulators.map((s) => [s.slug, s]),
) as Record<DeliverableSlug, SimulatorConfig>

export function isValidSimulatorSlug(slug: string): slug is DeliverableSlug {
  return slug in simulatorBySlug
}
