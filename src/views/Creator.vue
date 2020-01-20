<template>
  <main class="section">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h4 class="title is-4">Creator</h4>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <b-button
              @click="showHelpModal"
              :class="{ 'is-invisible': step !== 2 }"
              ><i class="far fa-question-circle"></i
            ></b-button>
          </div>
        </div>
      </div>

      <template v-if="step === 0">
        <p>
          Song creator allows you to bring your favorite karaoke hits into the
          platform through a
          <b-tooltip
            position="is-top"
            type="is-black"
            dashed
            label="(pl: prosto, acz schludnie)"
            >simple, yet elegant</b-tooltip
          >
          interface. You'll have to provide video from currently supported video
          services (<strong>Youtube</strong> and <strong>Vimeo</strong>) and
          manually synchronize lyrics with the audio track.
        </p>
        <hr />
        <p class="buttons">
          <b-button type="is-primary" @click="step++"
            >Let's get started</b-button
          >
        </p>
      </template>

      <template v-if="step === 1">
        <div class="columns is-centered">
          <div class="column is-half">
            <h4 class="title is-4 has-text-centered">
              What song would you like to create?
            </h4>
            <p class="has-text-centered">
              Provide some basic song metadata
            </p>
            <hr />
            <b-field label="Artist">
              <b-input type="text" v-model="artist"></b-input>
            </b-field>
            <b-field label="Title">
              <b-input type="text" v-model="title"></b-input>
            </b-field>
            <b-field>
              <template slot="label">
                <span>Categories</span>
                <b-button
                  class="is-pulled-right"
                  type="is-primary"
                  size="is-small"
                  @click="showCategoriesModal"
                  >Select</b-button
                >
              </template>
              <b-taglist>
                <b-tag
                  v-for="category in categories"
                  :key="category.id"
                  size="is-medium"
                >
                  {{ category.name }}
                </b-tag>
                <template v-if="categories.length === 0">
                  No categories selected
                </template>
              </b-taglist>
            </b-field>
            <hr />
            <b-field>
              <div class="buttons">
                <b-button @click="previousStep">Go back</b-button>
                <b-button type="is-primary" @click="nextStep">Next</b-button>
              </div>
            </b-field>
          </div>
        </div>
      </template>

      <CreatorModule
        v-if="step === 2"
        v-on:finished="nextStep"
        v-on:back="previousStep"
      />

      <template v-if="step === 3">
        <div class="columns is-centered">
          <div class="column is-half">
            <h3 class="title is-3 has-text-centered">Great job!</h3>
            <p class="has-text-centered">
              Your song is ready to be published!
            </p>
            <hr />
            <b-field>
              <div class="buttons">
                <b-button @click="step--">Go back</b-button>
                <b-button type="is-primary" @click="publish">Publish</b-button>
              </div>
            </b-field>
          </div>
        </div>
      </template>
    </div>
  </main>
</template>

<script>
import CreatorModule from "@/components/CreatorModule.vue";
import CreatorModalHelp from "@/components/CreatorModalHelp.vue";
import { error as errorToast, success } from "@/utils/toasts.js";
import CreatorModalCategories from "@/components/CreatorModalCategories.vue";

export default {
  components: { CreatorModule },

  title() {
    return "Creator";
  },

  data() {
    return {
      step: 0
    };
  },

  computed: {
    artist: {
      get() {
        return this.$store.state.creator.artist;
      },
      set(value) {
        this.$store.commit("updateArtist", value);
      }
    },

    title: {
      get() {
        return this.$store.state.creator.title;
      },
      set(value) {
        this.$store.commit("updateTitle", value);
      }
    },

    categories() {
      return this.$store.getters.selectedCategories;
    }
  },

  methods: {
    nextStep() {
      this.step++;
    },

    previousStep() {
      this.step--;
    },

    showHelpModal() {
      this.$buefy.modal.open({
        parent: this.$root,
        component: CreatorModalHelp,
        hasModalCard: true
      });
    },

    showCategoriesModal() {
      this.$buefy.modal.open({
        parent: this.$root,
        component: CreatorModalCategories,
        hasModalCard: true
      });
    },

    publish() {
      this.$store
        .dispatch("storeSong")
        .then(resp => {
          if (resp.data.success && resp.data.success === true) {
            success("Song published successfully!", 5000);
            this.$router.push("/");
          } else {
            errorToast("Something went wrong");
          }
        })
        .catch(() => {
          errorToast("Something went wrong");
        });
    }
  }
};
</script>
