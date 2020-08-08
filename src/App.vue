<template>
  <div>
    <HelloWorld msg="程序员翻译工具"></HelloWorld>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
};
</script>
<style lang="stylus">
*
  margin 0
  padding 0
</style>
