import Vue from "vue";
import VueAuthenticate from "vue-authenticate";

Vue.use(VueAuthenticate, {
  baseUrl: "http://localhost:8081/api",

  providers: {
    facebook: {
      clientId: process.env.VUE_APP_FACEBOOK_CLIENT_ID,
      redirectUri: "http://localhost:8081/auth/callback"
    },
    google: {
      clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
      redirectUri: "http://localhost:8081/auth/callback"
    }
  }
});
