<template>
  <main>
    <b-loading active></b-loading>
  </main>
</template>

<script>
import {
  error as errorToast,
  success as successToast
} from "@/utils/toasts.js";

export default {
  props: ["userId", "token"],

  async created() {
    const res = await this.$http.get(`activate/${this.userId}/${this.token}`);

    if (res.data.success) {
      successToast("Success! Now you can log in.", 5000);
    } else {
      errorToast("Invalid token.");
    }

    this.$router.push("/");
  }
};
</script>
