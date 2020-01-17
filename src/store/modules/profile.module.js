import api from "@/api";

const state = {
  profile: {
    name: null,
    avatar: null
  },
  // profilePlaylists: [],
  // profileSongs: [],
  isLoadingProfile: false,
  profileLoadingError: null
};

const getters = {
  profile() {
    return state.profile;
  }
};

const mutations = {
  fetchProfileStart(state){
    state.isLoadingProfile = true;
  },
  setProfile(state, profile) {
    state.profile = profile;
    state.isLoadingProfile = false;
  },
  fetchProfileError(state, error){
    state.profileLoadingError = error;
  }
};

const actions = {
  fetchProfile({ commit }, user_id) {
    commit("fetchProfileStart");
    return new Promise((resolve, reject) => {
      api({
        url: `users/${user_id.user_id}`,
        method: "GET"
      })
        .then(resp => {
          commit("setProfile", resp.data);
          resolve(resp);
        })
        .catch(err => {
          commit("fetchProfileError", err);
          reject(err);
        });
    });
  }
};

export default {
  actions,
  state,
  getters,
  mutations
};
