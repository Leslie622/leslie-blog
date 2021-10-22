<template>
  <div class="wrapper">
    <div class="content" v-show="isShow">
      <main class="main">
        <div class="title">
          <h1>
            {{ article.title }}
          </h1>
        </div>
        <div class="info">
          <div class="info-item">
            <div class="time">
              <p>发布于：{{ article.create_time }}</p>
              <p>更新于：{{ article.update_time }}</p>
            </div>
          </div>
          <div class="info-item">
            <div
              v-if="typeof article.tag === 'object' && article.tag.length"
              class="tag"
            >
              <p>
                标签：
                <span v-for="(item, index) in article.tag">
                  {{ item }}
                </span>
              </p>
            </div>
            <div class="viewCount">
              <p>浏览次数：{{ article.view }}</p>
            </div>
          </div>
        </div>
        <div class="cover" v-if="article.cover">
          <el-image :src="$imgPrefix + article.cover" fit="cover"> </el-image>
        </div>

        <v-md-preview
          :text="article.content"
          class="articleContent"
          ref="preview"
        ></v-md-preview>
      </main>

      <aside class="sidebar">
        <p class="title">目录</p>
        <div class="toc">
          <div
            v-for="anchor in titles"
            :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
            @click="handleAnchorClick(anchor)"
          >
            <a style="cursor: pointer">{{ anchor.title }}</a>
          </div>
        </div>
      </aside>
    </div>
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
      //文章信息
      article: {},
      //目录
      titles: [],
      //延迟显示
      isShow: false,
      //遮罩数据
      loadingMask: null,
    };
  },

  created() {
    //加载遮罩
    this.createLoadingMask();
    // 获取文章详情
    this.getArticleDetail().then(() => {
      this.createTOC();
      setTimeout(() => {
        this.loadingMask.close();
        this.isShow = true;
      }, 300);
    });
  },
  mounted() {},

  methods: {
    async getArticleDetail() {
      const result = await articleDetailQuery(this.articleID);
      this.article = result;
    },

    createLoadingMask() {
      this.loadingMask = this.$loading({
        lock: true,
        text: "",
        spinner: "",
        background: "#fff",
      });
    },

    createTOC() {
      const anchors =
        this.$refs.preview.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");
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

<style lang='scss' >
@import "./index.scss";
@import "../../components/vue-markdown-editor/index.scss";
</style>