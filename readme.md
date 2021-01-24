# 变量名神器ValGod
使用技术：
- 框架：vue-next
- 构建工具：vite
- 复制粘贴插件：clipboard.js
- 请求库：axios
- 在线地址：[http://isfive.gitee.io/vite-programer/](http://isfive.gitee.io/vite-programer/)
- 在线地址：[备用地址](https://valgod.vercel.app/)
# 私有部署
## 配合后端java（推荐）
后端接口：[https://github.com/qiuquanwu/vite-programer-backend](https://github.com/qiuquanwu/vite-programer-backend)

## 内部搭建配置（纯js）：
修改src/config/index.js
[注册有道云翻译api，百度云api的教程](https://github.com/qiuquanwu/vite-programer-backend/blob/master/readme.md)
```javascript
// 有道应用配置
export const YD_APP_KEY = "78ab6bc4c8f5e1a5"
export const YD_KEY ='jYOJPLr0Mu9rCp77YAMWGYX1GirBe92w'
// 百度应用配置
export const BD_APP_ID = '20200811000539625'
export const BD_KEY = 'qoLUfDJ1scEIdj3RitFC'
```
# 更新日志
## 2021年1月21日 18点08分
- 实现按需加载antd-vue
## 2021年1月20日 13点55分
- ui改版（2.0版本）
![](./img/demov3.png)
## 2021年1月18日 18点45分
- 优化体验
## 2021年1月17日 19点03分
- 升级到vite2.x
## 2021年1月13日 17点48分
- 历史查询记录
## 2021年1月10日 07点48分
- 按下回车触发
- 取消alert提示
![](./img/demov1.png)




