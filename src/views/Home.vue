<template>
  <main>
    <section class="hero is-primary is-large hero-home">
      <div class="hero-head">
        <Navbar homepage="true" />
      </div>

      <div class="hero-body">
        <div class="container">
          <h1 class="title">karaoke-app</h1>
          <b-button
            tag="router-link"
            to="/catalog"
            class="is-primary is-inverted"
            >Sing along</b-button
          >
        </div>
      </div>

      <div class="hero-foot"></div>
    </section>

    <section class="section home-section">
      <div class="container">
        <h3 class="subtitle is-4">New songs</h3>
        <transition-group name="fade" tag="div" class="columns is-multiline">
          <div
            class="column is-half-tablet is-one-quarter-desktop"
            v-for="song in songs.slice(0, 4)"
            :key="song.id"
          >
            <SongThumbnail :song="song"></SongThumbnail>
          </div>
        </transition-group>
        <transition name="fade">
          <div class="has-text-right" v-if="!isLoading">
            <b-button class="is-primary" tag="router-link" to="/catalog">
              See more »
            </b-button>
          </div>
        </transition>
      </div>
    </section>
  </main>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import SongThumbnail from "@/components/Catalog/SongThumbnail.vue";

export default {
  components: {
    Navbar,
    SongThumbnail
  },

  data() {
    return {
      songs: [],
      isLoading: true
    };
  },

  async created() {
    const resp = await this.$http.get("songs?sort=date_desc");
    this.songs = resp.data.data;
    this.isLoading = false;
  }
};
</script>

<style lang="scss" scoped>
.hero-home {
  background-image: url("../assets/woman_holding_microphone.jpg");
  background-position: center;
  background-size: cover;
}

.home-section {
  min-height: 32em;
}
</style>
