<template>
  <div class="result-item">
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
export default {
  props: {
    resultItme: Object,
  },
  setup(props) {
    const copy = () => {
      let clipboard = new Clipboard(".btn");
      clipboard.on("success", (e) => {
        alert("复制成功")
        clipboard.destroy();
      });
      clipboard.on("error", (e) => {
        // 不支持复制
        console.log("该浏览器不支持自动复制"); // 释放内存
        clipboard.destroy();
      });
    };
    return {
      copy,
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
