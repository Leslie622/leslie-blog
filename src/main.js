import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

Vue.config.productionTip = false

// ElementUI-按需引入
import "@/components/import/element-ui/index"

//element 无限滚动
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

//animate css动画库
import 'animate.css'

//图片地址
Vue.prototype.$imgPrefix = 'https://mdw.oss-cn-hangzhou.aliyuncs.com/';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

