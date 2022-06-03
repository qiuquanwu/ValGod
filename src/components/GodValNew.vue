<template>
  <h1>
    {{ titleName }}
  </h1>
  <div>
    <a-typography-link href="https://github.com/qiuquanwu/ValGod" target="_blank">
      源代码仓库
    </a-typography-link>
  </div>

  <div style="padding: 0 25%">
    <a-input-search v-model:value="state.text" :placeholder="inputPlaceholder" size="large" @focus="getFocus"
      @search="onSearch">
      <template #enterButton>
        <a-button type="primary" :loading="loading">查询</a-button>
      </template>
    </a-input-search>
  </div>
  <div style="text-algin: center; margin-top: 10px">
    <a-checkbox v-model:checked="state.hasBaidu">百度</a-checkbox>
    <a-checkbox v-model:checked="state.hasYoudao">有道</a-checkbox>
    <a-checkbox v-model:checked="state.showHistory">历史</a-checkbox>
  </div>
  <div style="text-algin: center; margin-top: 10px">
    <a-checkbox v-model:checked="options.bigHumpNaming">大驼峰</a-checkbox>
    <a-checkbox v-model:checked="options.smallHumpNaming">小驼峰</a-checkbox>
    <a-checkbox v-model:checked="options.underlineNaming">下划线</a-checkbox>
    <a-checkbox v-model:checked="options.constant">常量</a-checkbox>
    <a-checkbox v-model:checked="options.php">php变量</a-checkbox>
    <a-checkbox v-model:checked="options.controller">控制器</a-checkbox>
    <a-checkbox v-model:checked="options.cssStyle">css风格</a-checkbox>
    <a-checkbox v-model:checked="options.service">服务</a-checkbox>
    <a-checkbox v-model:checked="options.interfaceImplementation">接口实现类</a-checkbox>
  </div>
  <a-row :gutter="[16, 8]" style="margin-top: 10px">
    <a-col :span="6" :offset="6" v-if="state.hasBaidu">
      <a-card title="百度">
        <template #extra>
          <a href="#">{{ state.lastText }}</a>
        </template>
        <p v-for="item of state.resultArray" :key="item.id">
          <result-item-new :resultItme="item" />
        </p>
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card title="有道" v-if="state.hasYoudao">
        <template #extra>
          <a href="#">{{ state.lastText }}</a>
        </template>
        <p v-for="item of state.resultArrayBaidu" :key="item.id">
          <result-item-new :resultItme="item" />
        </p>
      </a-card>
    </a-col>
  </a-row>
  <!-- 历史记录 -->

  <div style="margin-top: 10px" v-show="state.showHistory">
    <div style="padding: 0 25%">
      <a-divider>
        历史记录
        <a-button type="primary" title="导出历史记录" size="small" @click="showModal">
          <template #icon>
            <DownloadOutlined />
          </template>
        </a-button>
      </a-divider>
    </div>
    <div class="resultWrapBox" v-for="(historicalData, index) of state.historicalDatas" :key="index"
      :id="historicalData.name">
      <a-row :gutter="[16, 8]" style="margin-top: 10px">
        <a-col :span="6" :offset="6" v-if="state.hasBaidu">
          <a-card title="百度">
            <template #extra>
              <a href="#">{{ historicalData.name }}</a>
            </template>
            <p v-for="item of historicalData.resultArrayBaidu" :key="item.id">
              <result-item-new :resultItme="item" />
            </p>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card title="有道" v-if="state.hasYoudao">
            <template #extra>
              <a href="#">{{ historicalData.name }}</a>
            </template>
            <p v-for="item of historicalData.resultArray" :key="item.id">
              <result-item-new :resultItme="item" />
            </p>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
  <ExportModal :visible="modalVisible" :historyDatas="state.historicalDatas" @closeModel="closeModel" />
  <div class="history_datas">
    <Card title="查询历史" border="none">
      <div v-if="state.historicalDatas.length == 0">暂无记录</div>

      <div v-for="item of state.historicalDatas" :key="item.name" style="padding-bottom: 8px;">
        <a-typography-link :href="'#' + item.name">
          {{ item.name }}
        </a-typography-link>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { DownloadOutlined } from "@ant-design/icons-vue";
