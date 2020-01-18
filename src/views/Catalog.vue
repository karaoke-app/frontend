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
                  :value="query"
                  @keyup.enter.native="search($event.target.value)"
                  type="search"
                  expanded
                  icon="search"
                  ref="query"
                >
                </b-input>
                <p class="control">
                  <b-button
                    class="button is-success"
                    @click="search($refs.query.$refs.input.value)"
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
            <template v-if="paginationMeta.total > 0">
              <hr />
              <b-pagination
                :total="paginationMeta.total"
                :current="paginationMeta.currentPage"
                :per-page="paginationMeta.perPage"
                order="is-centered"
                range-before="1"
                range-after="1"
                @change="changePage"
              ></b-pagination>
            </template>
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
import { mapGetters, mapState } from "vuex";
import store from "@/store";

export default {
  name: "List",

  components: {
    CatalogGrid,
    CatalogAside
  },

  data() {
    return {
      localQuery: ""
    };
  },

  computed: {
    ...mapGetters(["isLoadingList", "paginationMeta"]),
    ...mapState({
      query: state => state.catalog.filters.query
    })
  },

  methods: {
    search(val) {
      this.$store.commit("setFilters", { query: val });
      this.$store.dispatch("fetchSongs");
    },

    changePage(val) {
      this.$store.commit("setPaginationMeta", { currentPage: val });
      this.$store.dispatch("fetchSongs");
    }
  },

  async beforeRouteEnter(to, from, next) {
    await store.dispatch("fetchCategories");
    next();
  }
};
</script>
