<template>
  <el-backtop
    :visibility-height="visibilityHeight"
    ref="backtop"
    @click="backtop"
    :target="targets"
  >
    <div><i class="iconfont icon-huidaodingbu"></i></div>
  </el-backtop>
</template>
 
<script>
import anime from "animejs";

export default {
  name:"BakcTop",
  props: {
    targets: {
      type: String,
      defalut: undefined,
    },
    visibilityHeight: {
      type: Number,
      defalut: 1000,
    },
  },

  updated() {
    console.log("b")
  },
  methods: {
    backtop() {
      anime({
        targets: this.$refs.backtop.$el,
        translateY: [{ value: -1000, duration: 1000 }],
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.icon-huidaodingbu {
  font-size: 2rem;
  color: #d24d57;
}
</style>