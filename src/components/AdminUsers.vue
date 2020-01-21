<template>
  <section class="admin-users">
    <b-loading :active="isLoading" :is-full-page="false"></b-loading>
    <table class="table is-bordered is-fullwidth">
      <thead>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      users: []
    };
  },

  methods: {
    async fetchUsers() {
      const res = await this.$http.get("users");
      this.users = res.data;
      this.isLoading = false;
    }
  },

  created() {
    this.fetchUsers();
  }
};
</script>

<style>
.admin-users {
  min-height: 12em;
}
</style>
