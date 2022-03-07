<template>
  <a-modal
    title="导出历史记录"
    v-model:visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="取消"
    okText="确定导出"
  >
    <JsonView :json="historyDatasJSON" :closed="true"></JsonView>
  </a-modal>
</template>

<script setup>
import { computed, ref } from "vue";
import JsonView from "./JsonView.vue";
// 定义props
const props = defineProps({
  historyDatas: Array,
  visible: Boolean,
});
const emit = defineEmits(["closeModel"]);
//将object转化
const historyDatasJSON = computed(() => {
  return JSON.parse(JSON.stringify(props.historyDatas)
    .replace("resultArray", "有道")
    .replace("resultArrayBaidu", "百度"));
});
//加载中
const confirmLoading = ref(false);

function downFileH5(content, filename) {
  var ele = document.createElement("a"); // 创建下载链接
  ele.download = filename; //设置下载的名称
  ele.style.display = "none"; // 隐藏的可下载链接
  // 字符内容转变成blob地址
  var blob = new Blob([content]);
  ele.href = URL.createObjectURL(blob);
  // 绑定点击时间
  document.body.appendChild(ele);
  ele.click();
  // 然后移除
  document.body.removeChild(ele);
}

//确定处理
const handleOk = (e) => {
  confirmLoading.value = true;
  // console.log(JSON.stringify(props.historyDatas))
  if(historyDatas.length==0){
     message.error("历史记录为空！"); // 释放内存
    return 
  }
  downFileH5(
    JSON.stringify(props.historyDatas)
      .replace("resultArray", "有道")
      .replace("resultArrayBaidu", "百度"),
    "export.json"
  );
  setTimeout(() => {
    confirmLoading.value = false;
    emit("closeModel");
  }, 2000);
};

const handleCancel = () => {
  emit("closeModel");
};
</script>

<style></style>
