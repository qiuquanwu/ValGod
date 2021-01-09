<template>
  <div class="result-item">
    <span v-if="isCopy" style="color:red">已复制!</span>
    {{ resultItme.title }}:{{ resultItme.value }}
    <button
      class="btn"
      :data-clipboard-text="resultItme.value"
      @click="copy"
      title="复制"
    >
      <img src="../assets/copy.png" class="icon" />
    </button>
    
  </div>
</template>
<script>
import Clipboard from "clipboard";
import {ref} from "vue"
export default {
  props: {
    resultItme: Object,
  },
  setup(props) {
    const isCopy=ref(false)
    const copy = () => {
      let clipboard = new Clipboard(".btn");
      clipboard.on("success", (e) => {
        isCopy.value=true
        clipboard.destroy();
        let timeout=setTimeout(()=>{
          isCopy.value=false
          clearTimeout(timeout)
        },1000)
      });
      clipboard.on("error", (e) => {
        // 不支持复制
        console.log("该浏览器不支持自动复制"); // 释放内存
        clipboard.destroy();
      });
    };
    return {
      copy,
      isCopy
    };
  },
};
</script>
<style lang="stylus" scope>
.result-item
  height 30px
  margin-top 5px
  line-height 30px
.icon
  width 20px
  height 20px
  opacity 1
  background-color #0091ff
.btn
  width 20px
  height 20px
  opacity 1
  border none
  outline none
</style>
