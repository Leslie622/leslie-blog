<template>
  <div class="wrapper">
    <div class="content">
      <header class="header" :class="{ 'header-active': headerActive }">
        <div class="header-inner">
          <div class="header-switch">
            <div class="switch" @click="headerSwitch">
              <div>
                <span class="Switchicon"></span>
                <span class="Switchicon"></span>
                <span class="Switchicon"></span>
              </div>
            </div>
            <div class="brand">LESLIE BLOG</div>
          </div>
          <div class="articleCate-select">
            <el-select
              class="articleSelect"
              v-model="currentCategory"
              @change="
                categorySwitch(currentCategory);
                headerSwitch();
              "
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
            <div class="articleTotal">
              <span>12</span>
              <p>总文章数</p>
            </div>
            <div class="browseTotal">
              <span>153</span>
              <p>总阅读数</p>
            </div>
          </div>
        </div>
      </header>
      <div class="blog">
        <aside class="blog-side">
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
                <i class="iconfont icon-csdn"></i
              ></a>
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
                <i class="iconfont icon-ziyuan"></i
              ></a>
            </div>
          </div>
        </aside>
        <keep-alive>
          <router-view
            :articleList="currentArticleList"
            :isSkeleton="isSkeleton"
          ></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
 
<script>
import { articleCategoryQuery, articleListQuery } from "@/api/module/blog";

export default {
  data() {
    return {
      headerActive: false,
      articleCategory: [],
      currentCategory: "",
      currentArticleList: [],
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
      //控制子组件骨架屏
      isSkeleton: true,
    };
  },

  created() {
    //获取文章分类并设置默认分类
    this.getArticleCategory().then(() => {
      setTimeout(() => {
        this.isSkeleton = false;
      }, 500);
    });
  },
  mounted() {
    //监听浏览器窗口大小
    this.listenerWindowResize();
  },

  methods: {
    async getArticleCategory() {
      const category = await articleCategoryQuery("8");
      this.articleCategory = category;
      //获取当前分类（默认第一项）和该分类文章列表
      //无缓存
      if (window.localStorage.getItem("currentCategory") === null) {
        this.currentCategory = category[0].id;
      } else {
        //有缓存
        this.currentCategory = Number(
          window.localStorage.getItem("currentCategory")
        );
      }
      this.categorySwitch(this.currentCategory);
    },

    async categorySwitch(currentCategory) {
      //缓存
      window.localStorage.setItem("currentCategory", currentCategory);
      const articleList = await articleListQuery(currentCategory);
      this.currentArticleList = articleList.rows;
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
</style>