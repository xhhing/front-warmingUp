import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// import axios from 'axios'   //引入axios网络请求

const app = createApp(App)
const pinia = createPinia()

// app.config.globalProperties.$axios = axios  //全局引入
app.use(router)
app.use(pinia)
pinia.use(piniaPluginPersistedstate)

app.mount('#app')
