<template>
  <div
    class="wrapper"
    v-loading.fullscreen.lock="isLoading"
    element-loading-background="#fff"
  >
    <mavon-editor
      v-if="articleContent"
      v-model="articleContent"
      :subfield="false"
      :editable="false"
      :toolbarsFlag="false"
      :transition="false"
      defaultOpen="preview"
      class="articleContent"
    />
  </div>
</template>
 
<script>
import { articleDetailQuery } from "../../api/module/detail";
import { mavonEditor } from "mavon-editor";

export default {
  props: ["id"],
  components: {
    mavonEditor,
  },
  data() {
    return {
      articleContent: "",
      isLoading: true,
    };
  },

  created() {
    // 获取文章详情
    this.getArticleDetail();
  },
  methods: {
    async getArticleDetail() {
      const result = await articleDetailQuery(this.id);
      this.articleContent = result.content;
      //取消mask
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
  },
};
</script>

<style lang='scss' scoped>
@import "./mavonEditor-style/mavon-editor.css";
@import "./index.scss";
</style>