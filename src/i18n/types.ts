export type Locale = 'es' | 'en'

export interface NavLinkMessage {
  id: string
  label: string
}

export interface ProcessStepMessage {
  step: string
  title: string
  text: string
}

export interface StudioPillarMessage {
  title: string
  text: string
}

export interface StatMessage {
  value: number
  suffix: string
  label: string
}

export interface TestimonialMessage {
  quote: string
  author: string
  role: string
}

export interface FaqItemMessage {
  q: string
  a: string
}

export interface ExperienceMessage {
  role: string
  company: string
  period: string
  highlights: string[]
}

export interface ProjectDeliverableMessage {
  tag: string
  title: string
  description: string
  outcomes: string[]
}

export interface SectionTitleMessage {
  label: string
  title: string
  subtitle?: string
}

export interface ContactFormMessages {
  nameLabel: string
  namePlaceholder: string
  phoneLabel: string
  phonePlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  messageLabel: string
  messagePlaceholder: string
  submit: string
  submitting: string
  successTitle: string
  successMessage: string
  errorTitle: string
  submitError: string
}

export interface ContactValidationMessages {
  nameRequired: string
  nameMaxLength: string
  nameInvalidChars: string
  emailRequired: string
  emailMaxLength: string
  emailInvalidChars: string
  emailInvalid: string
  phoneRequired: string
  phoneInvalid: string
  messageRequired: string
  messageMaxLength: string
  messageInvalidChars: string
}

export interface Messages {
  nav: {
    links: NavLinkMessage[]
    contact: string
    aria: {
      logoHome: string
      menu: string
    }
  }
  profile: {
    title: string
    role: string
    location: string
    cedula: string
    summary: string
    heroLead: string
    heroPitch: string
  }
  hero: {
    dropTaglines: string[]
    startProject: string
    viewDemos: string
  }
  sections: {
    showcase: SectionTitleMessage & {
      ctaPrimary: string
      ctaSecondary: string
    }
    deliverables: SectionTitleMessage & { exploreCta: string }
    process: SectionTitleMessage
    stats: SectionTitleMessage
    about: SectionTitleMessage
    testimonials: SectionTitleMessage
    experience: SectionTitleMessage
    faq: SectionTitleMessage
    cta: {
      title: string
      subtitle: string
      talkBtn: string
      directEmailBtn: string
    }
    contact: SectionTitleMessage
  }
  processSteps: ProcessStepMessage[]
  benefits: string[]
  studioPillars: StudioPillarMessage[]
  stats: StatMessage[]
  testimonials: TestimonialMessage[]
  faqItems: FaqItemMessage[]
  experience: ExperienceMessage[]
  projectDeliverables: ProjectDeliverableMessage[]
  contact: {
    form: ContactFormMessages
    validation: ContactValidationMessages
  }
  footer: {
    tagline: string
  }
  demos: {
    liveFeed: {
      title: string
      hint: string
    }
    metricCounter: {
      liveData: string
      demoView: string
      projects: string
      clients: string
      uptime: string
    }
    payment: {
      title: string
      total: string
      cardNumber: string
      expiry: string
      cvv: string
      pay: string
      processing: string
      success: string
      successDetail: string
      cancel: string
    }
    auth: {
      title: string
      email: string
      emailPlaceholder: string
      password: string
      passwordPlaceholder: string
      continue: string
      login: string
      verifying: string
      sessionActive: string
      logout: string
    }
    studio: {
      tabs: { id: string; label: string }[]
      searchPlaceholder: string
      headerSubtitle: string
      preview: string
      live: string
      notifications: string
      cart: string
      revenueChart: string
      recentOrders: string
      orders: { id: string; amount: string; status: string }[]
      pipeline: { stage: string; count: number }[]
    }
    cart: {
      catalog: string
      cart: string
      empty: string
      subtotal: string
      shipping: string
      freeShipping: string
      total: string
      checkout: string
      add: string
      orderConfirmed: string
      orderConfirmedDetail: string
      newPurchase: string
    }
    checkout: {
      label: string
      planPro: string
      planTeam: string
      success: string
    }
    store: {
      products: { name: string; tag: string }[]
    }
    crm: {
      activity: string
      stages: { name: string; value: string; count: number }[]
      leads: { name: string; company: string; value: string }[]
      calendar: { day: string; slots: string[] }[]
      notifications: { text: string; time: string }[]
      mockLeads: { name: string; message: string }[]
    }
    team: { name: string; role: string; active: boolean }[]
  }
  seo: {
    siteName: string
    homeTitle: string
    titleSuffix: string
    homeDescription: string
    keywords: string
    defaultImageAlt: string
    simulatorPreview: string
    simulatorDetail: string
    breadcrumbHome: string
    breadcrumbExplore: string
  }
  preloader: Record<string, never>
  whatsapp: {
    aria: string
    defaultMessage: string
  }
  simulators: {
    back: string
    preview: string
    hint: string
    contactCta: string
    webapp: {
      nav: { id: string; label: string }[]
      revenue: string
      activity: string
      events: string[]
      projectsTitle: string
      usersTitle: string
      projects: { name: string; status: string; progress: number }[]
      statusActive: string
      statusAway: string
    }
    tienda: {
      nav: { id: string; label: string }[]
      heroTitle: string
      heroText: string
      promosTitle: string
      apply: string
      inactive: string
      promos: { code: string; discount: string; active: boolean }[]
    }
    operaciones: {
      nav: { id: string; label: string }[]
      ordersTitle: string
      inventoryTitle: string
      reportsTitle: string
      units: string
      lowStock: string
      kpiSales: string
      kpiFulfillment: string
      kpiShipping: string
      orders: { id: string; client: string; total: string; status: string }[]
    }
    movil: {
      nav: { id: string; label: string; icon: string }[]
      greeting: string
      homeTitle: string
      searchPlaceholder: string
      featuredTitle: string
      activityTitle: string
      shopTitle: string
      statBookings: string
      statSatisfaction: string
      ctaBook: string
      bookingsTitle: string
      profileRole: string
      notifOn: string
      membership: string
      offline: string
      paymentMethod: string
      teamTitle: string
      sideTitle: string
      sideText: string
      bookings: { time: string; title: string; client: string }[]
      activity: { text: string; time: string }[]
      profileName: string
    }
    pagos: {
      nav: { id: string; label: string }[]
      featureCheckout: string
      featureBilling: string
      invoicesTitle: string
      invoiceColumns: { invoice: string; amount: string; date: string; status: string }
      plans: { id: string; name: string; price: string; period: string; featured?: boolean }[]
      invoices: { id: string; amount: string; date: string; status: string }[]
    }
    crm: {
      nav: { id: string; label: string }[]
      calendarTitle: string
    }
  }
}
