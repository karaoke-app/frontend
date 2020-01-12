<template>
  <main>
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-4 is-offset-4">
              <b-field>
                <b-input
                  placeholder="Search..."
                  v-model="searchInput"
                  type="search"
                  expanded
                  icon="search"
                >
                </b-input>
                <p class="control">
                  <b-button class="button is-success" @click="search"
                    >Search</b-button
                  >
                </p>
              </b-field>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-2">
            <CatalogAside></CatalogAside>
          </div>
          <div class="column">
            <CatalogGrid />
            <b-loading
              :is-full-page="false"
              :active.sync="isLoadingList"
            ></b-loading>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import CatalogGrid from "@/components/Catalog/CatalogGrid";
import CatalogAside from "@/components/Catalog/CatalogAside";
import { mapGetters } from "vuex";
import store from "@/store";

export default {
  name: "List",
  data() {
    return {
      searchInput: ""
    };
  },
  components: {
    CatalogGrid,
    CatalogAside
  },
  methods: {
    search: function() {}
    // showAddGenreModal: function() {
    //   this.$buefy.modal.open({
    //     parent: this.$root,
    //     component: AddGenreModal,
    //     hasModalCard: true
    //   });
    // },
    // unselectGenre: function(genre) {
    //   this.$store.commit("unselectGenre", genre);
    // }
  },
  computed: {
    ...mapGetters(["isLoadingList"])
  },

  async beforeRouteEnter(to, from, next) {
    await store.dispatch("fetchCategories");
    next();
  }
};
</script>
