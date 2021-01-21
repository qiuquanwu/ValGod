import {
    createApp
} from "vue";
import App from "./App.vue";
import {
    Button,
    Col,
    Row,
    Input,
    Icon,
    Card,
    Checkbox,
    Divider
} from "ant-design-vue";
// import Antd from "ant-design-vue"
import "ant-design-vue/dist/antd.css";
import "./index.css";

const app = createApp(App);
app.config.productionTip = false;

app.use(Button).use(Col).use(Row).use(Input).use(Icon).use(Card).use(Checkbox).use(Divider);
// app.use(Antd)
app.mount("#app");
let styleOne = "color:white;background-color:black;font-size:48px;padding:5px;font-wight:blod;",
    styleTwo = "color:black;background-color:#FF9900;font-size:48px;padding:5px;font-wight:blod"
console.log("%cVal%cGod", styleOne, styleTwo)