<template>
  <b-dropdown position="is-bottom-left" trap-focus @active-change="onToggle">
    <b-button type="is-secondary" slot="trigger">Add to playlist</b-button>

    <b-dropdown-item
      :focusable="false"
      custom
      paddingless
      style="min-width: 300px"
    >
      <b-field class="new-playlist-field">
        <b-input
          placeholder="Playlist name"
          expanded
          v-model="name"
          @keyup.enter.native="create()"
        ></b-input>
        <p class="control">
          <b-button type="is-primary" @click="create()">Create</b-button>
        </p>
      </b-field>
      <ul class="menu menu-list">
        <li
          v-for="playlist in playlists"
          :key="playlist.id"
          @click="add(playlist.id)"
        >
          <a v-if="!playlist.added">
            <span class="icon"><i class="fas fa-plus"></i></span>
            {{ playlist.name }}
          </a>
          <a v-else class="has-background-white-ter has-text-grey">
            <span class="icon"><i class="fas fa-check"></i></span>
            {{ playlist.name }}
          </a>
        </li>
      </ul>

      <b-loading :is-full-page="false" :active.sync="isLoading"></b-loading>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { success } from "@/utils/toasts.js";

export default {
  name: "SongAddToPlaylist",

  props: ["songId"],

  data() {
    return {
      name: "",
      isLoading: true,
      playlists: []
    };
  },

  methods: {
    async loadPlaylists() {
      this.isLoading = true;
      const res = await this.$http.get("playlists");
      this.isLoading = false;
      this.playlists = res.data;
    },

    onToggle(active) {
      if (!active || this.playlists.length > 0) {
        return;
      }
      this.loadPlaylists();
    },

    async create() {
      this.isLoading = true;
      const res = await this.$http.post("playlists", {
        name: this.name
      });
      if (res.data.success && res.data.success == true) {
        success("Playlist created");
      }
      this.loadPlaylists();
    },

    async add(playlistId) {
      this.isLoading = true;
      const res = await this.$http.post(
        `playlists/${playlistId}/${this.songId}`
      );
      if (res.data.success && res.data.success == true) {
        success("Succesfully added to playlist");
      }
      this.loadPlaylists();
    }
  }
};
</script>

<style lang="scss" scoped>
.new-playlist-field {
  padding: 0.3em 0.8em;
  margin: 0;
  margin-bottom: 0.3em;
}
</style>
