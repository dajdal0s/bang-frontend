import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from './views/Home'
import Game from './views/Game'
import EnterCode from './views/EnterCode'

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      name: 'home'
    },
    {
      path: '/rooms/:id',
      component: Game,
      name: 'game'
    },
    {
      path: '/code/:link?',
      component: EnterCode,
      name: 'enterCode'
    }
  ],
  mode: 'history',
  linkActiveClass: 'active'
})