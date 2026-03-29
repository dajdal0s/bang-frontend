import Vue from 'vue'
import App from './App.vue'
import Notifications from 'vue-notification'
import VueClipboard from 'vue-clipboard2'

import './registerServiceWorker'

import store from './store'
import router from './router'

import './assets/css/main.scss'
import './assets/css/animations.scss'
import './assets/css/notifications.scss'

Vue.config.productionTip = false

Vue.use(Notifications)
Vue.use(VueClipboard)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')