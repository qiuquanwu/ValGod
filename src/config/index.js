// 有道应用配置
export const YD_APP_KEY = "78ab6bc4c8f5e1a5"
export const YD_KEY = 'jYOJPLr0Mu9rCp77YAMWGYX1GirBe92w'
// 百度应用配置
export const BD_APP_ID = '20200811000539625'
export const BD_KEY = 'qoLUfDJ1scEIdj3RitFC'
export let initState = {
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
        "service",
        "interfaceImplementation"
    ], //configurationItem
    resultArray: [],
    resultArrayBaidu: [],
    hasBaidu: true,
    hasYoudao: true,
    historicalDatas: [],
    showHistory: true,
    lastText: ""
};
export let optionState={
    bigHumpNaming:true,
    smallHumpNaming:true,
    underlineNaming:true,
    constant:true,
    php:true,
    controller:true,
    cssStyle:true,
    service:true,
    interfaceImplementation:true
}
