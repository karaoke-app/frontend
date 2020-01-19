<template>
  <main>
    <KaraokeModule
      :provider="song.provider_id"
      :embed-id="song.video_id"
      :cues="song.cues"
      :key="song.video_id"
    />

    <header class="section">
      <div class="container">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <h4 class="title is-4">{{ heading }}</h4>
            </div>

            <div class="level-item">
              <b-rate icon-pack="fas" spaced size="is-small" />
            </div>

            <div class="level-item">{{ song.playCount }} plays</div>
          </div>

          <div class="level-right">
            <div class="level-item">
              <span class="icon is-medium avatar">
                <i class="fas fa-user"></i>
              </span>

              <router-link :to="profileLink">{{ song.user.name }}</router-link>
            </div>

            <div class="level-item">
              <b-tooltip label="Report" type="is-dark"
                ><b-button type="is-text" @click="reportModal"
                  ><i class="fas fa-exclamation-triangle"/></b-button
              ></b-tooltip>
            </div>
          </div>
        </div>
      </div>
    </header>

    <SongSuggestions :artist="song.artist" :key="song.artist"></SongSuggestions>
  </main>
</template>

<script>
import KaraokeModule from "@/components/KaraokeModule.vue";
import ReportModal from "@/components/ReportModal.vue";
import SongSuggestions from "@/components/SongSuggestions.vue";
import { mapGetters } from "vuex";
import store from "@/store";

export default {
  components: { KaraokeModule, SongSuggestions },

  title() {
    return this.heading;
  },

  beforeRouteEnter(to, from, next) {
    store.dispatch("fetchSong", to.params.songId).then(next);
  },

  beforeRouteUpdate(to, from, next) {
    store.dispatch("fetchSong", to.params.songId).then(next);
  },

  computed: {
    ...mapGetters(["song"]),
    heading() {
      return `${this.song.artist} - ${this.song.title}`;
    },
    profileLink() {
      return `/profile/${this.song.user.id}`;
    }
  },

  methods: {
    reportModal() {
      this.$buefy.modal.open({
        parent: this.$root,
        component: ReportModal,
        hasModalCard: true
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
