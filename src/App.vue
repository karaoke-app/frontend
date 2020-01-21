<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>

    <Navbar v-if="!homePage" />

    <router-view />

    <footer class="footer content has-text-centered">
      <p>karaoke-app</p>
      <p>
        <a href="https://github.com/karaoke-app/frontend">
          <i class="fab fa-github fa-2x"></i>
        </a>
      </p>
      <p>
        <small>
          Home cover photo by
          <a href="https://unsplash.com/@forja2">Forja2 Mx</a>
        </small>
      </p>
    </footer>
  </div>
</template>

<style lang="scss">
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

footer.footer {
  margin-top: auto;
}

#app > main {
  flex: 1;
}

.modal-close {
  background-color: rgba(10, 10, 10, 0.2) !important;
}
</style>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar
  },
  computed: {
    homePage() {
      return this.$route.path === "/";
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.commit("setCurrentUser");
    }

    this.$Progress.start();

    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function() {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout");
        }
        throw err;
      });
    });

    this.$router.beforeEach((to, from, next) => {
      this.$Progress.start();
      next();
    });

    this.$router.afterEach(() => {
      this.$Progress.finish();
    });
  },
  mounted() {
    this.$Progress.finish();
  }
};
</script>