import { Modal, Card } from "ant-design-vue"
import { ref, reactive, h, onMounted, watch, toRaw } from "vue";
import { message } from "ant-design-vue";
import { initState, optionState } from "../config";
import getResultArray from "../util/getResultArray";
import ResultItemNew from "./ResultItemNew.vue";
import getParam from "../util/bd";
import getYDParam from "../util/request";
import ExportModal from "./ExportModal.vue";
// 定义props
const props = defineProps({
  titleName: String,
});
// 初始化state
const state = reactive(initState);
const options = reactive(JSON.parse(localStorage.getItem("optionState")) || optionState);

watch(options, (val) => {
  console.log("改变", toRaw(val))
  localStorage.setItem("optionState", JSON.stringify(val))
})
const inputPlaceholder = ref("请输入内容,再点击确定或者回车");
//获取焦点
const info = () => {
  Modal.info({
    title: "BY:作者",
    okText: "关闭",
    content: h("div", {}, [
      h("p", "如果此工具有帮助到你，请帮忙点个star。"),
      h("p", "若希望给本工具一些建议，可以提issue。"),
      h("p", "更新日志：✅️导出历史记录json数据。"),
    ]),
    onOk() { },
  });
};

const loading = ref(false)
// onMounted(info)

const getFocus = () => {
  inputPlaceholder.value = "";
};
const onSearch = () => {
  queryByJs();
};
//  通过JS查询
const queryByJs = async () => {
  loading.value = true
  if (state.text.length > 16) {
    message.error("单次搜索字符数不能超过20");
    return
  }
  //中文判断
  if (/^[\u4e00-\u9fa5]+$/i.test(state.text)) {
    saveHistoricalData();
    let data = getParam(state.text);
    let dataYd = getYDParam(state.text);
    // 百度结果
    let resultArrayBaidu = await apiPost(
      "https://api.fanyi.baidu.com/api/trans/vip/translate",
      data,
      "post"
    );
    //有道结果
    let resultArray = await apiPost(
      "https://openapi.youdao.com/api",
      dataYd,
      "post"
    );
    loading.value = false
    state.resultArrayBaidu = resultArrayBaidu;
    state.resultArray = resultArray;
    state.lastText = state.text;
    state.text = "";
    inputPlaceholder.value = "请输入内容,再点击确定或者回车";
  } else {
    message.error("请输入纯中文!");
  }
};
// 请求方法 retrun Promise<Aarry>
const apiPost = (url, data, type) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: type,
      dataType: "jsonp",
      data: data,
      success: function (data) {
        let translateArray = data.trans_result
          ? data.trans_result[0].dst
          : data.translation[0];
        translateArray = translateArray
          .toLowerCase()
          .replace("user's", "user")
          .replace("the ", "")
          .replace("-", " ")
          .split(" ");
        let resultArray = getResultArray(
          translateArray,
          state.options,
          options
        );
        resolve(resultArray);
      },
    });
  });
};
// 保存历史数据
const saveHistoricalData = () => {
  if (state.resultArray.length !== 0 || state.resultArrayBaidu.length !== 0) {
    let historicalData = {
      name: state.lastText,
      resultArray: state.resultArray,
      resultArrayBaidu: state.resultArrayBaidu,
    };
    state.historicalDatas.push(historicalData);
  }
};

// 导出
let modalVisible = ref(false);
const showModal = () => {
  modalVisible.value = true;
};

const closeModel = () => {
  modalVisible.value = false;
};
</script>

<style>
.history_datas {
  position: fixed;
  top: 20%;
  left: 1rem;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
  max-height: 1200px;
  overflow: auto;
}
</style>
