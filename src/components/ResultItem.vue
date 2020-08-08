<template>
  <div>
    {{ resultItme.title }}:{{ resultItme.value }}
    <button class="btn" :data-clipboard-text="resultItme.value" @click="copy">
      复制
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
        console.log("复制成功");
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
<style lang="stylus" scope></style>
