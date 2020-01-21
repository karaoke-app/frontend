<template>
  <section class="admin-reports">
    <b-loading :active="isLoading" :is-full-page="false"></b-loading>
    <table class="table is-bordered is-fullwidth">
      <thead>
        <th>User ID</th>
        <th>Song ID</th>
        <th>Description</th>
      </thead>
      <tbody>
        <tr v-for="(report, index) in reports" :key="index">
          <td>{{ report.user_id }}</td>
          <td>{{ report.song_id }}</td>
          <td>{{ report.description }}</td>
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
      reports: []
    };
  },

  methods: {
    async fetchReports() {
      const res = await this.$http.get("reports");
      this.reports = res.data;
      this.isLoading = false;
    }
  },

  created() {
    this.fetchReports();
  }
};
</script>

<style>
.admin-reports {
  min-height: 12em;
}
</style>
