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
            <div class="brand">
              <p>LESLIE BLOG</p>
            </div>
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
          <router-view
            ref="blogView"
            :articleList="currentArticleList"
            :isSkeleton="isSkeleton"
            v-infinite-scroll="doLoadMore"
            infinite-scroll-immediate-check="false"
            infinite-scroll-distance="10"
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
      currentArticleCount: 0,
      pageNum: 1,
      pageSize: 10,
      isChange: false,
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

  computed: {
    cacheCategory() {
      return window.localStorage.getItem("currentCategory");
    },
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
      //没做登录，只能写死userID
      const category = await articleCategoryQuery("8");
      this.articleCategory = category;
      //判断有无分类缓存
      this.currentCategory = this.cacheCategory
        ? Number(this.cacheCategory)
        : category[0].id;
      //切换到该分类
      this.categorySwitch(this.currentCategory);
    },

    async categorySwitch(currentCategory) {
      //回到顶部
      this.$refs.blogView.$el.scrollTo(0, 0);
      //缓存当前选择的分类
      window.localStorage.setItem("currentCategory", currentCategory);
      //初始化页数
      this.pageNum = 1;
      //获取该分类数据
      const articleList = await articleListQuery(
        currentCategory,
        this.pageNum,
        this.pageSize
      );
      //获取该分类文章总数
      this.currentArticleCount = articleList.count;
      this.currentArticleList = articleList.rows;
    },

    async LoadMore() {
      const articleList = await articleListQuery(
        this.currentCategory,
        this.pageNum,
        this.pageSize
      );
      this.currentArticleList.push(...articleList.rows);
    },

    //无限滚动加载更多
    doLoadMore() {
      console.log("b");
      let pageNum = this.pageNum;
      let maxPageNum = Math.ceil(this.currentArticleCount / this.pageSize);
      //是否达到最大页数
      if (pageNum < maxPageNum) {
        console.log("a");
        this.pageNum += 1;
        this.LoadMore();
      }
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