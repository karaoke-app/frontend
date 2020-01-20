<template>
  <main>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <form
        class="modal-card-body is-paddingless"
        style="padding-top: 2rem !important"
        @submit.prevent="handleSubmit(changeUsername)"
      >
        <header class="modal-card-head">
          <p class="modal-card-title">Change username</p>
        </header>
        <div class="modal-card-body">
          <ValidationProvider
            rules="required"
            name="new_username"
            v-slot="{ errors, valid }"
          >
            <b-field
              label="New username"
              :type="{ 'is-danger': errors[0], 'is-success': valid }"
              :message="errors"
            >
              <b-input v-model="new_username" placeholder="New username" />
            </b-field>
          </ValidationProvider>
        </div>
        <div class="modal-card-foot">
          <b-button class="button is-primary" native-type="submit">
            Submit
          </b-button>
        </div>
      </form>
    </ValidationObserver>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <form
        class="modal-card-body is-paddingless"
        style="padding-top: 2rem !important"
        @submit.prevent="handleSubmit(changePassword)"
      >
        <header class="modal-card-head">
          <p class="modal-card-title">Change password</p>
        </header>
        <div class="modal-card-body">
          <ValidationProvider
            rules="required|min:8"
            name="current_password"
            v-slot="{ errors, valid }"
          >
            <b-field
              label="Current password"
              :type="{ 'is-danger': errors[0], 'is-success': valid }"
              :message="errors"
            >
              <b-input
                type="password"
                v-model="current_password"
                placeholder="Current password"
              />
            </b-field>
          </ValidationProvider>
          <ValidationProvider
            rules="required|min:8"
            name="new_password"
            v-slot="{ errors, valid }"
          >
            <b-field
              label="New password"
              :type="{ 'is-danger': errors[0], 'is-success': valid }"
              :message="errors"
            >
              <b-input
                type="password"
                v-model="new_password"
                placeholder="New password"
              />
            </b-field>
          </ValidationProvider>
          <ValidationProvider
            rules="required|confirmed:new_password|min:8"
            name="new_password_confirmation"
            v-slot="{ errors, valid }"
          >
            <b-field
              label="Confirm new password"
              :type="{ 'is-danger': errors[0], 'is-success': valid }"
              :message="errors"
            >
              <b-input
                type="password"
                v-model="new_password_confirmation"
                placeholder="New password"
              />
            </b-field>
          </ValidationProvider>
        </div>
        <div class="modal-card-foot">
          <b-button class="button is-primary" native-type="submit">
            Submit
          </b-button>
        </div>
      </form>
    </ValidationObserver>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <form
        class="modal-card-body is-paddingless"
        style="padding-top: 2rem !important"
        @submit.prevent="handleSubmit(deleteAccount)"
      >
        <header class="modal-card-head">
          <p class="modal-card-title">Delete account</p>
        </header>
        <div class="modal-card-body">
          <ValidationProvider
            rules="required|min:8"
            name="password"
            v-slot="{ errors, valid }"
          >
            <b-field
              label="Password"
              :type="{ 'is-danger': errors[0], 'is-success': valid }"
              :message="errors"
            >
              <b-input
                type="password"
                v-model="password"
                placeholder="Password"
              />
            </b-field>
          </ValidationProvider>
          <ValidationProvider
            rules="required|confirmed:password|min:8"
            name="password_confirmation"
            v-slot="{ errors, valid }"
          >
            <b-field
              label="Confirm password"
              :type="{ 'is-danger': errors[0], 'is-success': valid }"
              :message="errors"
            >
              <b-input
                type="password"
                v-model="password_confirmation"
                placeholder="Confirm password"
              />
            </b-field>
          </ValidationProvider>
        </div>
        <div class="modal-card-foot">
          <b-button class="button is-danger" native-type="submit">
            Delete account
          </b-button>
        </div>
      </form>
    </ValidationObserver>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { error as errorToast, success } from "@/utils/toasts.js";

export default {
  data() {
    return {
      new_username: null,
      new_username_confirmation: this.new_username,

      current_password: null,
      new_password: null,
      new_password_confirmation: null,

      password: null,
      password_confirmation: null
    };
  },
  name: "EditProfile",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    changeUsername() {
      let data = {
        current_username: this.currentUser.name,
        new_username: this.new_username,
        new_username_confirmation: this.new_username
      };
      this.$store
        .dispatch("changeUsername", data)
        .then(() => success("Username changed successfully", 5000))
        .catch(error => errorToast(error.response.data.message));
    },
    changePassword() {
      let data = {
        current_password: this.current_password,
        new_password: this.new_password,
        new_password_confirmation: this.new_password_confirmation
      };
      this.$store
        .dispatch("changePassword", data)
        .then(() => success("Password changed successfully", 5000))
        .catch(error => errorToast(error.response.data.message));
    },
    deleteAccount() {
      let data = {
        name: this.currentUser.name
      };
      this.$store
        .dispatch("deleteAccount", data)
        .then(() => {
          this.$router.push("/");
        })
        .catch(error => errorToast(error.response.data.message));
    }
  },
  computed: {
    ...mapGetters(["currentUser"])
  }
};
</script>

<style scoped></style>
