<template>
  <main class="container">
    <div v-for="playlist in playlists" :key="playlist.id">
      <div class="button button-borders is-primary">
        {{ playlist.name }}
      </div>
      <b-button
        v-if="isCurrentUser"
        class="button-borders is-danger"
        @click="deletePlaylist(playlist.id)"
      >
        Delete
      </b-button>
      <hr class="is-marginless" />
      <div class="is-full columns playlist">
        <SongThumbnail
          :song="song"
          :song_id="song.song_id"
          class="column is-4"
          v-for="song in playlist.songs.slice(0, 3)"
          :key="song.song_id"
        />
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import SongThumbnail from "../Catalog/SongThumbnail";

export default {
  name: "Playlist",
  components: {
    SongThumbnail
  },
  mounted() {
    this.$store.dispatch("fetchPlaylists", this.$route.params.user_id);
  },
  computed: {
    ...mapGetters(["playlists", "currentUser"]),
    isCurrentUser: function() {
      return this.currentUser.id === this.$route.params.user_id;
    },
  },
  methods: {
    deletePlaylist(id) {
      this.$store.dispatch("deletePlaylist", id);
    }
  }
};
</script>

<style scoped>
.button-borders {
  border-radius: 10px 10px 0 0;
}
</style>
