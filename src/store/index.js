import Vue from "vue";
import Vuex from "vuex";

import creator from "./modules/creator.module";
import catalog from "./modules/catalog.module";
import song from "./modules/song.module";
import auth from "./modules/auth.module";
import profile from "./modules/profile.module";
import settings from "./modules/settings.module";
import playlists from "./modules/playlists.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    creator,
    catalog,
    song,
    auth,
    profile,
    settings,
    playlists
  }
});
