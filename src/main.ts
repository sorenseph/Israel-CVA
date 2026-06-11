import { createApp } from 'vue'
import './styles/main.scss'
import 'lenis/dist/lenis.css'
import App from './App.vue'
import router from './router'
import { applyDefaultSeo } from './lib/page-seo'
import { createI18n } from './i18n'

applyDefaultSeo()
createApp(App).use(createI18n()).use(router).mount('#app')
