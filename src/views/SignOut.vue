<template>
  <h2>Signing Out</h2>
</template>
<script>
import firebase from "firebase";
export default {
  beforeCreate() {
    if (firebase.auth().currentUser) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch("updateAuthStatus", {
            status: false,
            userData: null
          });
          this.$router.replace({ name: "Login" });
        });
    } else {
      this.$router.replace({ name: "Login" });
    }
  }
};
</script>
