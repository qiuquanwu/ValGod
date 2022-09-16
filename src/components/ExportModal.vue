<template>
  <a-modal title="导出历史记录" v-bind="$attrs" :confirm-loading="confirmLoading">
    <JsonView :json="historyDatasJSON" :closed="true"></JsonView>

    <template #footer>
      <div>
        <a-space>
          <a-button @click="handleCancel">取消</a-button>
          <a-button type="primary" @click="handleOk">导出JSON</a-button>
          <a-button type="primary" @click="handleOkExcel">导出Excel</a-button>
        </a-space>
      </div>
    </template>
  </a-modal>
</template>

<script setup>
import { computed, ref } from "vue";
import JsonView from "./JsonView.vue";
import {JSONToExcelConvertor} from "../util/excel"
// 定义props
const props = defineProps({
  historyDatas: Array,
  // visible: Boolean,
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
  if (historyDatas.length == 0) {
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


const handleOkExcel = () => {
  console.log("开始导出Excel")

  console.log(props.historyDatas)
  const res = []
  props.historyDatas.forEach(element => {
    let obj = {}
    obj.text = element.name
    element.resultArrayBaidu.forEach((item) => {
      obj[item.id] = item.value
    })
    res.push(obj)
  });
  console.log(res)

  excelExport(res)
  setTimeout(() => {
    confirmLoading.value = false;
    emit("closeModel");
  }, 2000);
}


const excelExport = (data) => {
  // let vm = this;
  let titles = ["文本","大驼峰", "小驼峰", "下划线", "常量", "php变量", "控制器", "css样式", "服务类","接口实现类"];
  let keys = [
    "text",
    "bigHumpNaming",
    "smallHumpNaming",
    "underlineNaming",
    "constant",
    "php",
    "controller",
    "cssStyle",
    "service",
    "interfaceImplementation"];
  let groups = [];
  data.map((v) => {
    if (!v.type) {
      groups.push(v);
    }
  })
  JSONToExcelConvertor(data, "命名结果数据", titles, keys);

}

const handleCancel = () => {
  emit("closeModel");
};
</script>

<style>

</style>
