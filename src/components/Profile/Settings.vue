<template>
  <main>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <form
        class="modal-card-body is-paddingless"
        @submit.prevent="handleSubmit(changeUsername)"
      >
        <header class="modal-card-head">
          <p class="modal-card-title">Change Username</p>
        </header>
        <div class="modal-card-body">
          <ValidationProvider
            rules="required"
            name="Username"
            v-slot="{ errors, valid }"
          >
            <b-field
              label="Username"
              :type="{ 'is-danger': errors[0], 'is-success': valid }"
              :message="errors"
            >
              <b-input v-model="name" placeholder="Username" />
            </b-field>
          </ValidationProvider>
        </div>
        <div class="modal-card-foot">
          <button class="button is-primary">Change username</button>
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
            rules="min:8|required"
            vid="password"
            name="Password"
            v-slot="{ errors, valid }"
          >
            <b-field
              label="Password"
              :type="{ 'is-danger': errors[0], 'is-success': valid }"
              :message="errors"
            >
              <template slot="label">
                Password
                <b-tooltip
                  type="is-dark"
                  label="At least 8 characters"
                  position="is-right"
                >
                  <span class="icon">
                    <i class="far fa-question-circle" />
                  </span>
                </b-tooltip>
              </template>
              <b-input
                type="password"
                v-model="password"
                placeholder="Password"
              />
            </b-field>
          </ValidationProvider>
          <ValidationProvider
            rules="required|confirmed:password|min:8"
            name="Password Confirmation"
            v-slot="{ errors, valid }"
          >
            <b-field
              label="Confirm Password"
              :type="{ 'is-danger': errors[0], 'is-success': valid }"
              :message="errors"
            >
              <b-input
                type="password"
                v-model="password_confirmation"
                placeholder="Confirm Password"
              />
            </b-field>
          </ValidationProvider>
        </div>
        <div class="modal-card-foot">
          <button class="button is-primary">Change password</button>
        </div>
      </form>
    </ValidationObserver>
    <form
      @submit.prevent="deleteAccount"
      class="modal-card-body is-paddingless"
      style="padding-top: 2rem !important"
    >
      <header class="modal-card-head">
        <p class="modal-card-title">Delete account</p>
      </header>
      <div class="modal-card-body">
        <b-field label="Current Password">
          <b-input
            type="password"
            v-model="currentPassword"
            placeholder="Password"
          />
        </b-field>
      </div>
      <div class="modal-card-foot">
        <b-button class="button is-danger" native-type="submit">
          Delete account
        </b-button>
      </div>
    </form>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";
// eslint-disable-next-line no-unused-vars
import { error as errorToast, success } from "@/utils/toasts.js";

export default {
  data() {
    return {
      name: null,
      password: null,
      password_confirmation: null,
      currentPassword: null
    };
  },
  name: "EditProfile",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    changeUsername() {
    },
    changePassword() {
    },
    deleteAccount() {
      let data = {
        user_id: this.currentUser.id,
        password: this.currentPassword
      };
      this.$store
        .dispatch("deleteAccount", data)
        .then(() => {
          this.$router.push("/");
        })
        .catch(error => {
          if (error.response.status == "401") {
            errorToast(error.response.data.message);
          } else {
            errorToast("Something went wrong");
          }
        });
    }
  },
  computed: {
    ...mapGetters(["currentUser"])
  }
};
</script>

<style scoped></style>
