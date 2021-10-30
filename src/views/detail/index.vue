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
              <p>发布于：{{ timeFormat(article.create_time) }}</p>
              <p>更新于：{{ timeFormat(article.update_time) }}</p>
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
          @copy-code-success="handleCopyCodeSuccess"
          ref="preview"
        ></v-md-preview>
      </main>

      <aside class="sidebar" v-if="titles.length">
        <p class="title">目录</p>
        <div class="toc">
          <div
            v-for="anchor in titles"
            :style="{ padding: `5px 0 5px ${anchor.indent * 15}px` }"
            @click="handleAnchorClick(anchor)"
          >
            <li style="cursor: pointer" class="toc-item" :title="anchor.title">
              <span> {{ anchor.title }}</span>
            </li>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
 
<script>
import "@/components/import/vue-markdown-editor/index";
import { articleDetailQuery } from "@/api/module/detail";

export default {
  props: ["articleID"],

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
      // 生成目录
      this.createTOC();
      // 关闭遮罩
      setTimeout(() => {
        this.loadingMask.close();
        this.isShow = true;
      }, 300);
    });
  },

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

    timeFormat(timeStr) {
      if (timeStr) {
        return timeStr.substr(0, 10);
      }
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

    handleCopyCodeSuccess() {
      console.log("a")
      this.$message({
        message:"复制成功",
        type:"success"
      })
    },
  },
};
</script>

<style  lang='scss' scoped>
@import "./index.scss";
@import "~components/import/vue-markdown-editor/index.scss";
@import "~components/import/element-ui/css/views/detail/image.scss";
</style>