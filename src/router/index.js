import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 异步组件
const Home = () => import('@/views/home')
const Blog = () => import('@/views/blog')
const BlogMain = () => import('@/views/blog/components/blog-main/BlogMain.vue')
const BlogArchive = () => import('@/views/blog/components/blog-archive/BlogArchive.vue')
const Detail = () => import('@/views/detail/index.vue')

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
    component: Blog,
    children: [
      {
        path: "/blogMain",
        name: "blogMain",
        component: BlogMain
      },
      {
        path: "/blogArchive",
        name: "blogArchive",
        component: BlogArchive
      }
    ],
    redirect:"/blogMain"
  },
  {
    path:"/detail/:articleID",
    name:"detail",
    component:Detail,
    props:true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
