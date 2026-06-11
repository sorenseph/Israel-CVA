import type { LottieIconKey } from './lottie-icons'

export const pillarLotties = ['search', 'wardrobe', 'card', 'shopping-bag'] as const satisfies readonly LottieIconKey[]

export const processSteps = [
  { step: '01', title: 'Descubrimiento', text: 'Objetivos, usuarios, alcance y prioridades del producto.' },
  { step: '02', title: 'Diseño', text: 'Experiencia, flujos y prototipo alineado a tu marca.' },
  { step: '03', title: 'Construcción', text: 'Entregas visibles cada semana hasta el release.' },
  { step: '04', title: 'Lanzamiento', text: 'Pruebas, publicación y acompañamiento post-lanzamiento.' },
]

export const benefits = [
  'Más de 6 años lanzando productos para empresas y startups',
  'Enfoque en negocio: conversión, operación y experiencia de usuario',
  'Equipo único de diseño, producto y desarrollo',
  'Comunicación clara y entregas por fases',
]

export const studioPillars: {
  title: string
  text: string
  lottie: LottieIconKey
}[] = [
  {
    title: 'Producto primero',
    text: 'Cada pantalla responde a un objetivo de negocio, no a una lista de funciones sueltas.',
    lottie: 'search',
  },
  {
    title: 'Diseño editorial',
    text: 'Interfaces limpias, motion sutil y marca consistente en web y móvil.',
    lottie: 'wardrobe',
  },
  {
    title: 'Comercio y pagos',
    text: 'Tiendas, suscripciones y cobros en línea listos para operar.',
    lottie: 'card',
  },
  {
    title: 'Operación real',
    text: 'Paneles y herramientas para que tu equipo administre el día a día.',
    lottie: 'shopping-bag',
  },
]

export const stats = [
  { value: 6, suffix: '+', label: 'Años construyendo productos' },
  { value: 24, suffix: '+', label: 'Proyectos entregados' },
  { value: 99, suffix: '%', label: 'Disponibilidad en producción' },
  { value: 12, suffix: '+', label: 'Marcas y equipos' },
]

export const testimonials = [
  {
    quote: 'Entregaron un dashboard complejo en tiempo récord, con una experiencia clara para el equipo.',
    author: 'Equipo fintech',
    role: 'Producto digital',
  },
  {
    quote: 'La nueva plataforma salió estable desde el primer día. Comunicación impecable en todo el proyecto.',
    author: 'Lead de producto',
    role: 'Agencia digital',
  },
]

export const faqItems = [
  {
    q: '¿Qué tipo de proyectos desarrollan?',
    a: 'Sitios web, webapps, SaaS, e-commerce, CRM, plataformas de servicios y apps móviles. Definimos el alcance contigo según etapa y presupuesto.',
  },
  {
    q: '¿Trabajan por proyecto o por etapas?',
    a: 'Por proyecto con alcance definido o por fases (MVP, v2, mantenimiento), según la complejidad y tus prioridades.',
  },
  {
    q: '¿Pueden integrar pagos, reservas o membresías?',
    a: 'Sí. Diseñamos el flujo completo: registro, cobro, notificaciones y panel para tu equipo.',
  },
  {
    q: '¿Cuánto tarda un MVP?',
    a: 'Entre 2 y 8 semanas según pantallas, integraciones y nivel de diseño acordado.',
  },
]
