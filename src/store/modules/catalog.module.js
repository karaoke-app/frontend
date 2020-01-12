import api from "@/api";

const state = {
  categories: [],
  songs: [],
  isLoadingList: false,
  filters: {
    sortBy: null,
    category: null,
    query: null
  }
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
      api({
        url: "songs",
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
    const res = await api.get("/categories");
    commit("setCategories", res.data);
  }
};

export default {
  actions,
  state,
  getters,
  mutations
};
