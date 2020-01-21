<template>
  <main>
    <section class="hero is-primary is-bold">
      <div class="hero-body has-text-centered">
        <div class="avatar-circle has-background-success">
          <span class="initials" v-if="profile.name">
            {{ profile.name | initials }}</span
          >
        </div>
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
                active-class="is-active"
                icon="music"
                label="Songs"
              />
              <b-menu-item
                tag="router-link"
                :to="{ name: 'userPlaylists' }"
                aria-role="list"
                active-class="is-active"
                icon="list"
                label="Playlists"
              />
              <b-menu-item
                v-if="isCurrentUser"
                tag="router-link"
                :to="{ name: 'settings' }"
                aria-role="list"
                active-class="is-active"
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
      userName: null,
      initial: null
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
  },

  filters: {
    initials: function(value) {
      return value.charAt(0).toUpperCase();
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
.avatar-circle {
  width: 100px;
  height: 100px;
  text-align: center;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
}
.initials {
  position: relative;
  top: 25px; /* 25% of parent */
  font-size: 50px; /* 50% of parent */
  line-height: normal;
  color: #fff;
  font-family: "Courier New", monospace;
  font-weight: bold;
}
</style>
