import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { router } from "./router.ts";

const app = createApp(App);

const store = createPinia();

app.use(store);
app.use(router);

app.mount("#app");
