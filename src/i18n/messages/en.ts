import type { Messages } from '../types'

const messages: Messages = {
  nav: {
    links: [
      { id: 'inicio', label: 'Home' },
      { id: 'proyectos', label: 'Projects' },
      { id: 'demos', label: 'Demos', href: '/demo' },
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
    heroLead: 'Digital products for businesses ready to grow.',
    heroPitch:
      'More customers and automation for your business — from idea to launch with one team.',
  },
  hero: {
    dropTaglines: [
      'More customers. Less manual work.',
      'Automation that scales your business.',
    ],
    startProject: 'Start a project',
    viewDemos: 'View demos',
  },
  sections: {
    showcase: {
      label: 'Interactive demo',
      title: 'This is what a live product looks like',
      subtitle:
        'Explore store, checkout, dashboard, and CRM in a single demo environment.',
      ctaPrimary: 'I want something like this',
      ctaSecondary: 'View project types',
      enterDemo: 'Open interactive demo',
      teaserHint: 'Store, checkout, dashboard, and CRM — interactive, right in your browser.',
    },
    deliverables: {
      label: 'Projects',
      title: 'What we can build with you',
      subtitle:
        'Explore each product type in an interactive simulator — navigate as if it were already live.',
      exploreCta: 'Explore simulator',
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
    payment: {
      title: 'Secure payment',
      total: 'Total',
      cardNumber: 'Card number',
      expiry: 'Expiry',
      cvv: 'CVV',
      pay: 'Pay',
      processing: 'Processing payment…',
      success: 'Payment confirmed!',
      successDetail: 'You will receive confirmation by email',
      cancel: 'Cancel',
    },
    auth: {
      title: 'Client access',
      email: 'Email',
      emailPlaceholder: 'you@company.com',
      password: 'Password',
      passwordPlaceholder: '••••••••',
      continue: 'Continue',
      login: 'Sign in',
      verifying: 'Verifying credentials…',
      sessionActive: 'Active session',
      logout: 'Sign out',
    },
    studio: {
      tabs: [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'store', label: 'Store' },
        { id: 'crm', label: 'CRM Live' },
      ],
      searchPlaceholder: 'Search products, clients, orders…',
      headerSubtitle: 'Store, dashboard, and CRM preview in one product',
      preview: 'Preview',
      live: 'Live',
      notifications: 'Notifications',
      cart: 'Cart',
      revenueChart: 'Revenue · last 12 months',
      recentOrders: 'Recent orders',
      orders: [
        { id: '#1842', amount: '$127', status: 'Completed' },
        { id: '#1841', amount: '$49', status: 'In transit' },
        { id: '#1840', amount: '$99', status: 'Processing' },
      ],
      pipeline: [
        { stage: 'Brief', count: 3 },
        { stage: 'Design', count: 5 },
        { stage: 'Dev', count: 8 },
        { stage: 'Deploy', count: 4 },
      ],
    },
    cart: {
      catalog: 'Catalog',
      cart: 'Cart',
      empty: 'Your cart is empty — add a product',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      freeShipping: 'Free',
      total: 'Total',
      checkout: 'Checkout',
      add: '+ Add',
      orderConfirmed: 'Order confirmed!',
      orderConfirmedDetail: 'You will receive confirmation by email.',
      newPurchase: 'New purchase',
    },
    checkout: {
      label: 'Demo · Subscription',
      planPro: 'Pro · $999/mo',
      planTeam: 'Team · $1,899/mo',
      success: 'Subscription active · invoice sent',
    },
    store: {
      products: [
        { name: 'Natural care kit', tag: 'Bestseller' },
        { name: 'Premium branding set', tag: 'New' },
        { name: 'Daily facial routine', tag: 'Popular' },
        { name: "Men's collection", tag: 'Limited edition' },
        { name: 'Serum + artisan soap', tag: 'Sale' },
      ],
    },
    crm: {
      activity: 'System activity',
      stages: [
        { name: 'New', value: '$48k', count: 12 },
        { name: 'Qualified', value: '$62k', count: 8 },
        { name: 'Proposal', value: '$91k', count: 5 },
        { name: 'Closed', value: '$120k', count: 3 },
      ],
      leads: [
        { name: 'María González', company: 'Nova Retail', value: '$12,400' },
        { name: 'Roberto Silva', company: 'FinLab', value: '$8,900' },
        { name: 'Elena Martínez', company: 'Studio Bloom', value: '$15,200' },
      ],
      calendar: [
        { day: 'Mon', slots: ['10:00 Demo', '3:00 PM Follow-up'] },
        { day: 'Tue', slots: ['11:30 Call'] },
        { day: 'Wed', slots: ['9:00 AM Kickoff', '5:00 PM Close'] },
      ],
      notifications: [
        { text: 'New lead from landing', time: '5m ago' },
        { text: 'Payment confirmed at checkout', time: '12m ago' },
        { text: 'Order #1842 shipped', time: '18m ago' },
      ],
      mockLeads: [
        { name: 'María G.', message: 'I need a web app for my startup' },
        { name: 'Carlos R.', message: 'Online store with order dashboard' },
      ],
    },
    team: [
      { name: 'Ana R.', role: 'Admin', active: true },
      { name: 'Luis M.', role: 'Operations', active: true },
      { name: 'Sofía T.', role: 'Support', active: false },
      { name: 'Carlos V.', role: 'Sales', active: true },
    ],
  },
  seo: {
    siteName: 'Studio ICVA',
    homeTitle: 'Studio ICVA',
    titleSuffix: 'Digital product agency',
    homeDescription:
      'Studio ICVA — digital product agency. Websites, web apps, SaaS, e-commerce, CRM, service platforms, and custom mobile apps. From idea to launch with one team.',
    keywords:
      'web development agency, web apps, SaaS Mexico, e-commerce Mexico, custom CRM, mobile apps, digital platforms, Studio ICVA, digital products',
    defaultImageAlt: 'Studio ICVA — digital product agency',
    simulatorPreview: 'Interactive preview',
    simulatorDetail: 'Explore a functional product demo.',
    breadcrumbHome: 'Home',
    breadcrumbExplore: 'Projects',
    demoTitle: 'Interactive demo',
    demoDescription:
      'Explore store, checkout, dashboard, and CRM in Studio ICVA’s interactive product demo.',
  },
  preloader: {},
  whatsapp: {
    aria: 'Message us on WhatsApp',
    defaultMessage: 'Hi Studio ICVA, I am interested in a digital project.',
  },
  simulators: {
    back: 'Back to site',
    preview: 'Interactive preview',
    hint: 'Browse modules as you would in a live product.',
    contactCta: 'I want this',
    webapp: {
      nav: [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'projects', label: 'Projects' },
        { id: 'users', label: 'Users' },
      ],
      revenue: 'Monthly revenue',
      activity: 'Recent activity',
      events: [
        'New customer registered — 3 min ago',
        'Report exported — 18 min ago',
        'Payments module enabled — 1 h ago',
      ],
      projectsTitle: 'Projects in progress',
      usersTitle: 'Team and access',
      projects: [
        { name: 'Client portal', status: 'In production', progress: 100 },
        { name: 'Reports module', status: 'In development', progress: 68 },
        { name: 'Onboarding v2', status: 'Design', progress: 34 },
      ],
      statusActive: 'Active',
      statusAway: 'Away',
    },
    tienda: {
      nav: [
        { id: 'catalog', label: 'Catalog' },
        { id: 'checkout', label: 'Checkout' },
        { id: 'promos', label: 'Promotions' },
      ],
      heroTitle: 'Your store, ready to sell',
      heroText: 'Real catalog, cart, and checkout in one flow.',
      promosTitle: 'Active coupons',
      apply: 'Apply',
      inactive: 'Inactive',
      promos: [
        { code: 'LAUNCH15', discount: '15%', active: true },
        { code: 'FREESHIP', discount: '$0 shipping', active: true },
        { code: 'VIP20', discount: '20%', active: false },
      ],
    },
    operaciones: {
      nav: [
        { id: 'orders', label: 'Orders' },
        { id: 'inventory', label: 'Inventory' },
        { id: 'reports', label: 'Reports' },
      ],
      ordersTitle: "Today's orders",
      inventoryTitle: 'Inventory',
      reportsTitle: 'Operations summary',
      units: 'units',
      lowStock: 'Low stock',
      kpiSales: 'Sales vs last month',
      kpiFulfillment: 'Orders fulfilled',
      kpiShipping: 'Shipping time',
      orders: [
        { id: '#2841', client: 'María G.', total: '$1,240', status: 'Shipped' },
        { id: '#2840', client: 'Carlos V.', total: '$890', status: 'Packing' },
        { id: '#2839', client: 'Laura P.', total: '$2,100', status: 'Paid' },
      ],
    },
    movil: {
      nav: [
        { id: 'home', label: 'Home', icon: '⌂' },
        { id: 'shop', label: 'Shop', icon: '◈' },
        { id: 'bookings', label: 'Schedule', icon: '◎' },
        { id: 'profile', label: 'Profile', icon: '◉' },
      ],
      greeting: 'Good morning',
      homeTitle: 'Your business in your pocket',
      searchPlaceholder: 'Search products, bookings…',
      featuredTitle: 'Featured',
      activityTitle: 'Recent activity',
      shopTitle: 'Catalog',
      statBookings: 'Bookings today',
      statSatisfaction: 'Satisfaction',
      ctaBook: 'Book appointment',
      bookingsTitle: "Today's schedule",
      profileRole: 'Premium account',
      notifOn: 'Notifications on',
      membership: 'Annual membership',
      offline: 'Offline mode',
      paymentMethod: 'Saved payment method',
      teamTitle: 'Your team',
      sideTitle: 'Active clients',
      sideText: 'The app connects sales, schedule, and catalog in one flow.',
      bookings: [
        { time: '10:00', title: 'Initial consultation', client: 'Roberto S.' },
        { time: '12:30', title: 'Follow-up', client: 'Elena M.' },
        { time: '16:00', title: 'Delivery', client: 'Nova Group' },
      ],
      activity: [
        { text: 'New order #2841', time: '2 min' },
        { text: 'Appointment confirmed', time: '15 min' },
        { text: 'Payment received', time: '1 h' },
      ],
      profileName: 'Ana García',
    },
    pagos: {
      nav: [
        { id: 'plans', label: 'Plans' },
        { id: 'checkout', label: 'Checkout' },
        { id: 'invoices', label: 'Invoices' },
      ],
      featureCheckout: 'Secure checkout',
      featureBilling: 'Automatic billing',
      invoicesTitle: 'Invoice history',
      invoiceColumns: {
        invoice: 'Invoice',
        amount: 'Amount',
        date: 'Date',
        status: 'Status',
      },
      plans: [
        { id: 'starter', name: 'Starter', price: '$499', period: '/mo' },
        { id: 'pro', name: 'Pro', price: '$999', period: '/mo', featured: true },
        { id: 'team', name: 'Team', price: '$1,899', period: '/mo' },
      ],
      invoices: [
        { id: 'INV-2401', amount: '$999', date: 'Jun 01', status: 'Paid' },
        { id: 'INV-2400', amount: '$999', date: 'May 01', status: 'Paid' },
        { id: 'INV-2399', amount: '$499', date: 'Apr 01', status: 'Paid' },
      ],
    },
    crm: {
      nav: [
        { id: 'pipeline', label: 'Pipeline' },
        { id: 'leads', label: 'Leads' },
        { id: 'calendar', label: 'Calendar' },
      ],
      calendarTitle: 'Current week',
    },
  },
}

export default messages
