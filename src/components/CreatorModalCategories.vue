<template>
  <section>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Select categories</p>
      </header>
      <section
        class="modal-card-body"
        style="min-height: 6em; position: relative;"
      >
        <div class="columns is-multiline">
          <div
            class="column is-half is-one-quarter-desktop"
            v-for="category in categories"
            :key="category.id"
          >
            <b-checkbox v-model="selection" :native-value="category.id">
              {{ category.name }}
            </b-checkbox>
          </div>
        </div>
        <b-loading :is-full-page="false" :active.sync="isLoading"></b-loading>
      </section>
      <footer class="modal-card-foot">
        <b-button @click="saveSelection">Assign selected</b-button>
        <b-button @click="$parent.close()">Close</b-button>
      </footer>
    </div>
  </section>
</template>

<script>
export default {
  name: "CreatorModalCategories",

  data() {
    return {
      selection: [],
      categories: [],
      isLoading: true
    };
  },

  methods: {
    saveSelection: function() {
      const selectedCategories = this.categories.filter(category => {
        return this.selection.includes(category.id);
      });
      this.$store.commit("setSelectedCategories", selectedCategories);
      this.$parent.close();
    }
  },

  async created() {
    const resp = await this.$http.get("categories");
    this.categories = resp.data;
    this.selection = this.$store.getters.categoriesId;
    this.isLoading = false;
  }
};
</script>

<style scoped></style>
