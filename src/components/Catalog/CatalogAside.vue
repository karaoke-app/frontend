<template>
  <aside class="filters">
    <div class="menu-label">Sort by</div>
    <div class="select is-fullwidth">
      <select v-model="sort" placeholder="Date ascending">
        <option value="date_asc">Date ascending</option>
        <option value="date_desc">Date descending</option>
      </select>
    </div>
    <div class="categories">
      <div class="menu-label">Categories</div>
      <div class="field" v-for="cat in categories" :key="cat.name">
        <b-radio :native-value="cat.name" v-model="category">{{
          cat.name
        }}</b-radio>
      </div>
    </div>
    <button
      class="button is-fullwidth"
      @click="resetFilters()"
      :disabled="!isFiltered"
    >
      <span class="icon is-hidden-tablet-only">
        <i class="fas fa-times"></i>
      </span>
      <span>Reset filters</span>
    </button>
  </aside>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CatalogAside",

  computed: {
    ...mapGetters(["categories", "isFiltered"]),
    category: {
      get() {
        return this.$store.state.catalog.filters.category;
      },
      set(val) {
        this.$store.commit("setFilters", { category: val });
        this.$store.dispatch("fetchSongs");
      }
    },
    sort: {
      get() {
        return this.$store.state.catalog.filters.sort;
      },
      set(val) {
        this.$store.commit("setFilters", { sort: val });
        this.$store.dispatch("fetchSongs");
      }
    }
  },

  methods: {
    resetFilters() {
      this.$store.commit("resetFilters");
      this.$store.dispatch("fetchSongs");
    }
  }
};
</script>

<style lang="scss" scoped>
.filters {
  position: sticky;
  top: 2em;
}

.categories {
  margin: 2em 0;
}
</style>
