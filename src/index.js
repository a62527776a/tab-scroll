import horizontal from './horizontal.vue'
import vertical from './vertical.vue'

const install = (vm) => {
  vm.component(horizontal.name, horizontal)
  vm.component(vertical.name, vertical)
}

export default {
  install
}
