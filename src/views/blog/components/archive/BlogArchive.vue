<template>
  <main
    class="archive-wrapper"
    infinite-scroll-distance="200"
    v-infinite-scroll="doLoadMore"
    infinite-scroll-immediate-check="false"
  >
    <el-skeleton
      class="skeleton-wrapper"
      animated
      v-if="isSkeleton"
      :count="10"
    >
      <template slot="template">
        <div class="skeleton">
          <el-skeleton-item
            class="skeleton-item"
            variant="text"
            v-for="(item, index) in 2"
            :key="index"
          />
        </div>
      </template>
    </el-skeleton>

    <div class="content" v-if="!isSkeleton && articleList.length">
      <el-timeline class="filingTimeLine">
        <el-timeline-item
          v-for="(item, index) in articleList"
          :key="index"
          :timestamp="item.create_time"
        >
          <div @click="gotoDetail(item.id)">
            <p class="title">{{ item.title }}</p>
            <p class="viewCount">热度 : {{ item.view }}</p>
          </div>
        </el-timeline-item>
      </el-timeline>
 
      <back-top targets=".archive-wrapper" :visibilityHeight="300"> </back-top>
    </div>

    <empty-state v-else-if="!isSkeleton && !articleList.length"></empty-state>
  </main>
</template>
 
<script>
import EmptyState from "@/components/mine/common/empty-state/EmptyState";
import { articleListQuery } from "@/api/module/blog";
import BackTop from "@/components/mine/common/back-top/BackTop.vue";

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
      // 文章列表
      articleList: [],
      // 总文章数量
      articleCount: 0,
      // 页码
      pageNum: 1,
      // 页容量
      pageSize: 10,
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
      //重置页码
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

    gotoDetail(articleID) {
      let detail = this.$router.resolve({ path: `/detail/${articleID}` });
      window.open(detail.href, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
@import "~components/import/element-ui/css/views/blog/archive/archive-timeLine.scss";
</style>