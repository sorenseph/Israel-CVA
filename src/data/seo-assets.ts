import type { DeliverableSlug } from './cv'

const p = (path: string) => encodeURI(path)

/** Imagen por defecto para compartir (JPG — compatible con Facebook, Instagram y Google) */
export const defaultOgImage = p('/products/product-branding-packaging.jpg')

export const simulatorOgImages: Record<DeliverableSlug, string> = {
  webapp: p('/products/product-branding-packaging.jpg'),
  tienda: p('/products/natural-self-care-composition.jpg'),
  operaciones: p('/products/front-view-natural-self-care-products-composition.jpg'),
  movil: p('/hand-movil/hand-holding-smartphone.jpg'),
  pagos: p('/products/cosmetic-male-beauty-products-with-display.jpg'),
  crm: p('/personas/images (2).jpg'),
}
