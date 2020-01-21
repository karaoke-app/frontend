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
  },
  deletePlaylist(state, id) {
    let i = state.playlists.map(item => item.id).indexOf(id);
    state.playlists.splice(i, 1);
  }
};

const actions = {
  fetchPlaylists({ commit }, user_id) {
    commit("fetchPlaylistsStart");
    return new Promise(resolve => {
      api({
        url: `playlists/user/${user_id}`,
        method: "GET"
      })
        .then(resp => {
          commit("fetchPlaylistsEnd", resp.data.playlist);
          resolve(resp);
        })
        .catch(err => {
          commit("fetchPlaylistsErr", err);
          throw new Error(err);
        });
    });
  },
  deletePlaylist({ commit }, id) {
    commit("fetchPlaylistsStart");
    return new Promise(resolve => {
      api({
        url: `playlists/${id}`,
        method: "DELETE"
      })
        .then(resp => {
          commit("deletePlaylist", id);
          resolve(resp);
        })
        .catch(err => {
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
