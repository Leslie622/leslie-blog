<template>
  <main
    class="archive-wrapper"
    ref="archive"
    infinite-scroll-distance="10"
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

    <div class="content" v-if="!isSkeleton && articelInfo.list.length">
      <el-timeline class="filingTimeLine">
        <el-timeline-item
          v-for="(item, index) in articelInfo.list"
          :key="index"
          :timestamp="item.create_time"
        >
          <div @click="gotoDetail(item.id)">
            <p class="title">{{ item.title }}</p>
            <p class="viewCount">热度 : {{ item.view }}</p>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>

    <empty-state
      v-else-if="!isSkeleton && !articelInfo.list.length"
    ></empty-state>

    <back-top targets=".archive-wrapper" :visibilityHeight="300"> </back-top>
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
  props: {
    category: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // 控制骨架屏
      isSkeleton: true,
      // 现存数据
      articelInfo: {
        list: [],
        count: 0,
        pageNum: 1,
        pageSize: 10,
        scrollTop: 0,
      },
      // 组件切换缓存数据
      compToggleCacheInfo: {
        list: [],
        pageNum: 1,
        pageSize: 10,
        scrollTop: 0,
      },
      // 分类切换缓存数据
      cateToggleCacheInfo: {},
    };
  },
  watch: {
    // 分类改变，检测是否存在缓存数据,否则初始化数据
    category: function (newCate) {
      let cacheInfo = this.cateToggleCacheInfo;
      let isHavaCache = Object.keys(cacheInfo).includes(String(newCate));
      if (isHavaCache) {
        this.articelInfo = this.cateToggleCacheInfo[newCate];
        this.$nextTick(() => {
          this.$refs.archive.scrollTo(0, this.articelInfo.scrollTop);
        });
      } else {
        this.initHandle();
      }
    },
  },
  mounted() {
    this.listeningScrollTop();
  },

  activated() {
    let isHavaCache = Boolean(this.compToggleCacheInfo.list.length);
    if (isHavaCache) {
      this.articelInfo.list = this.compToggleCacheInfo.list;
      this.articelInfo.pageNum = this.compToggleCacheInfo.pageNum;
      this.articelInfo.pageSize = this.compToggleCacheInfo.pageSize;
      this.$refs.archive.scrollTo(0, this.compToggleCacheInfo.scrollTop);
    } else {
      this.initHandle();
    }
  },

  deactivated() {
    this.compToggleCacheInfo.list = this.articelInfo.list;
    this.compToggleCacheInfo.pageNum = this.articelInfo.pageNum;
    this.compToggleCacheInfo.pageSize = this.articelInfo.pageSize;
    this.compToggleCacheInfo.scrollTop = this.articelInfo.scrollTop;
  },

  methods: {
    // 依据分类缓存数据
    cacheCateInfo() {
      let cateToggleCacheInfo = this.cateToggleCacheInfo;
      let category = this.category;
      let scrollTop = this.articelInfo.scrollTop;
      let articelInfo = this.articelInfo;
      this.$set(cateToggleCacheInfo, category, {
        scrollTop,
        ...articelInfo,
      });
    },

    async doArticleListQuery() {
      const articleList = await articleListQuery(
        this.category,
        this.articelInfo.pageNum,
        this.articelInfo.pageSize
      );
      return articleList;
    },

    // 数据初始化
    async initHandle() {
      let articelInfo = this.articelInfo;
      //重置页码
      articelInfo.pageNum = 1;
      //获取文章列表数据
      const result = await this.doArticleListQuery();
      articelInfo.list = result.rows;
      articelInfo.count = result.count;
      //回到顶部
      this.$nextTick(() => {
        this.$refs.archive.scrollTo(0, 0);
      });
      //300ms后关闭骨架屏
      setTimeout(() => {
        this.isSkeleton = false;
      }, 300);
    },

    // 加载更多
    async doLoadMore() {
      let articelInfo = this.articelInfo;
      let pageNum = articelInfo.pageNum;
      let maxPageNum = Math.ceil(articelInfo.count / articelInfo.pageSize);
      if (pageNum < maxPageNum) {
        articelInfo.pageNum += 1;
        const moreArticleList = await this.doArticleListQuery();
        articelInfo.list.push(...moreArticleList.rows);
      }
    },

    listeningScrollTop() {
      this.$refs.archive.addEventListener(
        "scroll",
        (e) => {
          this.articelInfo.scrollTop = e.target.scrollTop;
        },
        true
      );
    },

    gotoDetail(articleID) {
      this.$router.push({ path: `/detail/${articleID}` });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
@import "~components/import/element-ui/css/views/blog/archive/archive-timeLine.scss";
</style>