<template>
  <main
    class="archive-wrapper"
    ref="archive"
    infinite-scroll-distance="10"
    v-infinite-scroll="doLoadMore"
    infinite-scroll-immediate-check="false"
  >
    <el-skeleton
      class="skeleton-wrapper"
      animated
      v-if="isSkeleton"
      :count="10"
    >
      <template slot="template">
        <div class="skeleton">
          <el-skeleton-item
            class="skeleton-item"
            variant="text"
            v-for="(item, index) in 2"
            :key="index"
          />
        </div>
      </template>
    </el-skeleton>

    <div class="content" v-if="!isSkeleton && archiveData.list.length">
      <el-timeline class="filingTimeLine">
        <el-timeline-item
          v-for="(item, index) in archiveData.list"
          :key="index"
          :timestamp="item.create_time"
        >
          <div @click="gotoDetail(item.id)">
            <p class="title">{{ item.title }}</p>
            <p class="viewCount">热度 : {{ item.view }}</p>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>

    <empty-state
      v-else-if="!isSkeleton && !archiveData.list.length"
    ></empty-state>

    <back-top targets=".archive-wrapper" :visibilityHeight="300"> </back-top>
  </main>
</template>
 
<script>
import EmptyState from "@/components/mine/common/empty-state/EmptyState";
import BackTop from "@/components/mine/common/back-top/BackTop.vue";
import { articleListQuery } from "@/api/module/blog";
import { deepClone } from "@/util/index";

export default {
  components: {
    EmptyState,
    BackTop,
  },
  props: {
    category: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      // 控制骨架屏
      isSkeleton: true,
      // 归档数据
      archiveData: {
        list: [],
        count: 0,
        pageNum: 1,
        pageSize: 10,
        scrollTop: 0,
      },
    };
  },

  computed: {
    archiveCacheData() {
      return this.$store.state.blog.archiveCacheData;
    },
  },

  watch: {
    // 分类改变，检测是否存在缓存数据,否则初始化数据
    category: function () {
      this.setArchiveCacheData();
    },
  },

  mounted() {
    this.listeningScrollTop();
  },

  activated() {
    this.setArchiveCacheData();
  },

  deactivated() {
    this.cacheData();
  },

  methods: {
    // 缓存数据
    cacheData() {
      this.$store.commit("setArchiveCacheData", {
        category: this.category,
        archiveData: deepClone(this.archiveData),
      });
    },

    // 填充缓存数据
    setArchiveCacheData() {
      let isHavaCache = Object.keys(this.archiveCacheData).includes(
        String(this.category)
      );
      if (isHavaCache) {
        this.archiveData = this.archiveCacheData[this.category];
        this.$nextTick(() => {
          this.$refs.archive.scrollTo(0, this.archiveData.scrollTop);
        });
      } else {
        this.initHandle();
      }
    },

    async doArchiveListQuery() {
      const archiveList = await articleListQuery(
        this.category,
        this.archiveData.pageNum,
        this.archiveData.pageSize
      );
      return archiveList;
    },

    // 数据初始化
    async initHandle() {
      let archiveData = this.archiveData;
      //重置页码
      archiveData.pageNum = 1;
      //获取文章列表数据
      const result = await this.doArchiveListQuery();
      archiveData.list = result.rows;
      archiveData.count = result.count;
      //回到顶部
      this.$nextTick(() => {
        this.$refs.archive.scrollTo(0, 0);
      });
      //300ms后关闭骨架屏
      setTimeout(() => {
        this.isSkeleton = false;
      }, 300);
    },

    // 加载更多
    async doLoadMore() {
      let archiveData = this.archiveData;
      let pageNum = archiveData.pageNum;
      let maxPageNum = Math.ceil(archiveData.count / archiveData.pageSize);
      if (pageNum < maxPageNum) {
        archiveData.pageNum += 1;
        const moreArchiveList = await this.doArchiveListQuery();
        archiveData.list.push(...moreArchiveList.rows);
      }
    },

    listeningScrollTop() {
      this.$refs.archive.addEventListener(
        "scroll",
        (e) => {
          this.archiveData.scrollTop = e.target.scrollTop;
        },
        true
      );
    },

    gotoDetail(articleID) {
      this.$router.push({ path: `/detail/${articleID}` });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
@import "~components/import/element-ui/css/views/blog/archive/archive-timeLine.scss";
</style>