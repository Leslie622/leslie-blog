import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Home = () => import('@/views/home')
const Blog = () => import('@/views/blog')
const BlogArticle = () => import('@/views/blog/components/article/BlogArticle.vue')
const BlogArchive = () => import('@/views/blog/components/archive/BlogArchive.vue')
const Detail = () => import('@/views/detail/index.vue')
const Page404 = () => import('@/views/common/page404/index.vue')

const routes = [
  {
    path: "/",
    redirect: "/Home"
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta:{
      title:"LeslieBlog"
    }
  },
  {
    path: "/blog",
    name: "blog",
    component: Blog,
    meta:{
      title:"blog"
    },
    children: [
      {
        path: "/blogMain",
        name: "blogMain",
        component: BlogArticle,
        meta:{
          title:"Article"
        },
      },
      {
        path: "/blogArchive",
        name: "blogArchive",
        component: BlogArchive,
        meta:{
          title:"Archive"
        },
      }
    ],
    redirect:"/blogMain"
  },
  {
    path:"/detail/:articleID",
    name:"detail",
    component:Detail,
    meta:{
      title:"Detail"
    },
    props:true
  },
  {
    path: "/page404",
    name: "page404",
    component: Page404,
    meta:{
      title:"404"
    },
  },
  {
    path: "*",
    redirect: "/Page404"
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
      document.title = to.meta.title
  }
  next()
})

export default router
