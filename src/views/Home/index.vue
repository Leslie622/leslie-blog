<template>
  <div class="wrapper">
    <transition enter-active-class="animate__flipInX animate__animated" appear>
      <div class="content">
        <div class="logo-content">
          <div class="logo">Leslie</div>
        </div>

        <div class="nav">
          <router-link
            v-for="(item, index) in linkList"
            :key="item.path"
            :to="item.path"
            class="item"
          >
            {{ item.value }}
          </router-link>
        </div>
      </div>
    </transition>
  </div>
</template>
 
<script>
// ==== 路由项 ==== //
const linkList = [
  { path: "/blog", value: "BLOG" },
  { path: "/diary", value: "DIARY" },
];

export default {
  data() {
    return {
      linkList,
    };
  },
};
</script>

<style  lang="scss" scoped>
@import "./index.scss";

.list-enter-active,
.list-leave-active {
  transform: scale(2);
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>