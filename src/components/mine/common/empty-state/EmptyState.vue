<template>
  <section v-else-if="!articleList.length" class="empty">
    该分类暂无内容，博主正在努力构思
  </section>
</template>
 
<script>
export default {};
</script>

<style lang='scss' scoped>
  .empty {
    height: 15rem;
    font-size: 1.3rem;
    text-align: center;
    line-height: 15rem;
    box-shadow: $blog-boxShadow;
    color: #888;
    background-color: white;
  }
</style>