<template>
  <main class="wrapper">
    <div class="content">
      <el-timeline class="filingTimeLine" v-if="articleList.length != 0">
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
  </main>
</template>
 
<script>
export default {
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