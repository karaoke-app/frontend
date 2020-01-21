<template>
  <main class="container">
    <div v-for="playlist in playlists" :key="playlist.id">
      <b-button
        tag="router-link"
        type="is-link"
        :to="{ name: 'song', params: { songId: playlist.songs[0].song_id } }"
        class="button button-borders is-primary"
      >
        {{ playlist.name }}
      </b-button>
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
          :song="modifier(song)"
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
      this.$store.commit("setCurrentUser");
      return this.currentUser.id == this.$route.params.user_id;
    }
  },
  methods: {
    deletePlaylist(id) {
      this.$store.dispatch("deletePlaylist", id);
    },
    modifier(data) {
      let song = {
        id: data.song_id,
        title: data.title,
        artist: data.artist
      };
      return song;
    }
  }
};
</script>

<style scoped>
.button-borders {
  border-radius: 10px 10px 0 0;
}
</style>
