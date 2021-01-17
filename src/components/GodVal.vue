<template>
  <div class="warp">
    <h1>
      {{ msg }}
      <a href="https://gitee.com/isfive/vite-programer/stargazers">
        <img
          src="https://gitee.com/isfive/vite-programer/badge/star.svg?theme=dark"
          alt="star"
        />
      </a>
    </h1>
    <input
      type="text"
      v-model="state.text"
      :placeholder="inputPlaceholder"
      class="search-input"
      @keydown="clickOnEnter"
      @focus="getFocus"
    />
    <button @click="queryByJs" class="search-btn">确定</button>
    <button @click="toggerSetting" class="search-btn">设置</button>
    <!-- 设置开始 -->
    <div
      class="custom-control custom-checkbox"
      style="margin-top: 30px"
      v-show="openSetting"
    >
      <input
        type="checkbox"
        class="custom-control-input"
        id="youdao"
        v-model="state.hasYoudao"
      />
      <label class="custom-control-label" for="youdao">有道</label>
      <input
        type="checkbox"
        class="custom-control-input"
        id="baidu"
        v-model="state.hasBaidu"
      />
      <label class="custom-control-label" for="baidu">百度</label>
      <input
        type="checkbox"
        class="custom-control-input"
        id="history"
        v-model="state.showHistory"
      />
      <label class="custom-control-label" for="history">历史查询</label>
    </div>
    <!-- 当前查询结果开始 -->
    <div class="resultWrapBox">
      <div style="margin-top: 30px" class="resultWrap" v-if="state.hasYoudao">
        有道云
        <ul>
          <li v-for="item in state.resultArray" :key="item.id">
            <result-item :resultItme="item" />
          </li>
        </ul>
      </div>
      <div style="margin-top: 30px" class="resultWrap" v-if="state.hasBaidu">
        百度
        <ul>
          <li v-for="item in state.resultArrayBaidu" :key="item.id">
            <result-item :resultItme="item" />
          </li>
        </ul>
      </div>
    </div>
    <!-- 当前查询结果结束 -->
    <!-- 历史记录 -->
    <div style="margin-top: 30px" v-show="state.showHistory">
      历史记录
      <div
        class="resultWrapBox"
        v-for="(historicalData, index) in state.historicalDatas"
        :key="index"
      >
        <div style="margin-top: 30px" class="resultWrap" v-if="state.hasYoudao">
          有道云
          <ul>
            <li v-for="item in historicalData.resultArray" :key="item.id">
              <result-item :resultItme="item" />
            </li>
          </ul>
        </div>
        <div style="margin-top: 30px" class="resultWrap" v-if="state.hasBaidu">
          百度
          <ul>
            <li v-for="item in historicalData.resultArrayBaidu" :key="item.id">
              <result-item :resultItme="item" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 历史记录结束 -->
  </div>
</template>

<script>
import { watchEffect, reactive, ref } from "vue";
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
    "cssStyle",
  ], //configurationItem
  resultArray: [],
  resultArrayBaidu: [],
  hasBaidu: true,
  hasYoudao: true,
  historicalDatas: [],
  showHistory: false,
};

// let historicalData={
//   name:"",
//   resultArray:[],
//   resultArrayBaidu:[]
// }
//将翻译转化
const getResultArray = (translateArray, options) => {
  let resultArray = [];
  options.map((tranlateId) => {
    resultArray.push(genetator[tranlateId](translateArray));
  });
  return resultArray;
};
export default {
  name: "GodVal",
  props: {
    msg: String,
  },
  components: {
    ResultItem,
  },
  setup(props) {
    const state = reactive(initState);
    // 初始输入框提示内容
    const inputPlaceholder = ref("请输入内容,再点击确定或者回车");
    //显示设置
    const openSetting = ref(false);
    //获取焦点
    const getFocus = () => {
      //console.log(123);
      inputPlaceholder.value = "";
    };
    //显示设置切换
    const toggerSetting = () => {
      openSetting.value = !openSetting.value;
    };
    // 保存历史数据
    const _saveHistoricalData = () => {
      console.log("保存上次查询得数据");
      if (
        state.resultArray.length === 0 ||
        state.resultArrayBaidu.length === 0
      ) {
        console.log("没有数据需要保存");
        return false;
      } else {
        let historicalData = {
          resultArray: state.resultArray,
          resultArrayBaidu: state.resultArrayBaidu,
        };
        state.historicalDatas.push(historicalData);
      }
      console.log(state.historicalDatas);
    };
    //  通过JS查询
    const queryByJs = () => {
      _saveHistoricalData();
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
              .replace("-", " ")
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
              .replace("-", " ")
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
    // 回车事件
    const clickOnEnter = (e) => {
      var evt = window.event || e;
      if (evt.keyCode == 13) {
        queryByJs();
      }
      // return false
    };
    // 使用java后端api
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

    //watchEffect(() => {});
    return {
      state,
      query,
      queryByJs,
      clickOnEnter,
      inputPlaceholder,
      getFocus,
      openSetting,
      toggerSetting,
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
  margin-top: 30px;
  width: 285px;
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
  margin-left: 15px;
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
  flex: 1;
  margin-left: 30px;
}

.resultWrap li {
  list-style: none;
}

.custom-control-input {
}

.resultWrapBox {
  display: flex;
}

.resultWrapBox {
  display: flex;
  justify-content: center;
  padding: 0 20%;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
