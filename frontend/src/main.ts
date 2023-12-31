import './assets/main.css'
import "bootstrap/dist/css/bootstrap.css"

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarSolid, faStarHalfStroke, faCartShopping } from '@fortawesome/free-solid-svg-icons'

library.add(
  faStarRegular,
  faStarSolid,
  faStarHalfStroke,
  faCartShopping
  )

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
