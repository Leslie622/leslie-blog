<template>
  <header class="header" :class="{ 'header-active': headerActive }">
    <div class="header-inner">
      <div class="header-switch">
        <div class="switch" @click="headerSwitch">
          <div>
            <span class="Switchicon"></span>
            <span class="Switchicon"></span>
            <span class="Switchicon"></span>
          </div>
        </div>
        <div class="brand">LESLIE BLOG</div>
      </div>
      <div class="select-wrapper">
        <el-select class="articleSelect" v-model="currentCategory">
          <el-option
            v-for="item in articleCategory"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
    </div>
  </header>
</template>
 
<script>
import { articleCategoryQuery } from "@/api/module/blog";

export default {
  data() {
    return {
      headerActive: false,
      articleCategory: [],
      currentCategory: "",
    };
  },

  created() {
    //获取文章分类并设置默认分类
    this.getArticleCategory();
  },

  mounted() {
    //监听浏览器窗口大小
    this.listenerWindowResize();
  },

  methods: {
    headerSwitch() {
      this.headerActive = !this.headerActive;
    },
    listenerWindowResize() {
      window.addEventListener("resize", (res) => {
        //浏览器宽度大于1024px时,自动收缩头部
        if (res.currentTarget.innerWidth > 1024) {
          this.headerActive = false;
        }
      });
    },
    async getArticleCategory() {
      const category = await articleCategoryQuery("8");
      this.articleCategory = category;
      //设置默认分类
      this.currentCategory = category[0].id;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../element-style/header-select.css";

.header {
  position: sticky;
  top: 0;
  height: 0;

  .header-inner {
    display: flex;
    flex-direction: column;
    width: 240px;
    height: 440px;
    background-color: white;
  }
}

.header-switch {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 130px;
  color: #fff;
  background-color: #222;

  .switch {
    position: absolute;
    display: none;
    align-items: center;
    justify-content: center;
    left: 20px;
    width: 40px;
    height: 40px;
    cursor: pointer;

    .Switchicon {
      display: block;
      padding: 3px 0;
      transition: all 0.2s ease;
    }

    .Switchicon::before {
      content: "";
      display: block;
      width: 28px;
      height: 2px;
      border-radius: 2px;
      background-color: #fff;
      transition: transform 0.2s ease 0.1s, background-color 0.3s ease;
    }
  }

  .brand {
    font-family: Arial;
    font-size: 20px;
  }
}

.header.header-active {
  height: 440px;
  .Switchicon:nth-child(1)::before {
    transform: rotate(45deg);
  }
  .Switchicon:nth-child(3)::before {
    transform: rotate(-45deg);
  }
  .Switchicon:nth-child(1) {
    transform: translateY(8px);
  }
  .Switchicon:nth-child(2) {
    opacity: 0;
    transition: none;
  }
  .Switchicon:nth-child(3) {
    transform: translateY(-8px);
  }
}

//窗口宽度小于等于1024时（也就是移动端）：改变头部高度宽度，显示头部开关
@media screen and (max-width: 1024px) {
  .header {
    height: 80px;
    overflow: hidden;
    transition: all 0.5s ease;

    .header-inner {
      width: 100%;
    }

    .header-switch {
      height: 80px;
    }

    .switch {
      display: flex;
    }
  }
}
</style>