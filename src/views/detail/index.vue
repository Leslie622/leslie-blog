<template>
  <div class="wrapper">
    <mavon-editor
      v-model="articleContent"
      :subfield="false"
      :editable="false"
      :toolbarsFlag="false"
      :transition="false"
      defaultOpen="preview"
    />
  </div>
</template>
 
<script>
import { articleDetailQuery } from "../../api/module/detail";
import { mavonEditor } from "mavon-editor";

import { Loading } from "element-ui";

export default {
  props: ["id"],
  components: {
    mavonEditor,
  },
  data() {
    return {
      articleContent: "",
    };
  },

  // beforeMount(){

  //   const a = Loading.service({
  //     background:"#fff"
  //   })
  //    console.log(a)
  //   setTimeout(()=>{

  //   },1000)
  // },
  async created() {
    const result = await articleDetailQuery(this.id);

    this.articleContent = result.content;
  },
};
</script>

<style lang='scss' scoped>
.active {
  opacity: 0;
}
@import "./mavon.scss"; // .wrapper {
//   margin: 0 auto;
//   width: 50%;

//   .v-note-wrapper.v-note-panel .v-note-show{
//     transition: none;
//   }
// }

// @media screen and (max-width: 1024px) {
//   .wrapper {
//     width: 100%;
//   }
// }
</style>