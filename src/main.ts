import { createApp } from 'vue'
import './styles/main.scss'
import 'lenis/dist/lenis.css'
import App from './App.vue'
import { applySeo } from './lib/apply-seo'
import { initGsap } from './lib/gsap-setup'

initGsap()
applySeo()
createApp(App).mount('#app')
