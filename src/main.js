import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// ElementUI-按需引入
import "./components/element-ui/index"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
