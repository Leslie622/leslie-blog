<template>
  <div id="app">
    <keep-alive>
      <transition :name="transitionName">
        <router-view class="transition-body"></router-view>
      </transition>
    </keep-alive>
    <back-top></back-top>
  </div>
</template>

<script>
import BackTop from "@/components/mine/common/back-top/BackTop.vue";

export default {
  components: {
    BackTop,
  },

  data() {
    return {
      transitionName: "",
      // 初始不启用动画
      isNotTransition: true,
    };
  },

  mounted() {
    // 监听浏览器后退
    this.popstateHandle();
  },

  watch: {
    // 监听路由变化
    "$route.path": function () {
      this.transitionHandle();
    },
  },

  methods: {
    transitionHandle() {
      if (this.isNotTransition) {
        this.isNotTransition = false;
        return;
      }
      this.transitionName = "slideLeft";
    },

    popstateHandle() {
      // 后退时才启用后退过渡
      window.addEventListener("popstate", () => {
        this.transitionName = "slideRight";
        // 下次启用前进过渡
        this.isNotTransition = true;
      });
    },
  },
};
</script>

<style lang="scss">
@import "~assets/css/base.scss";
@import "~components/import/element-ui/css/global.scss";
</style>


