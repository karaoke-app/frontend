<template>
  <main>
    <catalog-grid :user_id="parseInt(this.$route.params.user_id)"/>
  </main>
</template>

<script>
import CatalogGrid from "@/components/Catalog/CatalogGrid";
import { mapGetters } from "vuex";

export default {
  name: "UserSongs",
  components: {
    CatalogGrid
  },
  computed: {
    ...mapGetters(["isLoadingList", "paginationMeta"])
  }
};
</script>

<style scoped></style>
