export const profile = {
  name: 'Israel Cárdenas Valderas',
  title: 'Ingeniero en Sistemas Computacionales',
  role: 'Desarrollador Frontend',
  cedula: '11084605',
  phone: '+52 55 3913 4480',
  email: 'israelcardenas6@gmail.com',
  location: 'CDMX, Ciudad de México',
  summary:
    'Desarrollador Frontend con más de 6 años creando aplicaciones web para empresas, agencias y startups. Experto en Vue, Angular y TypeScript, arquitectura de microfrontends, SPAs responsivas, integración de APIs, CI/CD, calidad con SonarQube y despliegues en la nube. Combino criterio visual con código mantenible para productos que escalan — desde landings hasta plataformas complejas.',
  heroPitch:
    'Desarrollo aplicaciones web con Vue, Angular y TypeScript: interfaces, APIs, bases de datos y despliegues en producción con buenas prácticas de calidad y CI/CD.',
}

export const skills = [
  { name: 'Vue.js', level: 95 },
  { name: 'Angular', level: 90 },
  { name: 'TypeScript / JavaScript', level: 92 },
  { name: 'HTML5 / CSS3 / Sass', level: 95 },
  { name: 'Microfrontends', level: 88 },
  { name: 'REST APIs', level: 90 },
  { name: 'CI/CD & Git', level: 88 },
  { name: 'SonarQube', level: 85 },
  { name: 'Swift / SwiftUI', level: 70 },
  { name: 'Flutter', level: 65 },
  { name: 'Bootstrap / Vuetify', level: 85 },
  { name: 'Adobe Suite', level: 75 },
]

export const experience = [
  {
    role: 'Desarrollador especializado',
    company: 'Cobranza Banco Azteca',
    period: 'Ago 2023 — Actual',
    highlights: [
      'Plataforma centralizada de cobranza bancaria con arquitectura de microfrontends en Vue.',
      'Componentes reutilizables y módulos escalables para aplicaciones empresariales.',
      'Integración de APIs REST orientadas a servicios financieros.',
      'Pruebas unitarias y análisis estático con SonarQube.',
      'Administración de flujos CI/CD y control de versiones con Git.',
    ],
  },
  {
    role: 'FrontEnd — Célula Java Afore Azteca',
    company: 'IDS',
    period: 'Ene 2023 — Ago 2023',
    highlights: [
      'Migración tecnológica hacia Angular 14 para aplicaciones financieras.',
      'Interfaces responsivas y módulos frontend desde cero.',
      'Corrección de vulnerabilidades y code smells en SonarQube.',
      'Pruebas unitarias y soporte a ambientes productivos.',
      'Metodologías ágiles y gestión de backlog.',
    ],
  },
  {
    role: 'Estrategia y desarrollo web',
    company: 'Hudle (Weecompany)',
    period: 'Dic 2021 — Dic 2022',
    highlights: [
      'Agencia de marketing: creación de páginas web y blogs dinámicos.',
    ],
  },
  {
    role: 'Front end',
    company: 'Weecompany',
    period: 'Sep 2021 — Dic 2022',
    highlights: [
      'Aplicaciones web empresariales con Angular y .NET.',
      'Integración de APIs REST y optimización SEO.',
      'Interfaces responsive enfocadas en UX.',
      'Validación de servicios con Postman.',
    ],
  },
  {
    role: 'Front end',
    company: 'Punto Casa de Bolsa',
    period: 'Ago 2020 — Sep 2021',
    highlights: [
      'Maquetado web responsive en .NET.',
      'Actualización de SEO y diseño en Illustrator y Photoshop.',
    ],
  },
  {
    role: 'Front end',
    company: 'Santander',
    period: 'Sep 2019 — Ago 2020',
    highlights: [
      'Maquetado responsive, SEO y Google Analytics.',
      'Exportación de contenido desde Zeplin y Sketch.',
      'Gestión de tickets en backlog.',
    ],
  },
  {
    role: 'Diseñador web',
    company: 'Enlaces Educanada',
    period: 'Ago 2018 — Sep 2019',
    highlights: [
      'Diseño web y contenido para página web.',
      'Mantenimiento preventivo y correctivo.',
    ],
  },
  {
    role: 'Residencias profesionales',
    company: 'ITSH — Sistema expediente clínico electrónico',
    period: '2016 — 2017',
    highlights: [
      'Creación de página web conectada a base de datos.',
    ],
  },
]

export const projectDeliverables = [
  {
    tag: 'Enterprise',
    title: 'Portales y dashboards a medida',
    description:
      'Aplicaciones web escalables con Vue o Angular, módulos reutilizables, APIs REST y despliegue automatizado.',
    features: ['Vue 3 + TypeScript', 'Microfrontends', 'SonarQube', 'AWS / Vercel'],
    span: 'wide' as const,
  },
  {
    tag: 'SaaS',
    title: 'App con auth y base de datos',
    description: 'Login, roles, CRUD y panel admin con Supabase en días, no meses.',
    features: ['Supabase Auth', 'PostgreSQL', 'RLS', 'Realtime'],
    span: 'tall' as const,
  },
  {
    tag: 'E-commerce',
    title: 'Tienda con pasarela de pago',
    description: 'Checkout, suscripciones y webhooks con Stripe o Mercado Pago.',
    features: ['Stripe', 'Mercado Pago', 'Webhooks', 'Emails'],
    span: 'normal' as const,
  },
  {
    tag: 'Marketing',
    title: 'Landing + motion',
    description:
      'Sitios de alto impacto visual con animaciones tipo Jitter y grids estilo Cosmos o Mobbin.',
    features: ['Motion', 'SEO', 'Core Web Vitals', 'Netlify'],
    span: 'normal' as const,
  },
  {
    tag: 'Enterprise',
    title: 'Migración Angular / Vue',
    description: 'Modernización de SPAs legacy, pruebas unitarias y pipelines automatizados.',
    features: ['Angular 14+', 'Vue 3', 'GitHub Actions', 'Postman'],
    span: 'normal' as const,
  },
  {
    tag: 'Mobile',
    title: 'Extensión iOS / Flutter',
    description: 'Complemento móvil para tu producto web con SwiftUI o Flutter.',
    features: ['SwiftUI', 'UIKit', 'Flutter', 'APIs REST'],
    span: 'wide' as const,
  },
]

export const navLinks = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'demos', label: 'Demos' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'contacto', label: 'Contacto' },
]
