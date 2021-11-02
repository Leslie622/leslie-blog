<template>
  <div class="wrapper">
    <div class="content">
      <div class="rail">
        <div class="stamp four">4</div>
        <div class="stamp zero">0</div>
        <div class="stamp four">4</div>
        <div class="stamp zero">0</div>
        <div class="stamp four">4</div>
        <div class="stamp zero">0</div>
        <div class="stamp four">4</div>
        <div class="stamp zero">0</div>
        <div class="stamp four">4</div>
        <div class="stamp zero">0</div>
        <div class="stamp four">4</div>
        <div class="stamp zero">0</div>
        <div class="stamp four">4</div>
        <div class="stamp zero">0</div>
        <div class="stamp four">4</div>
        <div class="stamp zero">0</div>
        <div class="stamp four">4</div>
        <div class="stamp zero">0</div>
        <div class="stamp four">4</div>
        <div class="stamp zero">0</div>
      </div>
      <div class="world">
        <div class="forward">
          <div class="box">
            <div class="wall"></div>
            <div class="wall"></div>
            <div class="wall"></div>
            <div class="wall"></div>
            <div class="wall"></div>
            <div class="wall"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="hint">
      <button class="btn-goHome" @click="goHome">GO HOME</button>
    </div>
  </div>
</template>
 
<script>
export default {
  methods: {
    goHome() {
      this.$router.push({ path: `/home` });
    },
  },
};
</script>

<style lang='scss' scoped>
@import "./index.scss";
.hint {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  bottom: 9rem;
  width: 100vw;
}

.hint-text {
  margin: 6rem 0;
  font-size: 1.8rem;
  color: #fff;
}

.btn-goHome {
  margin: 20px;
  width: 12.5rem;
  height: 3.5rem;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  box-shadow: 0 4px 15px 0 rgba(252, 104, 110, .75);
  color: #fff;
  background-image: linear-gradient(
  to right,
  #fc6076,
  #ff9a44,
  #ef9d43,
  #e75516
  );
  background-size: 300% 100%;
  cursor: pointer;
  transition: all .4s ease-in-out;
}

.btn-goHome:hover {
  background-position: 100% 0;
  transition: all .4s ease-in-out;
}

.btn-goHome:focus {
  outline: none;
}

</style>