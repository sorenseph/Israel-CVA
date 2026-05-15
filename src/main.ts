import { createApp } from 'vue'
import './styles/main.scss'
import App from './App.vue'
import { applySeo } from './lib/apply-seo'

applySeo()
createApp(App).mount('#app')
