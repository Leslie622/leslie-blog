<template>
  <section v-else-if="!articleList.length" class="empty">
   <el-empty ></el-empty>
  </section>
</template>
 
<script>
export default {};
</script>

<style lang='scss' scoped>
.empty {
  box-sizing: border-box;
  font-size: 1.3rem;
  text-align: center;
  box-shadow: $blog-boxShadow;
  color: #888;
  background-color: white;
}
</style>