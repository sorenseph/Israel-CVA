export const profile = {
  name: 'Studio ICVA',
  title: 'Agencia de productos digitales',
  role: 'Agencia de desarrollo digital',
  cedula: '11084605',
  phone: '+52 55 3913 4480',
  email: 'israelcardenas6@gmail.com',
  location: 'CDMX, Ciudad de México',
  summary:
    'Diseñamos y construimos productos digitales listos para operar: sitios web, webapps, SaaS, tiendas en línea, CRM, plataformas de servicios y apps móviles. Trabajamos contigo desde la idea hasta el lanzamiento, con entregas claras, diseño cuidado y foco en conversión y experiencia de usuario.',
  heroLead:
    'Agencia de productos digitales.',
  heroPitch:
    'Webapps, SaaS, e-commerce, CRM y apps móviles — de la idea al lanzamiento con un solo equipo.',
}

export const experience = [
  {
    role: 'Plataforma de cobranza',
    company: 'Sector financiero',
    period: '2023 — Actual',
    highlights: [
      'Portal centralizado para operación diaria de equipos grandes.',
      'Módulos escalables y flujos críticos en producción.',
      'Integración con servicios internos y cumplimiento operativo.',
    ],
  },
  {
    role: 'Productos para afore',
    company: 'Servicios financieros',
    period: '2023',
    highlights: [
      'Renovación de experiencia para usuarios y asesores.',
      'Interfaces responsivas y despliegue estable en producción.',
      'Trabajo ágil con equipos de negocio y QA.',
    ],
  },
  {
    role: 'Sitios y contenido',
    company: 'Agencia de marketing',
    period: '2021 — 2022',
    highlights: [
      'Landings, blogs y sitios corporativos con enfoque en conversión.',
      'Entrega rápida de campañas y páginas promocionales.',
    ],
  },
  {
    role: 'Aplicaciones empresariales',
    company: 'Consultoría digital',
    period: '2021 — 2022',
    highlights: [
      'Portales internos y herramientas para equipos operativos.',
      'Optimización de rendimiento y experiencia en móvil.',
    ],
  },
  {
    role: 'Presencia digital',
    company: 'Casa de bolsa',
    period: '2020 — 2021',
    highlights: [
      'Sitios responsive y actualización de identidad en web.',
      'Contenido alineado con regulación y marca.',
    ],
  },
  {
    role: 'Web corporativa',
    company: 'Banca retail',
    period: '2019 — 2020',
    highlights: [
      'Maquetado responsive y medición de tráfico.',
      'Coordinación con diseño y equipos de contenido.',
    ],
  },
]

export const projectDeliverables = [
  {
    tag: 'SaaS',
    title: 'Plataformas y webapps',
    description:
      'Productos con acceso por roles, paneles de administración, flujos de negocio y escalabilidad desde el primer release.',
    outcomes: ['Onboarding', 'Dashboards', 'Multi-tenant', 'Lanzamiento'],
    lottie: 'wardrobe',
    span: 'wide' as const,
  },
  {
    tag: 'E-commerce',
    title: 'Tiendas en línea',
    description:
      'Catálogo, carrito, checkout y experiencia de compra pensada para convertir en móvil y escritorio.',
    outcomes: ['Catálogo', 'Checkout', 'Promociones', 'Operación'],
    lottie: 'shopping-bag',
    span: 'tall' as const,
  },
  {
    tag: 'Retail',
    title: 'E-commerce operativo',
    description:
      'Inventario, pedidos, envíos y panel para tu equipo sin depender de hojas de cálculo.',
    outcomes: ['Pedidos', 'Inventario', 'Reportes', 'Soporte'],
    lottie: 'free-shopping',
    span: 'normal' as const,
  },
  {
    tag: 'Mobile',
    title: 'Apps móviles',
    description:
      'Experiencias nativas o híbridas conectadas a tu producto: reservas, membresías, field service y más.',
    outcomes: ['iOS / Android', 'Notificaciones', 'Offline-first', 'Stores'],
    lottie: 'qr-scan',
    span: 'normal' as const,
  },
  {
    tag: 'Pagos',
    title: 'Pagos y suscripciones',
    description:
      'Cobros en línea, planes recurrentes y flujos seguros integrados a tu operación.',
    outcomes: ['Checkout', 'Suscripciones', 'Facturación', 'Conciliación'],
    lottie: 'card',
    span: 'normal' as const,
  },
  {
    tag: 'Servicios',
    title: 'CRM y plataformas de servicio',
    description:
      'Agenda, clientes, cotizaciones y seguimiento para equipos comerciales y de operaciones.',
    outcomes: ['Pipeline', 'Automatización', 'Portal cliente', 'Integraciones'],
    lottie: 'fist-bump',
    span: 'wide' as const,
  },
]

export const navLinks = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'demos', label: 'Demos' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'sobre-mi', label: 'Studio' },
]
