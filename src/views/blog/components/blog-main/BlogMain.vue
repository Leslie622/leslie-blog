<template>
  <main class="blog-wrapper">
    <el-skeleton
      class="skeleton-wrapper"
      animated
      v-if="isSkeleton"
      :count="skeletonCount"
    >
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
          <div class="tag-content info-item">
            <i class="iconfont icon-biaoqian2"></i>
            <span v-for="tag in item.tag" class="tag">{{ tag }}</span>
          </div>
        </div>
        <div class="abstract">
          <p class="text">{{ item.abs }}</p>
        </div>
        <div class="readBtn">
          <div class="Btn" @click="gotoDetail(item.id)">
            <span>阅读全文</span>
          </div>
        </div>
      </section>
    </article>

    <empty-state v-if="!isSkeleton && !articleList.length"></empty-state>
  </main>
</template>
 
<script>
import EmptyState from "@/components/common/empty-state/EmptyState";

export default {
  components: {
    EmptyState,
  },
  props: {
    articleList: {
      type: Array,
    },
    isSkeleton: {
      type: Boolean,
    },
  },
  computed: {
    //控制骨架屏count
    skeletonCount() {
      let articleListLength = this.articleList.length;
      if (articleListLength >= 3) {
        return 3;
      } else {
        return articleListLength;
      }
    },
  },
  methods: {
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
</style>