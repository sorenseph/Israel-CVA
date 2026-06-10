import type { Messages } from '../types'

const messages: Messages = {
  nav: {
    links: [
      { id: 'inicio', label: 'Inicio' },
      { id: 'servicios', label: 'Servicios' },
      { id: 'demos', label: 'Demos' },
      { id: 'proyectos', label: 'Proyectos' },
      { id: 'sobre-mi', label: 'Studio' },
    ],
    contact: 'Contacto',
    aria: {
      logoHome: 'Studio ICVA — inicio',
      menu: 'Menú',
    },
  },
  profile: {
    title: 'Agencia de productos digitales',
    role: 'Agencia de desarrollo digital',
    location: 'México',
    cedula: '11084605',
    summary:
      'Diseñamos y construimos productos digitales listos para operar: sitios web, webapps, SaaS, tiendas en línea, CRM, plataformas de servicios y apps móviles. Trabajamos contigo desde la idea hasta el lanzamiento, con entregas claras, diseño cuidado y foco en conversión y experiencia de usuario.',
    heroLead: 'Agencia de productos digitales.',
    heroPitch:
      'Webapps, SaaS, e-commerce, CRM y apps móviles — de la idea al lanzamiento con un solo equipo.',
  },
  hero: {
    dropTaglines: [
      'Productos digitales de alto impacto.',
      'Webapps, SaaS y e-commerce.',
    ],
    startProject: 'Iniciar proyecto',
    viewDemos: 'Ver demos',
  },
  sections: {
    services: {
      label: 'Servicios',
      title: 'Productos digitales a tu medida',
      subtitle:
        'Sitios, webapps, SaaS, e-commerce, CRM y apps móviles — desde la idea hasta el lanzamiento.',
    },
    showcase: {
      label: 'Demo interactiva',
      title: 'Así se ve un producto en vivo',
      subtitle:
        'Explora tienda, checkout, panel y CRM en un solo entorno de demostración.',
      ctaPrimary: 'Quiero algo así',
      ctaSecondary: 'Ver tipos de proyecto',
    },
    deliverables: {
      label: 'Proyectos',
      title: 'Lo que podemos construir contigo',
      subtitle:
        'Tipos de producto que lanzamos con marcas, startups y equipos corporativos.',
    },
    process: {
      label: 'Proceso',
      title: 'Cómo trabajamos juntos',
      subtitle: 'Metodología clara, entregas visibles y comunicación constante.',
    },
    stats: {
      label: 'Impacto',
      title: 'Números que respaldan el trabajo',
    },
    about: {
      label: 'Studio',
      title: 'Agencia enfocada en producto',
    },
    testimonials: {
      label: 'Confianza',
      title: 'Lo que dicen los equipos',
    },
    experience: {
      label: 'Trayectoria',
      title: 'Proyectos y contextos',
      subtitle:
        'Experiencia construyendo productos para finanzas, retail, agencias y equipos corporativos.',
    },
    faq: {
      label: 'FAQ',
      title: 'Preguntas frecuentes',
    },
    cta: {
      title: '¿Listo para lanzar tu producto digital?',
      subtitle:
        'Cuéntanos tu idea y te respondemos en menos de 24 horas con los siguientes pasos.',
      talkBtn: 'Hablemos',
      directEmailBtn: 'Email directo',
    },
    contact: {
      label: 'Contacto',
      title: 'Cuéntanos tu proyecto',
      subtitle:
        'Completa el formulario y te respondemos en menos de 24 horas con los siguientes pasos.',
    },
  },
  services: [
    {
      num: '01',
      title: 'Sitios y landings',
      description:
        'Páginas de alto impacto para marcas, campañas y lanzamientos con narrativa clara y llamadas a la acción.',
      tags: ['Branding', 'Conversión', 'SEO'],
    },
    {
      num: '02',
      title: 'Webapps y SaaS',
      description:
        'Productos digitales con cuentas de usuario, paneles, flujos de negocio y crecimiento por etapas.',
      tags: ['MVP', 'Escalable', 'B2B / B2C'],
    },
    {
      num: '03',
      title: 'E-commerce',
      description:
        'Tiendas completas: catálogo, carrito, pagos, envíos y herramientas para tu equipo.',
      tags: ['Catálogo', 'Checkout', 'Operación'],
    },
    {
      num: '04',
      title: 'CRM y plataformas',
      description:
        'Sistemas a medida para ventas, servicio al cliente, reservas y gestión interna.',
      tags: ['CRM', 'Automatización', 'Portal'],
    },
  ],
  processSteps: [
    {
      step: '01',
      title: 'Descubrimiento',
      text: 'Objetivos, usuarios, alcance y prioridades del producto.',
    },
    {
      step: '02',
      title: 'Diseño',
      text: 'Experiencia, flujos y prototipo alineado a tu marca.',
    },
    {
      step: '03',
      title: 'Construcción',
      text: 'Entregas visibles cada semana hasta el release.',
    },
    {
      step: '04',
      title: 'Lanzamiento',
      text: 'Pruebas, publicación y acompañamiento post-lanzamiento.',
    },
  ],
  benefits: [
    'Más de 6 años lanzando productos para empresas y startups',
    'Enfoque en negocio: conversión, operación y experiencia de usuario',
    'Equipo único de diseño, producto y desarrollo',
    'Comunicación clara y entregas por fases',
  ],
  studioPillars: [
    {
      title: 'Producto primero',
      text: 'Cada pantalla responde a un objetivo de negocio, no a una lista de funciones sueltas.',
    },
    {
      title: 'Diseño editorial',
      text: 'Interfaces limpias, motion sutil y marca consistente en web y móvil.',
    },
    {
      title: 'Comercio y pagos',
      text: 'Tiendas, suscripciones y cobros en línea listos para operar.',
    },
    {
      title: 'Operación real',
      text: 'Paneles y herramientas para que tu equipo administre el día a día.',
    },
  ],
  stats: [
    { value: 6, suffix: '+', label: 'Años construyendo productos' },
    { value: 24, suffix: '+', label: 'Proyectos entregados' },
    { value: 99, suffix: '%', label: 'Disponibilidad en producción' },
    { value: 12, suffix: '+', label: 'Marcas y equipos' },
  ],
  testimonials: [
    {
      quote:
        'Entregaron un dashboard complejo en tiempo récord, con una experiencia clara para el equipo.',
      author: 'Equipo fintech',
      role: 'Producto digital',
    },
    {
      quote:
        'La nueva plataforma salió estable desde el primer día. Comunicación impecable en todo el proyecto.',
      author: 'Lead de producto',
      role: 'Agencia digital',
    },
  ],
  faqItems: [
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
  ],
  experience: [
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
  ],
  projectDeliverables: [
    {
      tag: 'SaaS',
      title: 'Plataformas y webapps',
      description:
        'Productos con acceso por roles, paneles de administración, flujos de negocio y escalabilidad desde el primer release.',
      outcomes: ['Onboarding', 'Dashboards', 'Multi-tenant', 'Lanzamiento'],
    },
    {
      tag: 'E-commerce',
      title: 'Tiendas en línea',
      description:
        'Catálogo, carrito, checkout y experiencia de compra pensada para convertir en móvil y escritorio.',
      outcomes: ['Catálogo', 'Checkout', 'Promociones', 'Operación'],
    },
    {
      tag: 'Retail',
      title: 'E-commerce operativo',
      description:
        'Inventario, pedidos, envíos y panel para tu equipo sin depender de hojas de cálculo.',
      outcomes: ['Pedidos', 'Inventario', 'Reportes', 'Soporte'],
    },
    {
      tag: 'Mobile',
      title: 'Apps móviles',
      description:
        'Experiencias nativas o híbridas conectadas a tu producto: reservas, membresías, field service y más.',
      outcomes: ['iOS / Android', 'Notificaciones', 'Offline-first', 'Stores'],
    },
    {
      tag: 'Pagos',
      title: 'Pagos y suscripciones',
      description:
        'Cobros en línea, planes recurrentes y flujos seguros integrados a tu operación.',
      outcomes: ['Checkout', 'Suscripciones', 'Facturación', 'Conciliación'],
    },
    {
      tag: 'Servicios',
      title: 'CRM y plataformas de servicio',
      description:
        'Agenda, clientes, cotizaciones y seguimiento para equipos comerciales y de operaciones.',
      outcomes: ['Pipeline', 'Automatización', 'Portal cliente', 'Integraciones'],
    },
  ],
  contact: {
    form: {
      nameLabel: 'Nombre',
      namePlaceholder: 'Tu nombre o empresa',
      phoneLabel: 'Teléfono',
      phonePlaceholder: '10 dígitos',
      emailLabel: 'Correo',
      emailPlaceholder: 'tu@email.com',
      messageLabel: 'Mensaje',
      messagePlaceholder:
        '¿Qué producto necesitas? (webapp, tienda, CRM, app móvil…) Plazos y objetivos.',
      submit: 'Enviar mensaje',
      submitting: 'Enviando…',
      successTitle: 'Mensaje enviado',
      successMessage: 'Recibimos tu solicitud. Te contactaremos en menos de 24 horas.',
      errorTitle: 'No se pudo enviar',
      submitError: 'Error al enviar el mensaje',
    },
    validation: {
      nameRequired: 'Escribe tu nombre.',
      nameMaxLength: 'El nombre no puede superar 50 caracteres.',
      nameInvalidChars:
        'El nombre solo puede incluir letras, números, espacios, punto, guion y apóstrofo.',
      emailRequired: 'Escribe tu correo.',
      emailMaxLength: 'El correo no puede superar 50 caracteres.',
      emailInvalidChars: 'El correo solo puede incluir letras, números y @ . _ - +',
      emailInvalid: 'Ingresa un correo válido.',
      phoneRequired: 'Escribe tu teléfono.',
      phoneInvalid: 'El teléfono debe tener exactamente 10 dígitos numéricos.',
      messageRequired: 'Escribe tu mensaje.',
      messageMaxLength: 'El mensaje no puede superar 2000 caracteres.',
      messageInvalidChars: 'El mensaje contiene caracteres no permitidos.',
    },
  },
  footer: {
    tagline: 'Agencia de productos digitales',
  },
  demos: {
    liveFeed: {
      title: 'Leads en tiempo real',
      hint: 'Vista de demostración — los mensajes reales aparecen al enviar el formulario de contacto',
    },
    metricCounter: {
      liveData: 'Datos en vivo',
      demoView: 'Vista de demostración',
      projects: 'Proyectos',
      clients: 'Clientes',
      uptime: 'Uptime',
    },
  },
  preloader: {},
}

export default messages
