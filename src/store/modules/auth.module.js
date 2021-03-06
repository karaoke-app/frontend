import api from "@/api";
import * as jwt_decode from "jwt-decode";

const state = {
  status: "",
  token: localStorage.getItem("token") || "",
  currentUser: {
    id: null,
    name: null,
    admin: false
  }
};

const getters = {
  currentUser() {
    return state.currentUser;
  },
  isLogged() {
    return state.token;
  },
  authStatus() {
    return state.status;
  },
  isAdmin() {
    return state.currentUser.admin;
  }
};
const mutations = {
  setCurrentUser(state) {
    state.currentUser = {
      id: jwt_decode(localStorage.getItem("token")).sub,
      name: jwt_decode(localStorage.getItem("token")).name,
      admin: jwt_decode(localStorage.getItem("token")).is_admin
    };
  },
  auth_request(state) {
    state.status = "loading";
  },
  auth_success(state, token) {
    state.status = "success";
    state.token = token;
    state.currentUser = {
      id: jwt_decode(token).sub,
      name: jwt_decode(token).name,
      admin: jwt_decode(token).is_admin
    };
  },
  auth_error(state) {
    state.status = "error";
  },
  logout(state) {
    state.status = "";
    state.token = "";
  },
  clearCurrentUser(state) {
    state.currentUser = {
      id: null,
      name: null,
      admin: false
    };
  }
};
const actions = {
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      // The Promise used for router redirect in login
      commit("auth_request");
      api({ url: "login", data: user, method: "POST" })
        .then(resp => {
          const token = resp.data.access_token;
          localStorage.setItem("token", token); // store the token in localstorage
          api.defaults.headers["Authorization"] = `Bearer ${token}`;
          commit("auth_success", token);
          resolve(resp);
        })
        .catch(err => {
          commit("auth_error", err);
          localStorage.removeItem("token"); // if the request fails, remove any possible user token if possible
          reject(err);
        });
    });
  },
  register({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      api({
        url: "register",
        data: user,
        method: "POST"
      })
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          commit("auth_error", err);
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  logout({ commit }) {
    return new Promise(resolve => {
      commit("logout");
      localStorage.removeItem("token");
      delete api.defaults.headers["Authorization"];
      resolve();
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
