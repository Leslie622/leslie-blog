<template>
  <div class="wrapper">
    <div class="content">
      <header class="header" :class="{ 'header-active': headerActive }">
        <div class="header-inner">
          <div class="switch">
            <div class="switch-btn" @click="headerSwitch">
              <div>
                <span class="Switchicon"></span>
                <span class="Switchicon"></span>
                <span class="Switchicon"></span>
              </div>
            </div>
            <div class="brand">
              <p>LESLIE BLOG</p>
            </div>
          </div>
          <div class="category-select">
            <el-select
              class="select"
              v-model="currentCategory"
              @change="headerSwitch()"
            >
              <el-option
                v-for="item in articleCategory"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <ul class="nav">
            <li
              v-for="(item, index) in linkList"
              :key="index"
              @click="headerSwitch"
            >
              <router-link :to="item.path" class="navItem">
                <i :class="item.iconClass"></i>{{ item.value }}</router-link
              >
            </li>
          </ul>
          <div class="total">
            <div class="total-item articleTotal">
              <span>12</span>
              <p>总文章数</p>
            </div>
            <div class="total-item browseTotal">
              <span>153</span>
              <p>总阅读数</p>
            </div>
          </div>
        </div>
      </header>
      <div class="blog">
        <aside class="sidebar">
          <div class="avatar">
            <img src="@/assets/img/avatar/avatar.jpg" />
          </div>
          <div class="motto">
            <p>何时眼前突兀见此屋</p>
          </div>
          <div class="links-of-author">
            <div>
              <a
                href="https://juejin.cn/user/2445792949308264"
                target="_blank"
                title="我的掘金主页"
              >
                <i class="iconfont icon-juejin1"></i>
              </a>
            </div>
            <div>
              <a
                href="https://blog.csdn.net/LeslieCheung_?spm=1001.2014.3001.5113"
                target="_blank"
                title="我的CSDN主页"
              >
                <i class="iconfont icon-csdn"></i>
              </a>
            </div>
            <div>
              <el-popover placement="top-start" trigger="hover">
                <img src="@/assets/img/contact/weChatQR.png" class="weChatQR" />
                <i class="iconfont icon-weixin" slot="reference"></i>
              </el-popover>
            </div>
            <div>
              <a
                target="_blank"
                href="http://wpa.qq.com/msgrd?v=3&uin=416317444&site=qq&menu=yes"
                title="使用QQ联系我"
              >
                <i class="iconfont icon-ziyuan"></i>
              </a>
            </div>
          </div>
        </aside>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
 
<script>
import { articleCategoryQuery } from "@/api/module/blog";

export default {
  data() {
    return {
      //头部控制：布局
      headerActive: false,
      //总文章分类
      articleCategory: [],
      //路由
      linkList: [
        { path: "/home", value: "主页", iconClass: "iconfont icon-zhuye-copy" },
        {
          path: "/blogMain",
          value: "文章",
          iconClass: "iconfont icon-wenzhang",
        },
        {
          path: "/blogArchive",
          value: "归档",
          iconClass: "iconfont icon-guidang",
        },
      ],
    };
  },

  computed: {
    //缓存的分类
    cacheCategory() {
      return window.localStorage.getItem("currentCategory");
    },
    //当前文章分类
    currentCategory: {
      get: function () {
        return this.$store.state.blog.category;
      },
      set: function (newCategory) {
        this.$store.commit("setCurrentCategory", newCategory);
        window.localStorage.setItem("currentCategory", newCategory);
      },
    },
  },

  created() {
    //获取文章分类并设置默认分类
    this.getArticleCategory();
  },

  mounted() {
    // 监听浏览器窗口大小
    this.listenerWindowResize();
  },

  methods: {
    async getArticleCategory() {
      //没做登录，只能写死userID
      const category = await articleCategoryQuery("8");
      this.articleCategory = category;
      //判断是否有缓存的分类:没有则默认为第一项
      let defaultCategory = this.cacheCategory
        ? Number(this.cacheCategory)
        : category[0].id;
      this.$store.commit("setCurrentCategory", defaultCategory);
    },

    headerSwitch() {
      this.headerActive = !this.headerActive;
    },

    listenerWindowResize() {
      window.addEventListener("resize", (res) => {
        //浏览器宽度大于1024px时,自动收缩头部
        if (res.currentTarget.innerWidth > 1024) {
          this.headerActive = false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
@import "~components/import/element-ui/css/views/blog/header-select.scss";
</style>