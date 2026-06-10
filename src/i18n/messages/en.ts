import type { Messages } from '../types'

const messages: Messages = {
  nav: {
    links: [
      { id: 'inicio', label: 'Home' },
      { id: 'servicios', label: 'Services' },
      { id: 'demos', label: 'Demos' },
      { id: 'proyectos', label: 'Projects' },
      { id: 'sobre-mi', label: 'Studio' },
    ],
    contact: 'Contact',
    aria: {
      logoHome: 'Studio ICVA — home',
      menu: 'Menu',
    },
  },
  profile: {
    title: 'Digital product agency',
    role: 'Digital development agency',
    location: 'Mexico',
    cedula: '11084605',
    summary:
      'We design and build digital products ready to operate: websites, web apps, SaaS, online stores, CRM, service platforms, and mobile apps. We work with you from idea to launch, with clear deliverables, thoughtful design, and a focus on conversion and user experience.',
    heroLead: 'Digital product agency.',
    heroPitch:
      'Web apps, SaaS, e-commerce, CRM, and mobile apps — from idea to launch with one team.',
  },
  hero: {
    dropTaglines: [
      'High-impact digital products.',
      'Web apps, SaaS, and e-commerce.',
    ],
    startProject: 'Start a project',
    viewDemos: 'View demos',
  },
  sections: {
    services: {
      label: 'Services',
      title: 'Digital products tailored to you',
      subtitle:
        'Websites, web apps, SaaS, e-commerce, CRM, and mobile apps — from idea to launch.',
    },
    showcase: {
      label: 'Interactive demo',
      title: 'This is what a live product looks like',
      subtitle:
        'Explore store, checkout, dashboard, and CRM in a single demo environment.',
      ctaPrimary: 'I want something like this',
      ctaSecondary: 'View project types',
    },
    deliverables: {
      label: 'Projects',
      title: 'What we can build with you',
      subtitle:
        'Product types we launch with brands, startups, and corporate teams.',
    },
    process: {
      label: 'Process',
      title: 'How we work together',
      subtitle: 'Clear methodology, visible deliverables, and constant communication.',
    },
    stats: {
      label: 'Impact',
      title: 'Numbers that back our work',
    },
    about: {
      label: 'Studio',
      title: 'Product-focused agency',
    },
    testimonials: {
      label: 'Trust',
      title: 'What teams say',
    },
    experience: {
      label: 'Track record',
      title: 'Projects and contexts',
      subtitle:
        'Experience building products for finance, retail, agencies, and corporate teams.',
    },
    faq: {
      label: 'FAQ',
      title: 'Frequently asked questions',
    },
    cta: {
      title: 'Ready to launch your digital product?',
      subtitle:
        'Tell us your idea and we will respond within 24 hours with next steps.',
      talkBtn: "Let's talk",
      directEmailBtn: 'Direct email',
    },
    contact: {
      label: 'Contact',
      title: 'Tell us about your project',
      subtitle:
        'Fill out the form and we will respond within 24 hours with next steps.',
    },
  },
  services: [
    {
      num: '01',
      title: 'Websites and landing pages',
      description:
        'High-impact pages for brands, campaigns, and launches with clear narrative and calls to action.',
      tags: ['Branding', 'Conversion', 'SEO'],
    },
    {
      num: '02',
      title: 'Web apps and SaaS',
      description:
        'Digital products with user accounts, dashboards, business flows, and staged growth.',
      tags: ['MVP', 'Scalable', 'B2B / B2C'],
    },
    {
      num: '03',
      title: 'E-commerce',
      description:
        'Complete stores: catalog, cart, payments, shipping, and tools for your team.',
      tags: ['Catalog', 'Checkout', 'Operations'],
    },
    {
      num: '04',
      title: 'CRM and platforms',
      description:
        'Custom systems for sales, customer service, bookings, and internal management.',
      tags: ['CRM', 'Automation', 'Portal'],
    },
  ],
  processSteps: [
    {
      step: '01',
      title: 'Discovery',
      text: 'Goals, users, scope, and product priorities.',
    },
    {
      step: '02',
      title: 'Design',
      text: 'Experience, flows, and prototype aligned with your brand.',
    },
    {
      step: '03',
      title: 'Build',
      text: 'Visible weekly deliverables until release.',
    },
    {
      step: '04',
      title: 'Launch',
      text: 'Testing, deployment, and post-launch support.',
    },
  ],
  benefits: [
    'Over 6 years launching products for companies and startups',
    'Business focus: conversion, operations, and user experience',
    'One team for design, product, and development',
    'Clear communication and phased deliverables',
  ],
  studioPillars: [
    {
      title: 'Product first',
      text: 'Every screen serves a business goal, not a loose list of features.',
    },
    {
      title: 'Editorial design',
      text: 'Clean interfaces, subtle motion, and consistent branding across web and mobile.',
    },
    {
      title: 'Commerce and payments',
      text: 'Stores, subscriptions, and online payments ready to operate.',
    },
    {
      title: 'Real operations',
      text: 'Dashboards and tools for your team to manage day-to-day work.',
    },
  ],
  stats: [
    { value: 6, suffix: '+', label: 'Years building products' },
    { value: 24, suffix: '+', label: 'Projects delivered' },
    { value: 99, suffix: '%', label: 'Production uptime' },
    { value: 12, suffix: '+', label: 'Brands and teams' },
  ],
  testimonials: [
    {
      quote:
        'They delivered a complex dashboard in record time, with a clear experience for the team.',
      author: 'Fintech team',
      role: 'Digital product',
    },
    {
      quote:
        'The new platform was stable from day one. Impeccable communication throughout the project.',
      author: 'Product lead',
      role: 'Digital agency',
    },
  ],
  faqItems: [
    {
      q: 'What types of projects do you build?',
      a: 'Websites, web apps, SaaS, e-commerce, CRM, service platforms, and mobile apps. We define scope with you based on stage and budget.',
    },
    {
      q: 'Do you work by project or in phases?',
      a: 'By project with defined scope or in phases (MVP, v2, maintenance), depending on complexity and your priorities.',
    },
    {
      q: 'Can you integrate payments, bookings, or memberships?',
      a: 'Yes. We design the full flow: registration, payment, notifications, and a panel for your team.',
    },
    {
      q: 'How long does an MVP take?',
      a: 'Between 2 and 8 weeks depending on screens, integrations, and agreed design level.',
    },
  ],
  experience: [
    {
      role: 'Collections platform',
      company: 'Financial sector',
      period: '2023 — Present',
      highlights: [
        'Centralized portal for daily operations of large teams.',
        'Scalable modules and critical flows in production.',
        'Integration with internal services and operational compliance.',
      ],
    },
    {
      role: 'Pension fund products',
      company: 'Financial services',
      period: '2023',
      highlights: [
        'Experience refresh for users and advisors.',
        'Responsive interfaces and stable production deployment.',
        'Agile work with business and QA teams.',
      ],
    },
    {
      role: 'Websites and content',
      company: 'Marketing agency',
      period: '2021 — 2022',
      highlights: [
        'Landing pages, blogs, and corporate sites focused on conversion.',
        'Fast delivery of campaigns and promotional pages.',
      ],
    },
    {
      role: 'Enterprise applications',
      company: 'Digital consultancy',
      period: '2021 — 2022',
      highlights: [
        'Internal portals and tools for operational teams.',
        'Performance optimization and mobile experience.',
      ],
    },
    {
      role: 'Digital presence',
      company: 'Brokerage firm',
      period: '2020 — 2021',
      highlights: [
        'Responsive sites and web identity refresh.',
        'Content aligned with regulation and brand.',
      ],
    },
    {
      role: 'Corporate website',
      company: 'Retail banking',
      period: '2019 — 2020',
      highlights: [
        'Responsive layout and traffic measurement.',
        'Coordination with design and content teams.',
      ],
    },
  ],
  projectDeliverables: [
    {
      tag: 'SaaS',
      title: 'Platforms and web apps',
      description:
        'Products with role-based access, admin panels, business flows, and scalability from the first release.',
      outcomes: ['Onboarding', 'Dashboards', 'Multi-tenant', 'Launch'],
    },
    {
      tag: 'E-commerce',
      title: 'Online stores',
      description:
        'Catalog, cart, checkout, and shopping experience designed to convert on mobile and desktop.',
      outcomes: ['Catalog', 'Checkout', 'Promotions', 'Operations'],
    },
    {
      tag: 'Retail',
      title: 'Operational e-commerce',
      description:
        'Inventory, orders, shipping, and a panel for your team without relying on spreadsheets.',
      outcomes: ['Orders', 'Inventory', 'Reports', 'Support'],
    },
    {
      tag: 'Mobile',
      title: 'Mobile apps',
      description:
        'Native or hybrid experiences connected to your product: bookings, memberships, field service, and more.',
      outcomes: ['iOS / Android', 'Notifications', 'Offline-first', 'Stores'],
    },
    {
      tag: 'Payments',
      title: 'Payments and subscriptions',
      description:
        'Online billing, recurring plans, and secure flows integrated into your operations.',
      outcomes: ['Checkout', 'Subscriptions', 'Invoicing', 'Reconciliation'],
    },
    {
      tag: 'Services',
      title: 'CRM and service platforms',
      description:
        'Scheduling, clients, quotes, and tracking for sales and operations teams.',
      outcomes: ['Pipeline', 'Automation', 'Client portal', 'Integrations'],
    },
  ],
  contact: {
    form: {
      nameLabel: 'Name',
      namePlaceholder: 'Your name or company',
      phoneLabel: 'Phone',
      phonePlaceholder: '10 digits',
      emailLabel: 'Email',
      emailPlaceholder: 'you@email.com',
      messageLabel: 'Message',
      messagePlaceholder:
        'What product do you need? (web app, store, CRM, mobile app…) Timeline and goals.',
      submit: 'Send message',
      submitting: 'Sending…',
      successTitle: 'Message sent',
      successMessage: 'We received your request. We will contact you within 24 hours.',
      errorTitle: 'Could not send',
      submitError: 'Error sending message',
    },
    validation: {
      nameRequired: 'Enter your name.',
      nameMaxLength: 'Name cannot exceed 50 characters.',
      nameInvalidChars:
        'Name can only include letters, numbers, spaces, period, hyphen, and apostrophe.',
      emailRequired: 'Enter your email.',
      emailMaxLength: 'Email cannot exceed 50 characters.',
      emailInvalidChars: 'Email can only include letters, numbers, and @ . _ - +',
      emailInvalid: 'Enter a valid email address.',
      phoneRequired: 'Enter your phone number.',
      phoneInvalid: 'Phone number must be exactly 10 numeric digits.',
      messageRequired: 'Enter your message.',
      messageMaxLength: 'Message cannot exceed 2000 characters.',
      messageInvalidChars: 'Message contains disallowed characters.',
    },
  },
  footer: {
    tagline: 'Digital product agency',
  },
  demos: {
    liveFeed: {
      title: 'Real-time leads',
      hint: 'Demo view — real messages appear when the contact form is submitted',
    },
    metricCounter: {
      liveData: 'Live data',
      demoView: 'Demo view',
      projects: 'Projects',
      clients: 'Clients',
      uptime: 'Uptime',
    },
  },
  preloader: {},
}

export default messages
