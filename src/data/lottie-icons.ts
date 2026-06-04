/** Rutas locales de animaciones Lottie (trazos, estilo editorial B/N). */
export const lottieIcons = {
  wardrobe: '/lottie/icons/wardrobe.json',
  'shopping-bag': '/lottie/icons/shopping-bag.json',
  'free-shopping': '/lottie/icons/Free-shopping.json',
  'shopping-cart': '/lottie/icons/Free-shopping.json',
  'qr-scan': '/lottie/icons/qr-scan.json',
  card: '/lottie/icons/card.json',
  'fist-bump': '/lottie/icons/fist-bump.json',
  'create-web': '/lottie/icons/create-web.json',
  search: '/lottie/icons/search.json',
} as const

export type LottieIconKey = keyof typeof lottieIcons

/** Ajustes de tamaño por animación (viewBox distintos). */
export const lottieIconLayout: Partial<
  Record<
    LottieIconKey,
    { size?: 'sm' | 'md' | 'lg' | 'boost'; variant?: 'wide' | 'scene' | 'scene-center' }
  >
> = {
  'free-shopping': { size: 'md' },
  'create-web': { size: 'lg', variant: 'scene-center' },
  search: { size: 'md', variant: 'wide' },
  'fist-bump': { size: 'boost' },
}
