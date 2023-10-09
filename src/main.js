import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import firebaseUtils from "@/services/FirebaseUtils.js";
require("@/assets/material-components-web.min.css");
require("@/assets/variables.css");

// Vue.config.productionTip = true;
// Vue.config.devtools = true;
Vue.component("BaseInput", BaseInput);
Vue.component("BaseButton", BaseButton);
let app;
firebaseUtils.auth().onAuthStateChanged(async user => {
  if (user) {
    let userData = await firebaseUtils.getUserData(
      firebaseUtils.auth().currentUser.email
    );
    if (!userData.isLoginSdk) {
      await store.dispatch("updateAuthStatus", {
        status: true,
        userData: userData
      });
    }
  } else {
    await store.dispatch("updateAuthStatus", {
      status: false,
      userData: null
    });
  }
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
