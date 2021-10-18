<template>
  <div class="wrapper">
    <v-md-preview
      v-show="isShow"
      :text="articleContent"
      class="articleContent"
      ref="preview"
    ></v-md-preview>
  </div>
</template>
 
<script>
import "@/components/vue-markdown-editor/index";
import { articleDetailQuery } from "@/api/module/detail";

export default {
  props: ["articleID"],
  components: {},
  data() {
    return {
      //文章内容
      articleContent: "",
      //延迟显示
      isShow: false,
      //遮罩数据
      loadingMask: null,
    };
  },
  beforeCreate() {
    console.log(this.$loading);
  },
  created() {
    //加载遮罩
    this.createLoadingMask();
    // 获取文章详情
    this.getArticleDetail().then(() => {
      setTimeout(() => {
        this.loadingMask.close();
        this.isShow = true;
      }, 500);
    });
  },
  mounted() {},
  methods: {
    async getArticleDetail() {
      const result = await articleDetailQuery(this.articleID);
      this.articleContent = result.content;
    },

    createLoadingMask() {
      this.loadingMask = this.$loading({
        lock: true,
        text: "",
        spinner: "",
        background: "#fff",
      });
    },
  },
};
</script>

<style lang='scss' >
@import "./index.scss";

</style>