<template>
  <main>
    <section class="hero is-primary is-bold">
      <div class="hero-body has-text-centered">
        <figure class="image is-128x128">
          <img
            class="is-rounded"
            src="https://bulma.io/images/placeholders/128x128.png"
            alt="User's avatar"
          />
        </figure>
        <div class="container">
          <p class="title">
            {{ profile.name }}
          </p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <b-menu class="column is-2">
            <b-menu-list label="Menu">
              <b-menu-item
                tag="router-link"
                :to="{ name: 'userSongs' }"
                aria-role="list"
                icon="music"
                label="Songs"
              />
              <b-menu-item
                tag="router-link"
                :to="{ name: 'userPlaylists' }"
                aria-role="list"
                icon="list"
                label="Playlists"
              />
              <b-menu-item
                v-if="isCurrentUser"
                tag="router-link"
                :to="{ name: 'settings' }"
                aria-role="list"
                icon="cog"
                label="Settings"
              />
            </b-menu-list>
          </b-menu>
          <div class="column">
            <router-view />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "profile",
  components: {},
  data() {
    return {
      isActive: true,
      userName: "john"
    };
  },
  mounted() {
    this.$store.dispatch("fetchProfile", this.$route.params);
  },

  computed: {
    ...mapGetters(["profile", "isLogged", "currentUser"]),

    isCurrentUser: function() {
      return this.currentUser.id === this.profile.id;
    }
  },
  watch: {
    $route(to) {
      this.$store.dispatch("fetchProfile", to.params);
    }
  }
};
</script>

<style scoped>
.hero-body {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.title {
  margin-top: 1.5rem;
}
</style>
