export type Locale = 'es' | 'en'

export interface NavLinkMessage {
  id: string
  label: string
}

export interface ServiceMessage {
  num: string
  title: string
  description: string
  tags: string[]
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
    services: SectionTitleMessage
    showcase: SectionTitleMessage & {
      ctaPrimary: string
      ctaSecondary: string
    }
    deliverables: SectionTitleMessage
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
  services: ServiceMessage[]
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
  }
  preloader: Record<string, never>
}
