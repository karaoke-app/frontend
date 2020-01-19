<template>
  <section class="section suggestions">
    <div class="container">
      <h3 class="subtitle is-4">Songs from {{ artist }}</h3>
      <transition-group name="fade" tag="div" class="columns is-multiline">
        <div
          class="column is-half-tablet is-one-quarter-desktop"
          v-for="song in artistSuggestions.slice(0, 4)"
          :key="song.id"
        >
          <SongThumbnail :song="song"></SongThumbnail>
        </div>
      </transition-group>

      <h3 class="subtitle is-4">Latest songs</h3>
      <transition-group name="fade" tag="div" class="columns is-multiline">
        <div
          class="column is-half-tablet is-one-quarter-desktop"
          v-for="song in latestSuggestions.slice(0, 4)"
          :key="song.id"
        >
          <SongThumbnail :song="song"></SongThumbnail>
        </div>
      </transition-group>
    </div>
  </section>
</template>

<script>
import SongThumbnail from "@/components/Catalog/SongThumbnail.vue";
import { mapGetters } from "vuex";

export default {
  components: { SongThumbnail },

  props: ["artist"],

  data() {
    return {
      artistSuggestions: [],
      latestSuggestions: []
    };
  },

  computed: {
    ...mapGetters(["song"])
  },

  async mounted() {
    const values = await Promise.all([
      this.$http.get(`songs?sort=date_desc&query=${this.artist}`),
      this.$http.get(`songs?sort=date_desc`)
    ]);
    this.artistSuggestions = values[0].data.data;
    this.latestSuggestions = values[1].data.data;
  }
};
</script>
