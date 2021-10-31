<template>
  <main
    class="article-wrapper"
    ref="article"
    v-infinite-scroll="doLoadMore"
    infinite-scroll-distance="200"
    infinite-scroll-immediate-check="false"
  >
    <el-skeleton class="skeleton-wrapper" animated v-if="isSkeleton" :count="3">
      <template slot="template">
        <div class="skeleton">
          <el-skeleton-item
            class="skeleton-item"
            variant="text"
            v-for="(itemm, index) in 6"
            :key="index"
          />
        </div>
      </template>
    </el-skeleton>

    <article class="content" v-if="!isSkeleton && articelInfo.list.length">
      <section class="item" v-for="item in articelInfo.list">
        <div class="title" :title="item.title">
          {{ item.title }}
        </div>
        <div class="info">
          <div class="info-item">
            <i class="iconfont icon-icon-"></i>
            <span> {{ timeFormat(item.create_time) }}</span>
          </div>
          <div class="info-item">
            <i class="iconfont icon-gengxin"></i>
            <span> {{ timeFormat(item.update_time) }}</span>
          </div>
          <div class="tag-content info-item" v-if="item.tag.length">
            <i class="iconfont icon-biaoqian2"></i>
            <span v-for="tag in item.tag" class="tag">{{ tag }}</span>
          </div>
        </div>
        <div class="abstract">
          <p class="text">{{ item.abs }}</p>
        </div>
        <div class="cover" v-if="item.cover">
          <el-image lazy :src="$imgPrefix + item.cover" fit="cover"> </el-image>
        </div>
        <div class="read-btn">
          <div class="btn" @click="gotoDetail(item.id)">
            <span>阅读全文</span>
          </div>
        </div>
      </section>
    </article>

    <empty-state v-if="!isSkeleton && !articelInfo.list.length"></empty-state>

    <back-top targets=".article-wrapper" :visibilityHeight="1500"> </back-top>
  </main>
</template>
 
<script>
import EmptyState from "@/components/mine/common/empty-state/EmptyState";
import BackTop from "@/components/mine/common/back-top/BackTop.vue";
import { articleListQuery } from "@/api/module/blog";

export default {
  components: {
    EmptyState,
    BackTop,
  },
  props: ["category"],
  data() {
    return {
      // 控制骨架屏
      isSkeleton: true,
      scrollTop: "",

      articelInfo: {
        list: [],
        count: 0,
        pageNum: 1,
        pageSize: 10,
      },
      // 组件切换缓存信息
      articelCacheInfo: {
        list: [],
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  watch: {
    // 获取到分类再填充数据
    category: function (newCategory, oldCategory) {
      this.initHandle();
      console.log(newCategory, oldCategory);
    },
  },

  created() {
    function swapData(obj, newobj) {}
  },

  mounted() {
    this.$refs.article.addEventListener("scroll", this.getCacheScrollTop, true);
  },

  activated() {
    console.log("a");
    this.articelInfo.list = this.articelCacheInfo.list;
    this.articelInfo.pageNum = this.articelCacheInfo.pageNum;
    this.articelInfo.pageSize = this.articelCacheInfo.pageSize;
    this.$refs.article.scrollTo(0, this.scrollTop);
  },

  deactivated() {
    this.articelCacheInfo.list = this.articelInfo.list;
    this.articelCacheInfo.pageNum = this.articelInfo.pageNum;
    this.articelCacheInfo.pageSize = this.articelInfo.pageSize;
  },
  methods: {
    getCacheScrollTop(e) {
      this.scrollTop = e.target.scrollTop;
    },

    async doArticleListQuery() {
      const articleList = await articleListQuery(
        this.category,
        this.articelInfo.pageNum,
        this.articelInfo.pageSize
      );
      return articleList;
    },

    async initHandle() {
      //重置页码
      this.articelInfo.pageNum = 1;
      // console.log(this.scrollTop);

      // console.dir(this.$refs.article);
      //获取文章列表数据

      const articleList = await this.doArticleListQuery();
      this.articelInfo.list = articleList.rows;
      this.articelInfo.count = articleList.count;
      this.$refs.article.scrollTo(0, 0);
      //300ms后关闭骨架屏
      setTimeout(() => {
        this.isSkeleton = false;
      }, 300);
    },

    async doLoadMore() {
      let pageNum = this.articelInfo.pageNum;
      let maxPageNum = Math.ceil(
        this.articelInfo.count / this.articelInfo.pageSize
      );
      if (pageNum < maxPageNum) {
        this.articelInfo.pageNum += 1;
        const moreArticleList = await this.doArticleListQuery();
        this.articelInfo.list.push(...moreArticleList.rows);
      }
    },

    timeFormat(timeStr) {
      return timeStr.substr(0, 10);
    },
    gotoDetail(articleID) {
      // let detail = this.$router.push({ path: `/detail/${articleID}` });
      // window.open(detail.href, "_blank");
      this.$router.push({ path: `/detail/${articleID}` });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
@import "~components/import/element-ui/css/views/blog/article/image.scss";
</style>