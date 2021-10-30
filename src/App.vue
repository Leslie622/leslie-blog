<template>
  <div id="app">
    <keep-alive>
      <transition :name="transitionName">
        <router-view class="transition-el"></router-view>
      </transition>
    </keep-alive>
  </div>
</template>

<script>
export default {
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
        console.log("b");
        this.notTransition = false;
        return;
      }
      this.transitionName = "slideLeft";
    },
    popstateHandle() {
      // 后退时才启用后退过渡
      console.log("a");
      window.addEventListener("popstate", () => {
        this.transitionName = "slideRight";
        // 改变状态，下次启用前进过渡
        this.notTransition = true;
      });
    },
  },
};
</script>

<style lang="scss">
// beforeunload
@import "~assets/css/base.scss";
@import "~components/import/element-ui/css/global.scss";

.transition-el {
  transition: transform 0.4s ease-out; //设置动画
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
.slideRight-enter-active {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>


