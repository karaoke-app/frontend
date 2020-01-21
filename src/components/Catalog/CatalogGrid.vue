<template>
  <div class="columns is-multiline" v-if="songs.length > 0">
    <SongThumbnail
      :song="song"
      class="column is-4"
      v-for="song in songs"
      :key="song.id"
    />
  </div>
  <div v-else-if="!isLoadingList">Can't find any song.</div>
</template>

<script>
import { mapGetters } from "vuex";
import SongThumbnail from "./SongThumbnail";

export default {
  name: "List-Table",
  components: { SongThumbnail },
  props: { user_id: { type: Number, default: 0 } },
  data() {
    return {};
  },
  mounted() {
    this.fetchSongs();
  },
  methods: {
    fetchSongs() {
      if (this.user_id === 0) {
        this.$store.dispatch("fetchSongs");
      } else {
        this.$store.dispatch("fetchUserSongs", this.$route.params.user_id)
      }
    }
  },
  computed: {
    ...mapGetters(["selectedGenres", "songs", "isLoadingList"])
  }
};
</script>

<style scoped lang="scss"></style>
