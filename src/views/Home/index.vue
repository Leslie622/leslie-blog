<template>
  <div class="wrapper">
    <div class="content">
      <div class="logo-content">
        <div class="logo">Leslie</div>
      </div>
      <div class="nav-cotent">
        <router-link
          v-for="(item, index) in linkList"
          :to="item.path"
          class="nav-item"
          :key="index"
        >
          {{ item.value }}
        </router-link>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      linkList: [
        { path: "/blog", value: "BLOG" },
        { path: "/diary", value: "DIARY" },
      ],
    };
  },
};
</script>

<style  lang="scss" scoped>
@import "./index.scss"
</style>