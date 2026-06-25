import type { Component } from 'vue'
import type { DeliverableSlug } from './cv'

export { isValidSimulatorSlug } from './simulator-slugs'

type SimulatorLoader = () => Promise<{ default: Component }>

export const simulatorBySlug: Record<DeliverableSlug, SimulatorLoader> = {
  webapp: () => import('../components/simulators/WebappSimulator.vue'),
  tienda: () => import('../components/simulators/StoreSimulator.vue'),
  operaciones: () => import('../components/simulators/OpsSimulator.vue'),
  movil: () => import('../components/simulators/MobileSimulator.vue'),
  pagos: () => import('../components/simulators/PaymentsSimulator.vue'),
  crm: () => import('../components/simulators/CrmSimulator.vue'),
}
