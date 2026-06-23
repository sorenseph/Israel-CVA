import type { Messages } from '../types'

const messages: Messages = {
  nav: {
    links: [
      { id: 'inicio', label: 'Inicio' },
      { id: 'proyectos', label: 'Proyectos' },
      { id: 'demos', label: 'Demos', href: '/demo' },
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
    heroLead: 'Productos digitales para negocios que quieren crecer.',
    heroPitch:
      'Más clientes para tu negocio y automatización — de la idea al lanzamiento con un solo equipo.',
  },
  hero: {
    dropTaglines: [
      'Más clientes. Menos trabajo manual.',
      'Automatización que escala tu negocio.',
    ],
    startProject: 'Iniciar proyecto',
    viewDemos: 'Ver demos',
  },
  sections: {
    showcase: {
      label: 'Demo interactiva',
      title: 'Así se ve un producto en vivo',
      subtitle:
        'Explora tienda, checkout, panel y CRM en un solo entorno de demostración.',
      ctaPrimary: 'Quiero algo así',
      ctaSecondary: 'Ver tipos de proyecto',
      enterDemo: 'Entrar a la demo',
      teaserHint: 'Tienda, checkout, panel y CRM — interactivo y sin salir del sitio.',
    },
    deliverables: {
      label: 'Proyectos',
      title: 'Lo que podemos construir contigo',
      subtitle:
        'Explora cada tipo de producto en un simulador interactivo — navega como si ya estuviera en producción.',
      exploreCta: 'Explorar simulador',
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
    payment: {
      title: 'Pago seguro',
      total: 'Total a pagar',
      cardNumber: 'Número de tarjeta',
      expiry: 'Vencimiento',
      cvv: 'CVV',
      pay: 'Pagar',
      processing: 'Procesando pago…',
      success: '¡Pago confirmado!',
      successDetail: 'Recibirás la confirmación por correo',
      cancel: 'Cancelar',
    },
    auth: {
      title: 'Acceso de clientes',
      email: 'Correo',
      emailPlaceholder: 'tu@empresa.com',
      password: 'Contraseña',
      passwordPlaceholder: '••••••••',
      continue: 'Continuar',
      login: 'Iniciar sesión',
      verifying: 'Verificando credenciales…',
      sessionActive: 'Sesión activa',
      logout: 'Cerrar sesión',
    },
    studio: {
      tabs: [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'store', label: 'Tienda' },
        { id: 'crm', label: 'CRM Live' },
      ],
      searchPlaceholder: 'Buscar productos, clientes, pedidos…',
      headerSubtitle: 'Vista previa de tienda, panel y CRM en un solo producto',
      preview: 'Preview',
      live: 'Live',
      notifications: 'Notificaciones',
      cart: 'Carrito',
      revenueChart: 'Ingresos · últimos 12 meses',
      recentOrders: 'Últimos pedidos',
      orders: [
        { id: '#1842', amount: '$127', status: 'Completado' },
        { id: '#1841', amount: '$49', status: 'En tránsito' },
        { id: '#1840', amount: '$99', status: 'Procesando' },
      ],
      pipeline: [
        { stage: 'Brief', count: 3 },
        { stage: 'Diseño', count: 5 },
        { stage: 'Dev', count: 8 },
        { stage: 'Deploy', count: 4 },
      ],
    },
    cart: {
      catalog: 'Catálogo',
      cart: 'Carrito',
      empty: 'Tu carrito está vacío — agrega un producto',
      subtotal: 'Subtotal',
      shipping: 'Envío',
      freeShipping: 'Gratis',
      total: 'Total',
      checkout: 'Ir a pagar',
      add: '+ Agregar',
      orderConfirmed: '¡Pedido confirmado!',
      orderConfirmedDetail: 'Recibirás la confirmación por correo.',
      newPurchase: 'Nueva compra',
    },
    checkout: {
      label: 'Demo · Suscripción',
      planPro: 'Pro · $999/mes',
      planTeam: 'Team · $1,899/mes',
      success: 'Suscripción activa · factura enviada',
    },
    store: {
      products: [
        { name: 'Kit cuidado natural', tag: 'Bestseller' },
        { name: 'Set branding premium', tag: 'Nuevo' },
        { name: 'Rutina facial diaria', tag: 'Popular' },
        { name: 'Colección masculina', tag: 'Edición limitada' },
        { name: 'Serum + jabón artesanal', tag: 'Oferta' },
      ],
    },
    crm: {
      activity: 'Actividad del sistema',
      stages: [
        { name: 'Nuevo', value: '$48k', count: 12 },
        { name: 'Calificado', value: '$62k', count: 8 },
        { name: 'Propuesta', value: '$91k', count: 5 },
        { name: 'Cierre', value: '$120k', count: 3 },
      ],
      leads: [
        { name: 'María González', company: 'Nova Retail', value: '$12,400' },
        { name: 'Roberto Silva', company: 'FinLab', value: '$8,900' },
        { name: 'Elena Martínez', company: 'Studio Bloom', value: '$15,200' },
      ],
      calendar: [
        { day: 'Lun', slots: ['10:00 Demo', '15:00 Seguimiento'] },
        { day: 'Mar', slots: ['11:30 Llamada'] },
        { day: 'Mié', slots: ['09:00 Kickoff', '17:00 Cierre'] },
      ],
      notifications: [
        { text: 'Nuevo lead desde landing', time: 'hace 5m' },
        { text: 'Pago confirmado en checkout', time: 'hace 12m' },
        { text: 'Pedido #1842 enviado', time: 'hace 18m' },
      ],
      mockLeads: [
        { name: 'María G.', message: 'Necesito una webapp para mi startup' },
        { name: 'Carlos R.', message: 'Tienda en línea con panel de pedidos' },
      ],
    },
    team: [
      { name: 'Ana R.', role: 'Admin', active: true },
      { name: 'Luis M.', role: 'Operaciones', active: true },
      { name: 'Sofía T.', role: 'Soporte', active: false },
      { name: 'Carlos V.', role: 'Ventas', active: true },
    ],
  },
  seo: {
    siteName: 'Studio ICVA',
    homeTitle: 'Studio ICVA',
    titleSuffix: 'Agencia de productos digitales',
    homeDescription:
      'Studio ICVA — agencia de productos digitales. Sitios web, webapps, SaaS, e-commerce, CRM, plataformas de servicios y apps móviles a medida. De la idea al lanzamiento con un solo equipo.',
    keywords:
      'agencia desarrollo web, webapps, SaaS México, e-commerce México, CRM a medida, aplicaciones móviles, plataformas digitales, Studio ICVA, productos digitales',
    defaultImageAlt: 'Studio ICVA — agencia de productos digitales',
    simulatorPreview: 'Vista previa interactiva',
    simulatorDetail: 'Explora una demo funcional del producto.',
    breadcrumbHome: 'Inicio',
    breadcrumbExplore: 'Proyectos',
    demoTitle: 'Demo interactiva',
    demoDescription:
      'Explora tienda, checkout, panel y CRM en un entorno de demostración interactivo de Studio ICVA.',
  },
  preloader: {},
  whatsapp: {
    aria: 'Escríbenos por WhatsApp',
    defaultMessage: 'Hola Studio ICVA, me interesa un proyecto digital.',
  },
  simulators: {
    back: 'Volver al sitio',
    preview: 'Vista previa interactiva',
    hint: 'Navega entre módulos como en un producto real.',
    contactCta: 'Quiero algo así',
    webapp: {
      nav: [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'projects', label: 'Proyectos' },
        { id: 'users', label: 'Usuarios' },
      ],
      revenue: 'Ingresos mensuales',
      activity: 'Actividad reciente',
      events: [
        'Nuevo cliente registrado — hace 3 min',
        'Reporte exportado — hace 18 min',
        'Módulo de pagos activado — hace 1 h',
      ],
      projectsTitle: 'Proyectos en curso',
      usersTitle: 'Equipo y accesos',
      projects: [
        { name: 'Portal clientes', status: 'En producción', progress: 100 },
        { name: 'Módulo reportes', status: 'En desarrollo', progress: 68 },
        { name: 'Onboarding v2', status: 'Diseño', progress: 34 },
      ],
      statusActive: 'Activo',
      statusAway: 'Ausente',
    },
    tienda: {
      nav: [
        { id: 'catalog', label: 'Catálogo' },
        { id: 'checkout', label: 'Checkout' },
        { id: 'promos', label: 'Promociones' },
      ],
      heroTitle: 'Tu tienda, lista para vender',
      heroText: 'Catálogo real, carrito y checkout en un solo flujo.',
      promosTitle: 'Cupones activos',
      apply: 'Aplicar',
      inactive: 'Inactivo',
      promos: [
        { code: 'LANZAMIENTO15', discount: '15%', active: true },
        { code: 'ENVIOGRATIS', discount: 'Envío $0', active: true },
        { code: 'VIP20', discount: '20%', active: false },
      ],
    },
    operaciones: {
      nav: [
        { id: 'orders', label: 'Pedidos' },
        { id: 'inventory', label: 'Inventario' },
        { id: 'reports', label: 'Reportes' },
      ],
      ordersTitle: 'Pedidos del día',
      inventoryTitle: 'Inventario',
      reportsTitle: 'Resumen operativo',
      units: 'unidades',
      lowStock: 'Stock bajo',
      kpiSales: 'Ventas vs mes anterior',
      kpiFulfillment: 'Pedidos completados',
      kpiShipping: 'Tiempo de envío',
      orders: [
        { id: '#2841', client: 'María G.', total: '$1,240', status: 'Enviado' },
        { id: '#2840', client: 'Carlos V.', total: '$890', status: 'Empacando' },
        { id: '#2839', client: 'Laura P.', total: '$2,100', status: 'Pagado' },
      ],
    },
    movil: {
      nav: [
        { id: 'home', label: 'Inicio', icon: '⌂' },
        { id: 'shop', label: 'Tienda', icon: '◈' },
        { id: 'bookings', label: 'Agenda', icon: '◎' },
        { id: 'profile', label: 'Perfil', icon: '◉' },
      ],
      greeting: 'Buenos días',
      homeTitle: 'Tu negocio en el bolsillo',
      searchPlaceholder: 'Buscar productos, citas…',
      featuredTitle: 'Destacados',
      activityTitle: 'Actividad reciente',
      shopTitle: 'Catálogo',
      statBookings: 'Citas hoy',
      statSatisfaction: 'Satisfacción',
      ctaBook: 'Agendar cita',
      bookingsTitle: 'Agenda de hoy',
      profileRole: 'Cuenta premium',
      notifOn: 'Notificaciones activas',
      membership: 'Membresía anual',
      offline: 'Modo sin conexión',
      paymentMethod: 'Método de pago guardado',
      teamTitle: 'Tu equipo',
      sideTitle: 'Clientes activos',
      sideText: 'La app conecta ventas, agenda y catálogo en un solo flujo.',
      bookings: [
        { time: '10:00', title: 'Consulta inicial', client: 'Roberto S.' },
        { time: '12:30', title: 'Seguimiento', client: 'Elena M.' },
        { time: '16:00', title: 'Entrega', client: 'Grupo Nova' },
      ],
      activity: [
        { text: 'Nuevo pedido #2841', time: '2 min' },
        { text: 'Cita confirmada', time: '15 min' },
        { text: 'Pago recibido', time: '1 h' },
      ],
      profileName: 'Ana García',
    },
    pagos: {
      nav: [
        { id: 'plans', label: 'Planes' },
        { id: 'checkout', label: 'Cobro' },
        { id: 'invoices', label: 'Facturas' },
      ],
      featureCheckout: 'Checkout seguro',
      featureBilling: 'Facturación automática',
      invoicesTitle: 'Historial de facturas',
      invoiceColumns: {
        invoice: 'Factura',
        amount: 'Monto',
        date: 'Fecha',
        status: 'Estado',
      },
      plans: [
        { id: 'starter', name: 'Starter', price: '$499', period: '/mes' },
        { id: 'pro', name: 'Pro', price: '$999', period: '/mes', featured: true },
        { id: 'team', name: 'Team', price: '$1,899', period: '/mes' },
      ],
      invoices: [
        { id: 'INV-2401', amount: '$999', date: '01 Jun', status: 'Pagada' },
        { id: 'INV-2400', amount: '$999', date: '01 May', status: 'Pagada' },
        { id: 'INV-2399', amount: '$499', date: '01 Abr', status: 'Pagada' },
      ],
    },
    crm: {
      nav: [
        { id: 'pipeline', label: 'Pipeline' },
        { id: 'leads', label: 'Leads' },
        { id: 'calendar', label: 'Agenda' },
      ],
      calendarTitle: 'Semana en curso',
    },
  },
}

export default messages
