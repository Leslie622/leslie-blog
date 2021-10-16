<template>
  <main class="wrapper">
    <div class="content" v-if="articleList.length">
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
    <empty-state v-else-if="!articleList.length"></empty-state>
  </main>
</template>
 
<script>
import EmptyState from "@/components/common/empty-state/EmptyState";
export default {
  components: {
    EmptyState,
  },
  props: {
    articleList: Array,
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