import horizontal from './horizontal.vue'
import vertical from './vertical.vue'

function install (vm) {
  vm.component(horizontal.name, horizontal)
  vm.component(vertical.name, vertical)
}

if (typeof window !== 'undefined' && window.Vue) install(window.Vue);

export default {
  install
}