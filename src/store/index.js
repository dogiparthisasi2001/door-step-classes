import Vue from "vue";
import Vuex from "vuex";
import onlinesessions from "@/store/onlinesessions.js";
import onlinetest from "@/store/onlinetest.js";
import results from "@/store/results.js";
import examdata from "@/store/examdata.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    isAdmin: false,
    userData: {
      type: Object,
      default: null
    },
    quotes: [],
    images: [
      {
        imageSrc:
          "https://www.quotemaster.org/images/02/0267521fd081e5feb9ef6a2cbdf4880a.jpg",
        imageAltText: "Abdul Khalam Quote"
      },
      {
        imageSrc:
          "https://www.yourtango.com/sites/default/files/styles/header_slider/public/image_blog/CollegeQuotesHeader.jpg?itok=xfFilpmt",
        imageAltText: "General Quote"
      }
    ]
  },
  mutations: {
    UPDATE_AUTH_STATUS: (state, { status, userData }) => {
      state.isAuthenticated = status;
      state.userData = userData;
      if (userData && status) {
        state.isAdmin = userData.isAdmin;
      } else {
        state.isAdmin = false;
      }
    }
  },
  actions: {
    updateAuthStatus({ commit }, authData) {
      commit("UPDATE_AUTH_STATUS", authData);
    }
  },
  modules: { onlinesessions, onlinetest, results, examdata }
});
