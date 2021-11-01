<template>
  <div class="wrapper">
    <div class="content">
      <header class="header" :class="{ 'header-active': headerActive }">
        <div class="header-inner">
          <div class="block">
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
                @visible-change="a"
                @change="cacheHandler(), headerSwitch()"
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
                <span>{{ total.articleCount }}</span>
                <p>总文章数</p>
              </div>
              <div class="total-item browseTotal">
                <span>{{ total.views }}</span>
                <p>总阅读数</p>
              </div>
            </div>
          </div>
          <div class="block">
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
                <el-popover placement="top-start" trigger="click">
                  <img
                    src="@/assets/img/contact/weChatQR.png"
                    class="weChatQR"
                  />
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
          </div>
        </div>
      </header>
      <div class="blog">
        <keep-alive>
          <router-view :category="currentCategory" class="publicWrapper" ref="blog" />
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import { articleCategoryQuery } from "@/api/module/blog";
import anime from "animejs";
export default {
  data() {
    return {
      //头部控制：布局
      headerActive: false,
      //总文章分类
      articleCategory: [],
      //当前文章分类
      currentCategory: 0,
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
      total: {
        articleCount: 0,
        views: 0,
      },
    };
  },

  computed: {
    //缓存的分类
    cacheCategory() {
      return window.localStorage.getItem("currentCategory");
    },
  },

  created() {
    //获取文章分类并设置默认分类
    this.getAllCategory().then(() => {
      this.getTotalData();
    });
  },

  mounted() {
    // 监听浏览器窗口大小
    this.listenerWindowResize();
  },

  methods: {
    a(r) {
      // 下拉框显示时，通知子组件记录数据
      if (r) {
        this.$refs.blog.cacheCateInfo()
      }
    },
    async getAllCategory() {
      //没做登录，写死userID:8
      const category = await articleCategoryQuery("8");
      this.articleCategory = category;
      //判断是否有缓存的分类:没有则默认为第一项
      let defaultCategory = this.cacheCategory
        ? Number(this.cacheCategory)
        : category[0].id;
      this.currentCategory = defaultCategory;
    },

    getTotalData() {
      let articleCount = 0;
      this.articleCategory.forEach((item) => {
        articleCount += item.blogs.length;
      });
      anime({
        targets: this.$data.total,
        articleCount: articleCount,
        views: 1530,
        duration: 2000,
        round: 1,
        easing: "easeOutQuint",
      });
    },

    cacheHandler() {
      window.localStorage.setItem("currentCategory", this.currentCategory);
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