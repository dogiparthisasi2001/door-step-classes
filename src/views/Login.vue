<template>
  <div class="container-class">
    <Loading label="Logging in...." id="login" v-if="loading" />
    <h3>Login</h3>
    <h5 v-if="errorMessage" class="error-text">{{ errorMessage }}</h5>
    <form class="container-class">
      <BaseInput
        type="text"
        label="Email"
        id="email"
        labelPosition="legend"
        v-model="email"
      />
      <BaseInput
        type="password"
        id="inputPassword"
        label="Password"
        labelPosition="legend"
        v-model="password"
      />
      <div>(or)</div>
      <div class="link-class" @click="goToUserIdPage">Login with User Id</div>
      <BaseButton @on_action="loginUser" label="Login">Sign in</BaseButton>
    </form>
  </div>
</template>

<script>
import firebaseutils from "@/services/FirebaseUtils.js";
import Loading from "@/components/Loading.vue";
export default {
  components: { Loading },
  data() {
    return {
      email: "",
      password: "",
      errorMessage: null,
      loading: false
    };
  },
  methods: {
    async loginUser() {
      this.errorMessage = null;
      this.loading = true;
      firebaseutils
        .auth()
        .signInWithEmailAndPassword(this.email.trim(), this.password)
        .then(
          () => {
            this.loading = false;
            this.$router.replace({ name: "Home" });
          },
          err => {
            this.loading = false;
            if (err.code === "auth/user-not-found") {
              this.errorMessage = "User does not exist";
            } else if (err.code === "auth/invalid-email") {
              this.errorMessage = "Enter proper mail id";
            } else if (err.code === "auth/wrong-password") {
              this.errorMessage = "Invalid password";
            }
            console.log(err);
          }
        );
    },
    goToUserIdPage() {
      this.$router.push({ name: "LoginUserId" });
    }
  }
};
</script>

<style>
.container-class {
  width: 100%;
  display: inline-grid;
  justify-content: center;
  justify-items: center;
}
.error-text {
  color: var(--error-text-color);
}
.link-class {
  text-decoration: underline;
  padding-bottom: 8px;
}
.link-class:hover {
  color: var(--primary-color);
  text-decoration: none;
  cursor: pointer;
}
</style>
