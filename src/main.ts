import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import { createPersistedState } from 'pinia-plugin-persistedstate'

import App from './App.vue'
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()
pinia.use(createPersistedState())

app.use(pinia)
app.use(router)

app.mount('#app')
