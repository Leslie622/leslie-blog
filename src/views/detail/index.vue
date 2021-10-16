<template>
  <div class="wrapper" element-loading-background="#fff">
    <!-- <mavon-editor
      :class="{ active: isLoading }"
      v-model="articleContent"
      :subfield="false"
      :editable="false"
      :toolbarsFlag="false"
      :transition="false"
      defaultOpen="preview"
      class="articleContent"
    /> -->
    <div
      v-for="anchor in titles"
      :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
      @click="handleAnchorClick(anchor)"
    >
      <a style="cursor: pointer">{{ anchor.title }}</a>
    </div>
    <v-md-preview
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
      articleContent: "",
      isLoading: true,
      titles: [],
    };
  },
  created() {
    // 获取文章详情
    this.getArticleDetail().then(() => {
      const anchors =
        this.$refs.preview.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");
      console.log(anchors);
      const titles = Array.from(anchors).filter(
        (title) => !!title.innerText.trim()
      );

      if (!titles.length) {
        this.titles = [];
        return;
      }

      const hTags = Array.from(
        new Set(titles.map((title) => title.tagName))
      ).sort();

      this.titles = titles.map((el) => ({
        title: el.innerText,
        lineIndex: el.getAttribute("data-v-md-line"),
        indent: hTags.indexOf(el.tagName),
      }));
    });
  },
  mounted() {},
  methods: {
    async getArticleDetail() {
      const result = await articleDetailQuery(this.articleID);
      this.articleContent = result.content;

      this.removeLoadingMask();
    },
    //拿到数据半秒后移除mask
    removeLoadingMask() {
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },

    handleAnchorClick(anchor) {
    const { preview } = this.$refs;
    const { lineIndex } = anchor;

    const heading = preview.$el.querySelector(
      `[data-v-md-line="${lineIndex}"]`
    );

    if (heading) {
      preview.scrollToTarget({
        target: heading,
        scrollContainer: window,
        top: 60,
      });
    }
  },
  },

  
};
</script>

<style lang='scss' scoped>
@import "./mavonEditor-style/mavon-editor.css";
@import "./index.scss";
</style>