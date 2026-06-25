import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLocale } from '../i18n'
import { deliverableMeta } from '../data/cv'
import { isValidSimulatorSlug } from '../data/simulator-slugs'
import { simulatorOgImages } from '../data/seo-assets'
import { applyPageSeo } from '../lib/page-seo'
import { buildPageStructuredData } from '../lib/seo-build'
import { resolveSiteUrl } from '../data/seo'

export function useSyncPageSeo() {
  const route = useRoute()
  const { locale, messages } = useLocale()

  watch(
    [() => route.name, () => route.params.slug, locale, messages],
    () => {
      const seoMsg = messages.value.seo
      const siteUrl = resolveSiteUrl()
      const slug = typeof route.params.slug === 'string' ? route.params.slug : undefined

      if (route.name === 'demo') {
        const title = `${seoMsg.demoTitle} | ${seoMsg.siteName}`
        applyPageSeo({
          title,
          description: seoMsg.demoDescription,
          keywords: seoMsg.keywords,
          path: '/demo',
          locale: locale.value,
          structuredData: buildPageStructuredData({
            siteUrl,
            locale: locale.value,
            page: 'demo',
            path: '/demo',
            title,
            description: seoMsg.demoDescription,
            faqItems: messages.value.faqItems,
          }),
        })
        return
      }

      if (route.name === 'simulator' && slug && isValidSimulatorSlug(slug)) {
        const idx = deliverableMeta.findIndex((item) => item.slug === slug)
        if (idx < 0) return
        const deliverable = messages.value.projectDeliverables[idx]
        const title = `${deliverable.title} — ${seoMsg.simulatorPreview} | ${seoMsg.siteName}`
        const description = `${deliverable.description} ${seoMsg.simulatorDetail}`

        applyPageSeo({
          title,
          description,
          keywords: seoMsg.keywords,
          path: `/explorar/${slug}`,
          locale: locale.value,
          imagePath: simulatorOgImages[slug],
          imageAlt: `${deliverable.title} — ${seoMsg.siteName}`,
          structuredData: buildPageStructuredData({
            siteUrl,
            locale: locale.value,
            page: 'simulator',
            path: `/explorar/${slug}`,
            title,
            description,
            breadcrumbLabels: {
              home: seoMsg.breadcrumbHome,
              explore: seoMsg.breadcrumbExplore,
              current: deliverable.title,
            },
            faqItems: messages.value.faqItems,
          }),
        })
        return
      }

      applyPageSeo({
        title: `${seoMsg.homeTitle} | ${seoMsg.titleSuffix}`,
        description: seoMsg.homeDescription,
        keywords: seoMsg.keywords,
        path: '/',
        locale: locale.value,
        structuredData: buildPageStructuredData({
          siteUrl,
          locale: locale.value,
          page: 'home',
          path: '/',
          title: `${seoMsg.homeTitle} | ${seoMsg.titleSuffix}`,
          description: seoMsg.homeDescription,
          faqItems: messages.value.faqItems,
        }),
      })
    },
    { immediate: true },
  )
}
