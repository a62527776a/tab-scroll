import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

import tabScroll from '../src/index'
// import tabScroll from 'tab-scroll'

import demo1 from './demo1.vue'
import demo2 from './demo2.vue'
import demo2X from './demo2X.vue'
import demo3 from './demo3.vue'
import fetchData from './fetchData.vue'
import refreshLoadmore from './refresh&loadmore'

const routes = [
  {path: '/demo1', component: demo1},
  {path: '/demo2', component: demo2},
  {path: '/demo2x', component: demo2X},
  {path: '/demo3', component: demo3},
  {path: '/fetchData', component: fetchData},
  {path: '/refresh&loadmore', component: refreshLoadmore}
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