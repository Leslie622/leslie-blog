<template>
  <div class="wrapper">
    <div class="content">
      <main class="main">
        <div class="info">
          <div class="info-item">
            <div class="time">
              <p>发布于：{{ article.create_time }}</p>
              <p>更新于：{{ article.update_time }}</p>
            </div>
          </div>
          <div class="info-item">
            <div v-if="article.tag.length" class="tag">
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
          <el-image lazy :src="$imgPrefix + article.cover" fit="cover">
          </el-image>
        </div>
        <div class="title">
          <h1>
            {{ article.title }}
          </h1>
        </div>
        <v-md-preview
          v-show="isShow"
          :text="article.content"
          class="articleContent"
          ref="preview"
        ></v-md-preview>
      </main>

      <aside class="sidebar"></aside>
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
      article: "",
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
      setTimeout(() => {
        this.loadingMask.close();
        this.isShow = true;
      }, 500);
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
  },
};
</script>

<style lang='scss' >
@import "./index.scss";
</style>