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

    <article class="content" v-if="!isSkeleton && articleData.list.length">
      <section class="item" v-for="item in articleData.list">
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

    <empty-state v-if="!isSkeleton && !articleData.list.length"></empty-state>

    <back-top targets=".article-wrapper" :visibilityHeight="1500"> </back-top>
  </main>
</template>
 
<script>
import EmptyState from "@/components/mine/common/empty-state/EmptyState";
import BackTop from "@/components/mine/common/back-top/BackTop.vue";
import { articleListQuery } from "@/api/module/blog";
import { deepClone } from "@/util/index";

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
      // 文章数据
      articleData: {
        list: [],
        count: 0,
        pageNum: 1,
        pageSize: 10,
        scrollTop: 0,
      },
    };
  },

  computed: {
    articleCacheData() {
      return this.$store.state.blog.articleCacheData;
    },
  },

  watch: {
    // 分类改变，检测是否存在缓存数据,否则初始化数据
    category: function () {
      this.setArticleCacheData();
    },
  },

  mounted() {
    this.listeningScrollTop();
  },

  activated() {
    this.setArticleCacheData();
  },

  deactivated() {
    this.cacheData();
  },

  methods: {
    // 缓存数据
    cacheData() {
      this.$store.commit("setArticleCacheData", {
        category: this.category,
        articleData: deepClone(this.articleData),
      });
    },

    // 填充缓存数据
    setArticleCacheData() {
      let isHavaCache = Object.keys(this.articleCacheData).includes(
        String(this.category)
      );
      if (isHavaCache) {
        this.articleData = this.articleCacheData[this.category];
        this.$nextTick(() => {
          this.$refs.article.scrollTo(0, this.articleData.scrollTop);
        });
      } else {
        this.initHandle();
      }
    },

    async doArticleListQuery() {
      const articleList = await articleListQuery(
        this.category,
        this.articleData.pageNum,
        this.articleData.pageSize
      );
      return articleList;
    },

    // 数据初始化
    async initHandle() {
      let articleData = this.articleData;
      //重置页码
      articleData.pageNum = 1;
      //获取文章列表数据
      const result = await this.doArticleListQuery();
      articleData.list = result.rows;
      articleData.count = result.count;
      //回到顶部
      this.$nextTick(() => {
        this.$refs.article.scrollTo(0, 0);
      });
      //300ms后关闭骨架屏
      setTimeout(() => {
        this.isSkeleton = false;
      }, 300);
    },

    // 加载更多
    async doLoadMore() {
      let articleData = this.articleData;
      let pageNum = articleData.pageNum;
      let maxPageNum = Math.ceil(articleData.count / articleData.pageSize);
      if (pageNum < maxPageNum) {
        articleData.pageNum += 1;
        const moreArticleList = await this.doArticleListQuery();
        articleData.list.push(...moreArticleList.rows);
      }
    },

    listeningScrollTop() {
      this.$refs.article.addEventListener(
        "scroll",
        (e) => {
          this.articleData.scrollTop = e.target.scrollTop;
        },
        true
      );
    },

    timeFormat(timeStr) {
      return timeStr.substr(0, 10);
    },

    gotoDetail(articleID) {
      this.$router.push({ path: `/detail/${articleID}` });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
@import "~components/import/element-ui/css/views/blog/article/image.scss";

</style>