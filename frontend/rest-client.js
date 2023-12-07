import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './components/App.js'

import RoomsView from './views/RoomsView.js'
import GuestsView from './views/GuestsView.js'

const routes = [
    { path: "/", redirect: "/guests" },
    { path: "/guests", component: GuestsView },
    { path: "/rooms", component: RoomsView }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const app = createApp(App)

app.use(router)

app.config.globalProperties.API_URL = 'http://localhost:8080'
app.mount('#app')