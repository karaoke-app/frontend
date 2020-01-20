<template>
  <div class="rate-wrapper">
    <b-rate
      icon-pack="fas"
      spaced
      :custom-text="numberOfVotes"
      @change="vote"
      :disabled="!canVote"
      v-model="stars"
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
      stars: 0,
      votes: 0,
      voted: false
    };
  },

  computed: {
    numberOfVotes() {
      return this.isLoading ? "" : `(out of ${this.votes} votes)`;
    },

    canVote() {
      return this.$store.getters.isLogged ? !this.voted : false;
    }
  },

  created() {
    this.fetchRating();
  },

  methods: {
    async fetchRating() {
      this.isLoading = true;
      try {
        const res = await this.$http.get(`ratings/${this.songId}`);
        const ratings = res.data.ratings;
        this.stars = ratings.avg;
        this.votes = ratings.count;
        this.voted = ratings.voted;
      } catch (err) {
        errorToast("Couldn't load rating");
      }
      this.isLoading = false;
    },

    async vote(value) {
      this.isLoading = true;
      try {
        await this.$http.post(`songs/${this.songId}/ratings`, {
          rate: value
        });
        successToast("Thanks!");
        this.fetchRating();
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
