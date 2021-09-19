import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 异步组件
const Home = () => import('../views/home')
const Blog = () => import('../views/blog')

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
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/blog",
    name: "blog",
    component: Blog
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
