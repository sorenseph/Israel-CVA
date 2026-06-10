import { createApp } from 'vue'
import './styles/main.scss'
import 'lenis/dist/lenis.css'
import App from './App.vue'
import { applySeo } from './lib/apply-seo'
import { initGsap } from './lib/gsap-setup'
import { createI18n } from './i18n'

initGsap()
applySeo()
createApp(App).use(createI18n()).mount('#app')
