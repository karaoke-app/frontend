import api from "@/api";

const state = {
  categories: [],
  songs: [],
  isLoadingList: false,
  filters: {},
  paginationMeta: {}
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
      state.filters.sort !== "date_desc" ||
      state.filters.category ||
      state.filters.query
    );
  },
  paginationMeta() {
    return state.paginationMeta;
  }
};

const mutations = {
  songsFetchStart(state) {
    state.isLoadingList = true;
  },
  songsFetchEnd(state, data) {
    state.songs = data.data;
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
      sort: "date_desc",
      category: null,
      query: null
    });
  },
  setPaginationMeta(state, meta) {
    state.paginationMeta = { ...state.paginationMeta, ...meta };
  }
};

const actions = {
  async fetchSongs({ commit }) {
    commit("songsFetchStart");

    const res = await api.get("songs", {
      params: { ...state.filters, page: state.paginationMeta.currentPage }
    });

    commit("songsFetchEnd", res.data);
    commit("setPaginationMeta", {
      currentPage: res.data.current_page,
      perPage: res.data.per_page,
      total: res.data.total
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
