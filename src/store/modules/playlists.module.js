import api from "@/api";

const state = {
  playlists: {},
  isLoadingPlaylists: false,
  playlistsError: null
};

const getters = {
  playlists() {
    return state.playlists;
  }
};

const mutations = {
  fetchPlaylistsStart(state) {
    state.isLoadingPlaylists = true;
  },
  fetchPlaylistsEnd(state, playlists) {
    state.isLoadingPlaylists = false;
    state.playlists = playlists;
  },
  fetchPlaylistsErr(state, err) {
    state.isLoadingPlaylists = false;
    state.playlistsError = err;
  }
};

const actions = {
  fetchPlaylists({ commit }, username) {
    commit("fetchPlaylistsStart");
    return new Promise(resolve => {
      api({
        url: `playlists/${username}`,
        method: "GET"
      })
        .then(resp => {
          console.log(resp.data);
          commit("fetchPlaylistsEnd", resp.data.playlists);
          resolve(resp);
        })
        .catch(err => {
          commit("fetchPlaylistsErr", err);
          throw new Error(err);
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
