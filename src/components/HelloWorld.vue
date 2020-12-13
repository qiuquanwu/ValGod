<template>
  <div class="warp">
    <h1>{{ msg }}</h1>
    <input type="text" v-model="state.text" placeholder="请输入内容" class="search-input" />
    <button @click="queryByJs" class="search-btn">确定</button>
    <div style="margin-top: 30px;" class="resultWrap">
      有道云
      <ul>
        <li v-for="item in state.resultArray" :key="item.id">
          <result-item :resultItme="item" />
        </li>
      </ul>
    </div>
    <div style="margin-top: 30px;" class="resultWrap">
      百度
      <ul>
        <li v-for="item in state.resultArrayBaidu" :key="item.id">
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
import getParam from "../util/bd";
import getYDParam from "../util/request";
let initState = {
  text: "", //带翻译得原文
  translateArray: [], //翻译得结果数组
  options: [
    "bigHumpNaming",
    "smallHumpNaming",
    "underlineNaming",
    "constant",
    "php",
    "controller",
    "cssStyle"
  ], //配置项
  resultArray: [],
  resultArrayBaidu: [],
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

    const queryByJs = () => {
       //中文判断
      if (/^[\u4e00-\u9fa5]+$/i.test(state.text)) {
        let data = getParam(state.text);
        let dataYd = getYDParam(state.text);
        // 百度结果
        $.ajax({
          url: "http://api.fanyi.baidu.com/api/trans/vip/translate",
          type: "get",
          dataType: "jsonp",
          data: data,
          success: function (data) {
            let translateArray = data.trans_result[0].dst
              .toLowerCase()
              .replace("user's", "user")
              .replace("the ", "")
              .split(" ");
            let resultArrayBaidu = getResultArray(
              translateArray,
              state.options
            );
            state.resultArrayBaidu = resultArrayBaidu;
          },
        });
        // 网易云接口
        $.ajax({
          url: "http://openapi.youdao.com/api",
          type: "post",
          dataType: "jsonp",
          data: dataYd,
          success: function (data) {
            let translateArray = data.translation[0]
              .toLowerCase()
              .replace("user's", "user")
              .replace("the ", "")
              .split(" ");
            //执行翻译请求
            let resultArray = getResultArray(translateArray, state.options);
            state.resultArray = resultArray;
          },
        });
      } else {
        alert("请输入纯中文!");
      }
    };

    const query = () => {
      //中文判断
      if (/^[\u4e00-\u9fa5]+$/i.test(state.text)) {
        axios.get("/api/translate/" + state.text).then((res) => {
          let translateArray = res.data.translation[0]
            .toLowerCase()
            .replace("user's", "user")
            .replace("the ", "")
            .split(" ");
          //执行翻译请求
          let resultArray = getResultArray(translateArray, state.options);
          state.resultArray = resultArray;
        });
        axios.get("/api/baiduTranslate/" + state.text).then((res) => {
          console.log(res.data);
          let translateArray = res.data.trans_result[0].dst
            .toLowerCase()
            .replace("user's", "user")
            .replace("the ", "")
            .split(" ");
          //执行翻译请求
          let resultArrayBaidu = getResultArray(translateArray, state.options);
          state.resultArrayBaidu = resultArrayBaidu;
        });
      } else {
        alert("请输入纯中文!");
      }
    };

    watchEffect(() => {});
    return {
      state,
      query,
      queryByJs,
    };
  },
};
</script>
<style lang="stylus" scoped>
.warp {
  color: #fff;
}

.warp .search-input {
  padding-left: 10px;
  margin-top: 60px;
  width: 300px;
  height: 40px;
  outline: none;
  background: #0091ff;
  border-radius: 5px;
  border: none;
  color: #ffffff;
  box-shadow: 7px 7px 13px #007ede, -7px -7px 13px #00a4ff;
}

input::-webkit-input-placeholder {
  color: #ffffff;
}

input:-moz-placeholder {
  color: #ffffff;
}

input::-moz-placeholder {
  color: #ffffff;
}

input:-ms-input-placeholder {
  color: #ffffff;
}

.warp .search-btn {
  color: #fff;
  width: 60px;
  height: 40px;
  border-radius: 5px;
  margin-left: 30px;
  border: none;
  outline: none;
  background: #0091ff;
  box-shadow: 7px 7px 13px #0078d4, -7px -7px 13px #00aaff;
}

.warp .search-btn:hover {
  background: linear-gradient(145deg, #009bff, #0083e6);
  box-shadow: 7px 7px 13px #0078d4, -7px -7px 13px #00aaff;
}

.resultWrap {
  margin: 0 auto;
  width: 400px;
  background: linear-gradient(145deg, #009bff, #0083e6);
  box-shadow: 7px 7px 13px #0078d4, -7px -7px 13px #00aaff;
  padding: 20px;
}

.resultWrap li {
  list-style: none;
}
</style>
