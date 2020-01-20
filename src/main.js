import Vue from "vue";
import Buefy from "buefy";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "buefy/dist/buefy.css";
import "./assets/bulma-social.min.css";
import "./vee-validate";
import VueProgressBar from "vue-progressbar";
import titleMixin from "@/utils/title.mixin.js";
import "@/gtag.js";
import "@/social.js";
import api from "./api";

Vue.config.productionTip = false;

Vue.use(Buefy, {
  defaultIconPack: "fas"
});

Vue.use(VueProgressBar, {
  color: "#23d160",
  thickness: "6px"
});

Vue.prototype.$http = api;

Vue.mixin(titleMixin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
