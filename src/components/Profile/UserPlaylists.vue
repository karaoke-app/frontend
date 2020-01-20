<template>
  <main class="container">
    <div class="is-bordered is-rounded">
      {{playlists}}
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Playlist",
  mounted() {
    this.$store.dispatch("fetchPlaylists", this.profile.name);
    this.$store.dispatch("fetchProfile", this.$route.params.user_id);
  },
  computed: {
    ...mapGetters(["playlists", "profile"])
  }
};
</script>

<style scoped></style>
