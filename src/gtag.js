import Vue from "vue";
import VueGtag from "vue-gtag";
import router from "./router";

Vue.use(
  VueGtag,
  {
    config: { id: process.env.VUE_APP_GTAG },
    pageTrackerTemplate(to) {
      return {
        page_title: document.title,
        page_path: to.path
      };
    }
  },
  router
);
