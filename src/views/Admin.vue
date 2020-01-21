<template>
  <main>
    <section class="section">
      <div class="container">
        <b-tabs type="is-boxed" destroy-on-hide>
          <b-tab-item label="Users" icon="users">
            <AdminUsers></AdminUsers>
          </b-tab-item>
          <b-tab-item label="Reports" icon="exclamation">
            <AdminReports></AdminReports>
          </b-tab-item>
          <b-tab-item label="Categories" icon="folder">
            <AdminCategories></AdminCategories>
          </b-tab-item>
        </b-tabs>
      </div>
    </section>
  </main>
</template>

<script>
import AdminUsers from "@/components/AdminUsers.vue";
import AdminReports from "@/components/AdminReports.vue";
import AdminCategories from "@/components/AdminCategories.vue";

export default {
  components: { AdminUsers, AdminReports, AdminCategories }
};
</script>
