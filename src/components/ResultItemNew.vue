<template>
  <div class="result-item">
    <a-button
      class="btn"
      type="primary"
      :data-clipboard-text="resultItme.value"
      @click="copy"
      title="复制"
    >
      {{ resultItme.title }}:{{ resultItme.value }}
    </a-button>
  </div>
</template>
<script>
import Clipboard from "clipboard";
import { ref } from "vue";
import { message } from 'ant-design-vue';
export default {
  props: {
    resultItme: Object,
  },
  setup(props) {
    const copy = () => {
      let clipboard = new Clipboard(".btn");
      clipboard.on("success", (e) => {
        message.success("复制成功！");
        clipboard.destroy();
      });
      clipboard.on("error", (e) => {
        // 不支持复制
        message.error("复制出错，浏览器不支持！"); // 释放内存
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
