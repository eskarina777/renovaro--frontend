import './assets/main.css'
import { useAuthStore } from '@/stores/authStore'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { openSocket } from './lib/websocketService'
import App from './App.vue'
import router from './router'

const app = createApp(App)
export const pinia = createPinia()
app.use(pinia)
app.use(router)

const authStore = useAuthStore()
await authStore.hydrate()
if (authStore.accessToken) {
  openSocket(authStore.accessToken)
}
app.mount('#app')
