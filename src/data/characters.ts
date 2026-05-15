/** Humans 3D — una aparición por sección principal */
export const characters = {
  hero: '/characters/he_sitting_with_notebook.png',
  partner: '/characters/she_with_phone.png',
  posePower: '/characters/pose_45.png',
  poseCoffee: '/characters/pose_32-p-800.png',
  poseScroll: '/characters/pose_63.png',
} as const

export const characterLabels: Record<CharacterKey, string> = {
  hero: 'Desarrollador con portátil',
  partner: 'Persona con teléfono',
  posePower: 'Pose de confianza',
  poseCoffee: 'Pose relajada',
  poseScroll: 'Revisando contenido',
}

export type CharacterKey = keyof typeof characters
