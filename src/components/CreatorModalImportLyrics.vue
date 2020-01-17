<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Import lyrics</p>
    </header>

    <section class="modal-card-body">
      <b-field label="Song lyrics">
        <b-input
          type="textarea"
          minlength="10"
          placeholder="Paste lyrics here"
          v-model="lyrics"
        ></b-input>
      </b-field>
    </section>

    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">
        Close
      </button>
      <button
        class="button"
        type="button"
        @click="autoImport()"
        :class="{ 'is-loading': isImportLoading }"
      >
        Auto import
      </button>
      <button
        class="button is-primary"
        style="margin-left: auto;"
        type="button"
        @click="$emit('import', lyrics) && $parent.close()"
      >
        Import
      </button>
    </footer>
  </div>
</template>

<script>
import { error } from "@/utils/toasts.js";
export default {
  data() {
    return {
      lyrics: "",
      isImportLoading: false
    };
  },

  methods: {
    async autoImport() {
      this.isImportLoading = true;
      try {
        const response = await this.$http.get("lyrics/import", {
          params: {
            artist: this.$store.state.creator.artist,
            title: this.$store.state.creator.title
          }
        });
        this.lyrics = response.data;
      } catch (e) {
        error("Couldn't auto import lyrics");
      }
      this.isImportLoading = false;
    }
  }
};
</script>
