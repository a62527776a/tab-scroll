import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

import tabScroll from '../src/index'
// import tabScroll from 'tab-scroll'

import demo1 from './demo1.vue'
import demo2 from './demo2.vue'

const routes = [
  {path: '/demo1', component: demo1},
  {path: '/demo2', component: demo2}
]

const router = new VueRouter({
  routes
})

Vue.use(tabScroll)
Vue.use(VueRouter)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')