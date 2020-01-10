import axios from "axios";
import { API_URL } from "../../common/config";

const state = {
  categories: [],
  songs: [],
  isLoadingList: false
};

const getters = {
  categories() {
    return state.categories;
  },
  songs() {
    return state.songs;
  },
  isLoadingList() {
    return state.isLoadingList;
  }
};

const mutations = {
  fetchStart(state) {
    state.isLoadingList = true;
  },
  fetchEnd(state, songs) {
    state.songs = songs;
    state.isLoadingList = false;
  },
  setCategories(state, categories) {
    state.categories = categories;
  }
};

const actions = {
  fetchSongs({ commit }) {
    commit("fetchStart");
    return new Promise((resolve, reject) => {
      axios({
        url: API_URL + "/songs",
        method: "GET"
      })
        .then(resp => {
          commit("fetchEnd", resp.data);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  async fetchCategories({ commit }) {
    const res = await axios.get(API_URL + "/categories");
    commit("setCategories", res.data);
  }
};

export default {
  actions,
  state,
  getters,
  mutations
};
