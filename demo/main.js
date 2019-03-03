import Vue from 'vue'
import App from './App.vue'

import tabScroll from '../src/index'

Vue.use(tabScroll)

new Vue({
  render: h => h(App)
}).$mount('#app')