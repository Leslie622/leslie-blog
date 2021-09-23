<template>
  <main class="blog-archive">
    <div class="inner">
      <el-timeline class="filingTimeLine" v-if="articleList.length != 0">
        <el-timeline-item
          v-for="(item, index) in articleList"
          :key="index"
          :timestamp="item.create_time"
        >
          <div @click="gotoDetail(item)">
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
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
@import "../../element-style/archive-timeLine.css"
</style>