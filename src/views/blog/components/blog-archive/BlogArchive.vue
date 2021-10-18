<template>
  <main class="archive-wrapper">
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
            v-for="(itemm, index) in 2"
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
            {{ item.title }}
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
    <empty-state v-else-if="!isSkeleton && !articleList.length"></empty-state>
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
      if (articleListLength >= 8) {
        return 8;
      } else {
        return articleListLength;
      }
    },
  },
  methods: {
    gotoDetail(articleID) {
      let detail = this.$router.resolve({ path: `/detail/${articleID}` });
      window.open(detail.href, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
@import "../../element-style/archive-timeLine.css";
</style>