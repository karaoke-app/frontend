<template>
  <aside class="filters">
    <div class="menu-label">Sort by</div>
    <div class="select is-fullwidth">
      <select>
        <option value="date-asc" selected>Date ascending</option>
        <option value="date-desc">Date descending</option>
      </select>
    </div>
    <b-menu class="category-menu">
      <b-menu-list label="Categories">
        <b-menu-item
          v-for="category in categories"
          :key="category.name"
          :label="category.name"
          @click="pickCategory(category.name)"
        ></b-menu-item>
      </b-menu-list>
    </b-menu>
    <button class="button is-fullwidth" disabled>
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
    ...mapGetters(["categories"])
  },
  methods: {
    pickCategory(id) {
      console.log(id);
    }
  }
};
</script>

<style lang="scss" scoped>
.filters {
  position: sticky;
  top: 2em;
}

.category-menu {
  margin: 2em 0;
}
</style>
