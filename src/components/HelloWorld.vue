<template>
  <div>
    <h1>{{ msg }}</h1>
    <input type="text" v-model="state.text" placeholder="请输入内容" />
    <button @click="query">确定</button>
    <div>
      <ul>
        <li v-for="item in state.resultArray" :key="item.id">
          <result-item :resultItme="item" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { watchEffect, reactive } from "vue";
import genetator from "../util/generator";
import ResultItem from "./ResultItem.vue";
import axios from "axios";
let initState = {
  text: "", //带翻译得原文
  translateArray: [], //翻译得结果数组
  options: ["bigHumpNaming", "smallHumpNaming", "underlineNaming", "constant"], //配置项
  resultArray: [],
};
//将翻译转化
const getResultArray = (translateArray, options) => {
  let resultArray = [];
  options.map((tranlateId) => {
    resultArray.push(genetator[tranlateId](translateArray));
  });
  return resultArray;
};
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    ResultItem,
  },
  setup(props) {
    const state = reactive(initState);

    const query = () => {
      //中文判断
      if (/^[\u4e00-\u9fa5]+$/i.test(state.text)) {
        axios.get("/api/translate/" + state.text).then((res) => { 
          let translateArray = res.data.translation[0].split(" ");
          //执行翻译请求
          let resultArray = getResultArray(translateArray, state.options);
          state.resultArray = resultArray;
        });
      } else {
        alert("请输入纯中文!");
      }
    };

    watchEffect(() => {});
    return {
      state,
      query,
    };
  },
};
</script>
