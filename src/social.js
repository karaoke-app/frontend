import Vue from "vue";
import VueAuthenticate from "vue-authenticate";

Vue.use(VueAuthenticate, {
  baseUrl: process.env.VUE_APP_BASE_URL,

  providers: {
    facebook: {
      clientId: process.env.VUE_APP_FACEBOOK_CLIENT_ID,
      redirectUri: process.env.VUE_APP_SOCIAL_REDIRECT
    },
    google: {
      clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
      redirectUri: process.env.VUE_APP_SOCIAL_REDIRECT
    }
  }
});
