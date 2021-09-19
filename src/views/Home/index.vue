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
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-image: $home-background-light;
}

.logo-content {
  font-family: Monoton-Regular;
  font-size: 8rem;
}

.nav-cotent {
  padding: 2rem 0;
  font-family: Arial;

  .nav-item {
    padding: 1rem;
    font-size: 1.5rem;
    color: #249ffd;
    transition: all 0.3s;

    &:hover {
      opacity: 0.5;
    }
  }
}
</style>