<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <form class="modal-card" @submit.prevent="handleSubmit(register)">
      <header class="modal-card-head">
        <p class="modal-card-title">Register</p>
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
        <ValidationProvider
          rules="required|email"
          name="Email"
          v-slot="{ errors, valid }"
        >
          <b-field
            label="Email"
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
            :message="errors"
          >
            <b-input type="email" v-model="email" placeholder="Email" />
          </b-field>
        </ValidationProvider>
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
              <b-tooltip type="is-dark" label="At least 8 characters">
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
        <ValidationProvider
          rules="required"
          name="terms"
          v-slot="{ errors, valid }"
        >
          <b-field
            id="terms"
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
            :message="errors"
          >
            <b-checkbox v-model="terms">
              I accept the terms of service
            </b-checkbox>
          </b-field>
        </ValidationProvider>
        <b-button expanded class="is-success" native-type="submit">
          Register
        </b-button>
      </div>
      <div class="modal-card-foot">
        <span
          >Already have an account?&nbsp;
          <a @click="showLoginModal()">Log in!</a></span
        >
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import LoginModal from "@/components/LoginModal.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { error as errorToast, success } from "@/utils/toasts.js";

export default {
  data() {
    return {
      name: null,
      email: null,
      password: null,
      password_confirmation: null,
      terms: null
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    register: function() {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
        terms: this.terms
      };
      this.$store
        .dispatch("register", data)
        .then(() => {
          this.$router.push("/");
          success("Registered successfully. Please confirm your email.", 5000);
          this.$parent.close();
          this.showLoginModal();
        })
        .catch(error => {
          if (error.response.status == "422") {
            errorToast(error.response.data.errors.email[0], 5000);
          }
        });
    },
    showLoginModal() {
      this.$parent.close();
      this.$buefy.modal.open({
        parent: this.$root,
        component: LoginModal,
        hasModalCard: true
      });
    }
  }
};
</script>

<style scoped>
#terms >>> p {
  margin-top: 0 !important;
  margin-bottom: 0.25rem;
}
#terms {
  margin-top: 0.25rem;
}
</style>
