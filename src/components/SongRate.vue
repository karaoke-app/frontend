<template>
  <div class="rate-wrapper" v-if="$store.getters.isLogged">
    <b-rate
      icon-pack="fas"
      spaced
      :custom-text="numberOfVotes"
      show-score
      @change="vote"
      :disabled="disabled"
    />

    <b-loading :is-full-page="false" :active="isLoading">
      <b-icon
        pack="fas"
        icon="spinner"
        size="is-small"
        custom-class="fa-spin"
      ></b-icon>
    </b-loading>
  </div>
</template>

<script>
import {
  error as errorToast,
  success as successToast
} from "@/utils/toasts.js";

export default {
  name: "SongRate",

  props: ["songId"],

  data() {
    return {
      isLoading: true,
      votes: 0,
      disabled: false
    };
  },

  computed: {
    numberOfVotes() {
      return this.isLoading ? "" : `out of ${this.votes} votes`;
    }
  },

  created() {
    this.fetchRating();
  },

  methods: {
    async fetchRating() {
      this.isLoading = false;
    },

    async vote(value) {
      this.isLoading = true;
      try {
        await this.$http.post(`songs/${this.songId}/ratings`, {
          rate: value
        });
        successToast("Thanks!");
      } catch (err) {
        errorToast("Couldn't vote");
      }
      this.isLoading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.rate-wrapper {
  position: relative;
  height: 1.5em;
}
</style>
