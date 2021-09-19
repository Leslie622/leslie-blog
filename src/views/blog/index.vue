<template>
  <div class="wrapper">
    <div class="content">
      <blog-header></blog-header>
      <div class="blog">
        <aside class="blog-side"></aside>
        <main class="blog-main">
          <div class="blog-inner"></div>
        </main>
      </div>
    </div>
  </div>
</template>
 
<script>
import BlogHeader from "./components/BlogHeader.vue";
export default {
  components: {
    BlogHeader,
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: #eee;
}

.content {
  margin: 0 auto;
  width: 1200px;
  min-height: 100vh;
}

.blog {
  display: flex;
  height: 2000px;

  .blog-side {
    position: sticky;
    top: 450px;
    margin-top: 450px;
    width: 240px;
    min-width: 240px;
    height: 300px;
    background-color: white;
  }

  .blog-main {
    padding: 0 10px;
    width: 100%;
    height: 300px;
  }

  .blog-inner {
    width: 100%;
    height: 100px;
    background-color: fuchsia;
  }
}

// 适配
//窗口宽度大于1600px：版心百分比伸缩
@media screen and (min-width: 1600px) {
  .content {
    width: 73%;
  }
}
//窗口宽度小于等于1024时（也就是移动端）：版心100%
@media screen and (max-width: 1024px) {
  .content {
    width: 100%;
  }
  .blog {
    .blog-side {
      display: none;
    }
    .blog-main {
      padding: 0 5px;
    }
  }
}
</style>