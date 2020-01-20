<template>
  <div class="playlist-wrapper">
    <div class="mode-switch">
      <b-switch class="has-text-grey-light" v-model="shuffle">Shuffle</b-switch>
    </div>
    <section
      class="playlist has-background-black has-text-white-ter"
      ref="playlist"
      v-if="playlist.length > 0"
    >
      <router-link
        :to="songLink(song.song_id)"
        v-for="song in playlist"
        :key="song.song_id"
        tag="a"
        class="playlist-thumbnail"
        :class="{ active: song.song_id == songId }"
      >
        <img src="../assets/default_thumbnail.png" />
        <div class="song-title">{{ song.artist }} - {{ song.title }}</div>
      </router-link>
    </section>
  </div>
</template>

<script>
import { error as errorToast } from "@/utils/toasts.js";

export default {
  name: "Playlist",

  props: ["playlistId", "songId", "ended"],

  data() {
    return {
      playlist: [],
      currentIndex: null,
      shuffle: false
    };
  },

  async mounted() {
    try {
      const res = await this.$http.get(`playlists/${this.playlistId}`);
      this.playlist = res.data.playlist;
      this.setCurrentIndex();
      this.scrollToCurrentThumbnail();
    } catch (err) {
      errorToast("Couldn't load the playlist");
    }
  },

  methods: {
    songLink(id) {
      return {
        name: "song",
        params: { songId: id },
        query: { playlist_id: this.playlistId }
      };
    },

    nextSong() {
      const nextSong = this.playlist[this.currentIndex + 1];
      if (typeof nextSong !== "undefined") {
        this.$router.push(this.songLink(nextSong.song_id));
      }
    },

    randomSong() {
      if (this.playlist.length < 2) {
        return;
      }
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * this.playlist.length);
      } while (randomIndex == this.currentIndex);
      const songId = this.playlist[randomIndex].song_id;
      this.$router.push(this.songLink(songId));
    },

    scrollToCurrentThumbnail() {
      this.$nextTick(() => {
        const currentElement = this.$refs.playlist.children[this.currentIndex];
        currentElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "end"
        });
      });
    },

    setCurrentIndex(val) {
      this.currentIndex = this.playlist.findIndex(song => {
        return song.song_id == (val ? val : this.songId);
      });
    }
  },

  watch: {
    ended: function(val) {
      if (val) {
        this.shuffle ? this.randomSong() : this.nextSong();
      }
    },

    songId: function(val) {
      this.setCurrentIndex(val);

      setTimeout(() => {
        this.scrollToCurrentThumbnail();
      }, 150);
    }
  }
};
</script>

<style lang="scss" scoped>
.playlist-wrapper {
  position: relative;
}

.mode-switch {
  position: absolute;
  top: -2.5em;
  right: 1em;
}

.playlist {
  overflow-x: scroll;
  display: flex;
  height: 12em;
}

.playlist-thumbnail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 100%;
  min-width: 14em;
  width: 14em;
  padding: 0em 2em;
  opacity: 0.5;
  transition: opacity 0.2s ease-out;
  color: lightgray;

  > img {
    height: 6em;
    object-fit: cover;
  }

  .song-title {
    margin-top: 0.5em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    opacity: 1;
  }

  &.active {
    opacity: 1;
    background: rgba(255, 255, 255, 0.08);
  }
}
</style>
