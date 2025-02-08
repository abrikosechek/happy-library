import { createApp } from 'vue'
import router from "./router"
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/styles/main.scss'

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
