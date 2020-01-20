import api from "@/api";

const state = {
  settingError: null
};

const getters = {};

const mutations = {
  settingsError(state, err) {
    state.settingsError = err;
  },
};

const actions = {
  changeUsername({ commit }, params) {
    return new Promise((resolve, reject) => {
      api({
        url: `users/username`,
        method: "PUT",
        data: params
      })
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          commit("settingsError", err);
          reject(err);
        });
    });
  },
  changePassword({ commit }, params) {
    return new Promise((resolve, reject) => {
      api({
        url: `users/password`,
        method: "PUT",
        data: params
      })
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          commit("settingsError", err);
          reject(err);
        });
    });
  },
  deleteAccount({ commit }, params) {
    return new Promise((resolve, reject) => {
      api({
        url: `users/${params.name}`,
        method: "DELETE"
      })
        .then(resp => {
          localStorage.removeItem("token");
          resolve(resp);
          commit("clearCurrentUser");
          commit("logout");
        })
        .catch(err => {
          commit("settingsError", err);
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
