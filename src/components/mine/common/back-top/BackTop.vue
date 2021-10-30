<template>
  <el-backtop :visibility-height="1500" ref="backtop" @click="backtop">
    <div><i class="iconfont icon-huidaodingbu"></i></div>
  </el-backtop>
</template>
 
<script>
import anime from "animejs";

export default {
  methods: {
    back() {
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