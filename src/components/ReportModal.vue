<template>
  <form @submit.prevent="sendReport" class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Report a song</p>
    </header>

    <section class="modal-card-body">
      <b-field label="What's wrong with this song?">
        <b-input
          type="textarea"
          required
          minlength="10"
          maxlength="100"
          v-model="description"
        >
        </b-input>
      </b-field>
    </section>

    <footer class="modal-card-foot">
      <b-button
        tag="input"
        native-type="submit"
        :loading="isLoading"
        value="Send report"
      ></b-button>
    </footer>
  </form>
</template>

<script>
import {
  error as errorToast,
  success as successToast
} from "@/utils/toasts.js";

export default {
  props: ["songId"],

  data() {
    return {
      description: "",
      isLoading: false
    };
  },

  methods: {
    async sendReport() {
      this.isLoading = true;
      try {
        await this.$http.post(`songs/${this.songId}/report`, {
          description: this.description
        });
        successToast("Report sent");
        this.$parent.close();
      } catch (err) {
        errorToast("Couldn't send report");
      }
      this.isLoading = false;
    }
  }
};
</script>
