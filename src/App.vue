<template>
  <div id="app">
    <keep-alive>
      <transition :name="transitionName">
        <router-view class="transition-el"></router-view>
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
      notTransition: true,
    };
  },
  mounted() {
    this.popstateHandle();
  },
  watch: {
    "$route.path": function () {
      this.transitionHandle();
    },
  },
  methods: {
    transitionHandle() {
      // 首次渲染不启用过渡
      if (this.notTransition) {
        this.notTransition = false;
        return;
      }
      this.transitionName = "slideLeft";
    },
    popstateHandle() {
      // 后退时才启用后退过渡
      window.addEventListener("popstate", () => {
        this.transitionName = "slideRight";
        // 下次启用前进过渡
        this.notTransition = true;
      });
    },
  },
};
</script>

<style lang="scss">
@import "~assets/css/base.scss";
@import "~components/import/element-ui/css/global.scss";

.transition-el {
  transition: transform .3s ease-out;
}
.slideLeft-enter,
.slideRight-leave-active {
  transform: translate(100%, 0);
}
.slideLeft-leave-active,
.slideRight-enter {
  transform: translate(-100%, 0);
}
.slideLeft-enter-active,
.slideRight-enter-active,
.slideRight-leave-active,
.slideLeft-leave-active {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>


