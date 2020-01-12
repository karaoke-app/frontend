import api from "@/api";

const state = {
  categories: [],
  songs: [],
  isLoadingList: false,
  filters: {}
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
  },
  filters() {
    return state.filters;
  },
  isFiltered() {
    return (
      state.filters.sort !== "date_asc" ||
      state.filters.category ||
      state.filters.query
    );
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
  },
  setFilters(state, filters) {
    state.filters = { ...state.filters, ...filters };
  },
  resetFilters(state) {
    mutations.setFilters(state, {
      sort: "date_asc",
      category: null,
      query: null
    });
  }
};

const actions = {
  fetchSongs({ commit }) {
    commit("fetchStart");
    return new Promise((resolve, reject) => {
      api
        .get("songs", {
          params: state.filters
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
    const res = await api.get("categories");
    commit("setCategories", res.data);
  }
};

mutations.resetFilters(state);

export default {
  actions,
  state,
  getters,
  mutations
};
