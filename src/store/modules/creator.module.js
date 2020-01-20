import api from "@/api";

const state = {
  cues: [],
  video: {
    provider: "",
    embedId: ""
  },
  artist: "",
  title: "",
  categories: []
};

const getters = {
  cues() {
    return state.cues;
  },

  video() {
    return state.video;
  },

  selectedCategories() {
    return state.categories;
  },

  categoriesId() {
    return state.categories.map(category => category.id);
  },

  storeSongData() {
    return {
      title: state.title,
      artist: state.artist,
      cues: state.cues,
      provider_id: state.video.provider,
      video_id: state.video.embedId,
      categories: getters.categoriesId()
    };
  }
};

const mutations = {
  setCues(state, cues) {
    state.cues = cues;
  },

  updateCue(state, { cue, startTime = cue.startTime, endTime = cue.endTime }) {
    cue.startTime = startTime;
    cue.endTime = endTime;
  },

  setVideo(state, video) {
    state.video = video;
  },

  updateArtist(state, artist) {
    state.artist = artist;
  },

  updateTitle(state, title) {
    state.title = title;
  },

  setSelectedCategories(state, categories) {
    state.categories = categories;
  }
};

const actions = {
  storeSong({ getters }) {
    return api({
      url: "songs",
      method: "POST",
      data: getters.storeSongData
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
