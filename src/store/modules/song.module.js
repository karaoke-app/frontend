import api from "@/api";

const state = {
  song: {},
  isLoadingSong: false,
  songError: null
};

const getters = {
  song() {
    return state.song;
  }
};

const mutations = {
  fetchSongStart(state) {
    state.isLoadingSong = true;
  },
  fetchSongEnd(state, song) {
    state.isLoadingSong = false;
    state.song = song;
  },
  fetchSongErr(state, err) {
    state.isLoadingSong = false;
    state.songError = err;
  }
};

const actions = {
  fetchSong({ commit }, songId) {
    commit("fetchSongStart");
    return new Promise(resolve => {
      api({
        url: `songs/${songId}`,
        method: "GET"
      })
        .then(resp => {
          commit("fetchSongEnd", resp.data.song);
          resolve(resp);
        })
        .catch(err => {
          commit("fetchSongErr", err);
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
