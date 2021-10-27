<template>
  <main
    class="article-wrapper"
    ref="blogMain"
    v-infinite-scroll="doLoadMore"
    infinite-scroll-distance="1"
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

    <article class="content" v-if="!isSkeleton && articleList.length">
      <section class="item" v-for="item in articleList">
        <div class="title">
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

    <empty-state v-if="!isSkeleton && !articleList.length"></empty-state>
  </main>
</template>
 
<script>
import EmptyState from "@/components/mine/common/empty-state/EmptyState";
import { articleListQuery } from "@/api/module/blog";

export default {
  components: {
    EmptyState,
  },
  props: ["category"],
  data() {
    return {
      // 控制骨架屏
      isSkeleton: true,
      // 文章列表
      articleList: [],
      // 总文章数量
      articleCount: 0,
      // 页码
      pageNum: 1,
      // 页容量
      pageSize: 15,
    };
  },
  watch: {
    // 获取到分类再填充数据
    category: function () {
      this.initHandle();
    },
  },


  beforeRouteEnter(to, from, next) {
    next((vm) => {
      //获取到分类才填充数据
      if (vm.category) {
        vm.initHandle();
      }
    });
  },

  methods: {
    async doArticleListQuery() {
      const articleList = await articleListQuery(
        this.category,
        this.pageNum,
        this.pageSize
      );
      return articleList;
    },

    async initHandle() {
      //回到顶部并重置页码
      this.$refs.blogMain.scrollTo(0, 0);
      this.pageNum = 1;

      //获取文章列表数据
      const articleList = await this.doArticleListQuery();
      this.articleList = articleList.rows;
      this.articleCount = articleList.count;

      //300ms后关闭骨架屏
      setTimeout(() => {
        this.isSkeleton = false;
      }, 300);
    },

    async doLoadMore() {
      let pageNum = this.pageNum;
      let maxPageNum = Math.ceil(this.articleCount / this.pageSize);
      if (pageNum < maxPageNum) {
        this.pageNum += 1;
        const moreArticleList = await this.doArticleListQuery();
        this.articleList.push(...moreArticleList.rows);
      }
    },

    timeFormat(timeStr) {
      return timeStr.substr(0, 10);
    },
    gotoDetail(articleID) {
      let detail = this.$router.resolve({ path: `/detail/${articleID}` });
      window.open(detail.href, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
@import "~components/import/element-ui/css/views/blog/article/image.scss";
</style>