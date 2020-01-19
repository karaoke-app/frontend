import Vue from "vue";
import Buefy from "buefy";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "buefy/dist/buefy.css";
import "./assets/bulma-social.min.css";
import "./vee-validate";
import VueProgressBar from "vue-progressbar";
import VueAuthenticate from "vue-authenticate";
import titleMixin from "@/utils/title.mixin.js";
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

Vue.use(VueAuthenticate, {
  baseUrl: "http://localhost:8081/api",

  providers: {
    facebook: {
      clientId: "606364486601221",
      redirectUri: "http://localhost:8081/auth/callback"
    },
    google: {
      clientId:
        "670229079815-13cl9rvb12ldorugjj3v71vg9nadpetd.apps.googleusercontent.com",
      redirectUri: "http://localhost:8081/auth/callback"
    }
  }
});

Vue.mixin(titleMixin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
