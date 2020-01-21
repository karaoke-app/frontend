<template>
  <section class="admin-categories">
    <b-loading :active="isLoading" :is-full-page="false"></b-loading>

    <form @submit.prevent="createCategory">
      <b-field>
        <b-input
          placeholder="Category name"
          type="text"
          icon="plus"
          v-model="name"
        >
        </b-input>
        <p class="control">
          <input type="submit" class="button is-primary" value="Create" />
        </p>
      </b-field>
    </form>

    <hr />

    <table class="table is-bordered is-fullwidth">
      <thead>
        <th>#</th>
        <th>Name</th>
        <th>Delete</th>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td class="is-narrow has-text-centered">
            <b-button
              icon-right="trash"
              type="is-danger"
              size="is-small"
              @click="deleteCategory(category.id)"
            ></b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import {
  error as errorToast,
  success as successToast
} from "@/utils/toasts.js";

export default {
  data() {
    return {
      isLoading: true,
      name: "",
      categories: []
    };
  },

  methods: {
    async fetchCategories() {
      const res = await this.$http.get("categories");
      this.categories = res.data;
      this.isLoading = false;
    },

    async deleteCategory(id) {
      this.isLoading = true;
      try {
        await this.$http.delete(`categories/${id}`);
        successToast("Successfully deleted category");
      } catch (err) {
        errorToast("Couldn't delete category");
      }
      this.fetchCategories();
    },

    async createCategory() {
      this.isLoading = true;
      try {
        await this.$http.post(`categories`, {
          name: this.name
        });
        successToast("Successfully created category");
      } catch (err) {
        errorToast("Couldn't create category");
      }
      this.fetchCategories();
    }
  },

  created() {
    this.fetchCategories();
  }
};
</script>

<style>
.admin-categories {
  min-height: 12em;
}
</style>
