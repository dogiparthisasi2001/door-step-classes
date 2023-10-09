<template>
  <div class="container-class">
    <Loading label="Logging in...." id="login" v-if="loading" />
    <h3>Login</h3>
    <h5 v-if="errorMessage" class="error-text">{{ errorMessage }}</h5>
    <form class="container-class">
      <BaseInput
        type="text"
        label="User Id"
        id="userid"
        labelPosition="legend"
        v-model="userId"
      />
      <BaseInput
        type="password"
        id="inputPassword"
        label="Password"
        labelPosition="legend"
        v-model="password"
      />
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
      userId: "",
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
        .signInWithEmailAndPassword("admin@adminsdk.com", "password")
        .then(() => {
          firebaseutils
            .firestore()
            .collection("userid_data")
            .doc(this.userId.trim())
            .get()
            .then(doc => {
              firebaseutils
                .auth()
                .signOut()
                .then(() => {
                  if (doc.exists) {
                    let data = doc.data();
                    firebaseutils
                      .auth()
                      .signInWithEmailAndPassword(
                        data.emailAddress,
                        this.password
                      )
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
                  } else {
                    this.errorMessage =
                      "Account doesn't exist. Please contact the institute.";
                    this.loading = false;
                  }
                });
            });
        });
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
</style>
