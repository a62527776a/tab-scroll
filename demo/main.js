import Vue from 'vue'
import App from './App.vue'

import tabScroll from '../src/index'
// import tabScroll from 'tab-scroll'

Vue.use(tabScroll)

new Vue({
  render: h => h(App)
}).$mount('#app')