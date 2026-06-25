import type { DeliverableSlug } from './cv'
import { deliverableMeta } from './cv'

export const simulatorSlugs = deliverableMeta.map((item) => item.slug)

export function isValidSimulatorSlug(slug: string): slug is DeliverableSlug {
  return simulatorSlugs.includes(slug as DeliverableSlug)
}
