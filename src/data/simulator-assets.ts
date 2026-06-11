/** Rutas públicas e IDs no traducibles para demos y simuladores */
const p = (path: string) => encodeURI(path)

export const personaImages = {
  woman1: p('/personas/images (1).jpg'),
  woman2: p('/personas/images (2).jpg'),
  woman3: p('/personas/images (3).jpg'),
  woman4: p('/personas/images (4).jpg'),
  portrait: p('/personas/images.jpg'),
  manBeard: p('/personas/joven-hombre-barbudo-camisa-rayas_273609-5677.avif'),
  student: p(
    '/personas/retrato-muchacha-atractiva-joven-estudiante-caucasico-cabello-oscuro-ropa-casual-mirando-lado-sonriendo-boca-abierta-apuntando-pared-blanca-dedo-copia-espacio_176420-10665.avif',
  ),
  youngMan: p('/personas/148912705-serio-joven-sonriente-posición-contra-fondo-blanco.jpg'),
  girl: p('/personas/retrato-nina-europea-piel-bronceada-cabello-oscuro_176420-28080.avif'),
} as const

export const handPhoneImages = {
  side: p('/hand-movil/hand-holding-smartphone.jpg'),
  front: p('/hand-movil/front-view-hand-holding-smartphone.jpg'),
} as const

export const storeProductMeta = [
  { id: '1', price: 449, image: p('/products/natural-self-care-composition.jpg') },
  { id: '2', price: 689, image: p('/products/product-branding-packaging.jpg') },
  { id: '3', price: 329, image: p('/products/front-view-natural-self-care-products-composition.jpg') },
  { id: '4', price: 519, image: p('/products/cosmetic-male-beauty-products-with-display.jpg') },
  { id: '5', price: 279, image: p('/products/wooden-board-with-soap-serum.jpg') },
] as const

export const teamAvatars = [
  personaImages.woman1,
  personaImages.manBeard,
  personaImages.student,
  personaImages.youngMan,
] as const

export const crmLeadAvatars = [
  personaImages.woman3,
  personaImages.manBeard,
  personaImages.woman4,
] as const
