<template>
  <main class="blog-wrapper">
    <article class="content" v-if="articleList.length">
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
        <div class="description">
          <p class="text">{{ item.abs }}</p>
        </div>
        <div class="readBtn">
          <div class="Btn">
            <span>阅读全文</span>
          </div>
        </div>
      </section>
    </article>
    <section v-else class="empty">该分类暂无文章，博主正在努力构思</section>
  </main>
</template>
 
<script>
export default {
  props: {
    articleList: Array,
  },
  methods: {
    timeFormat(str) {
      return str.substr(0, 10);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>