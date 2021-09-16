import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 异步组件
const Home = () => import('../views/home/index.vue')

const routes = [
  {
    path: "*",
    redirect: "/Home"
  },
  {
    path: "",
    redirect: "/Home"
  },
  {
    path: "/Home",
    name: "home",
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
