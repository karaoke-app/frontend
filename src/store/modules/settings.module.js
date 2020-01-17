import api from "@/api";

const state = {
  settingError: null
};

const getters = {};

const mutations = {
  settingsError(state, err) {
    state.settingsError = err;
  }
};

const actions = {
  // eslint-disable-next-line no-unused-vars
  changeUsername(data) {
    return new Promise((resolve, reject) => {
      api({
        url: ``,
        method: "POST"
      })
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  changePassword(data) {
    return new Promise((resolve, reject) => {
      api({
        url: `password/reset`,
        method: "POST"
      })
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  deleteAccount({ commit }, data) {
    return new Promise((resolve, reject) => {
      api({
        url: `users/${data.user_id}`,
        method: "DELETE",
        data: data.password
      })
        .then(resp => {
          localStorage.removeItem("token");
          resolve(resp);
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
