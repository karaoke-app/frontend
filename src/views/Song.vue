<template>
  <main>
    <KaraokeModule
      :provider="song.provider_id"
      :embed-id="song.video_id"
      :cues="song.cues"
      :key="song.video_id"
      @ended="songEnded = true"
    />

    <Playlist
      v-if="$route.query.playlist_id > 0"
      :songId="song.id"
      :playlistId="$route.query.playlist_id"
      :ended="songEnded"
    />

    <header class="section">
      <div class="container">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <h4 class="title is-4">{{ heading }}</h4>
            </div>

            <div class="level-item">{{ song.plays }} plays</div>
          </div>

          <div class="level-right">
            <div class="level-item">
              <span class="icon is-medium avatar">
                <i class="fas fa-user"/>
              </span>

              <router-link :to="profileLink">{{ song.user.name }}</router-link>
            </div>

            <div class="level-item" v-if="$store.getters.isLogged">
              <b-tooltip label="Report" type="is-dark"
                ><b-button type="is-text" @click="reportModal"
                  ><i class="fas fa-exclamation-triangle"/></b-button
              ></b-tooltip>
            </div>
          </div>
        </div>

        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <SongRate :songId="song.id"/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item" v-if="$store.getters.isLogged">
              <SongAddToPlaylist
                :songId="song.id"
                v-if="$store.getters.isLogged"
              />
            </div>
          </div>
        </div>
      </div>
    </header>

    <SongSuggestions :artist="song.artist" :key="song.artist"/>
  </main>
</template>

<script>
import KaraokeModule from "@/components/KaraokeModule.vue";
import ReportModal from "@/components/ReportModal.vue";
import SongSuggestions from "@/components/SongSuggestions.vue";
import SongAddToPlaylist from "@/components/SongAddToPlaylist.vue";
import Playlist from "@/components/Playlist.vue";
import SongRate from "@/components/SongRate.vue";
import { mapGetters } from "vuex";
import store from "@/store";

export default {
  components: {
    KaraokeModule,
    SongSuggestions,
    SongAddToPlaylist,
    Playlist,
    SongRate
  },

  data() {
    return {
      songEnded: false
    };
  },

  title() {
    return this.heading;
  },

  beforeRouteEnter(to, from, next) {
    store.dispatch("fetchSong", to.params.songId).then(next);
  },

  beforeRouteUpdate(to, from, next) {
    this.songEnded = false;
    store.dispatch("fetchSong", to.params.songId).then(next);
  },
  computed: {
    ...mapGetters(["song"]),
    heading() {
      return `${this.song.artist} - ${this.song.title}`;
    },
    profileLink: function() {
      return {
        name: "userSongs",
        params: {
          user_id: this.song.user.id
        }
      };
    },
  },

  methods: {
    reportModal() {
      const songId = this.song.id;

      this.$buefy.modal.open({
        parent: this.$root,
        component: ReportModal,
        hasModalCard: true,
        props: {
          songId
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.suggestions {
  padding-top: 0;
}

.avatar {
  margin-right: 0.5em;
}
</style>
