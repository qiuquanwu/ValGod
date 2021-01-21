import { createApp } from "vue";
import { Animal } from "./animal";
import App from "./App.vue";
import { Button, Col, Row, Input, Icon, Card, Checkbox } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "./index.css";

const app = createApp(App);
app.config.productionTip = false;

app.use(Button).use(Col).use(Row).use(Input).use(Icon).use(Card).use(Checkbox);
app.mount("#app");
new Animal("猫咪").eat();
