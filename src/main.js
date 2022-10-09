import Vue from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";
import "material-design-icons-iconfont/dist/material-design-icons.css";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";

Vue.use(PiniaVuePlugin);

export const pinia = createPinia();

new Vue({
  pinia,
  router,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
