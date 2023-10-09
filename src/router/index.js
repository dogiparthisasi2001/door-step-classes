import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import OnlineSessions from "../views/OnlineSessions.vue";
import AddMeetingDetails from "../views/AddMeetingDetails.vue";
import SessionsInfo from "../views/SessionsInfo.vue";
import Error from "../views/Error.vue";
import firebaseUtils from "@/services/FirebaseUtils.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      isAuthRequired: false
    }
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    meta: {
      isAuthRequired: false
    }
  },
  {
    path: "/error",
    name: "Error",
    component: Error,
    meta: {
      isAuthRequired: false
    }
  },
  {
    path: "/institute/adminpanel",
    name: "AdminPanel",
    component: () => import("@/views/institute/AdminPanel.vue"),
    meta: {
      isAuthRequired: false
    }
  },
  {
    path: "/Exams",
    name: "Exams",
    component: () => import("../views/Exams.vue"),
    meta: {
      isAuthRequired: false
    }
  },
  {
    path: "/exams/addexamdetails",
    name: "AddExamDetails",
    component: () => import("@/views/exams/AddExamDetails.vue"),
    meta: {
      isAuthRequired: true
    }
  },
  {
    path: "/addmeeting",
    name: "AddMeeting",
    component: AddMeetingDetails,
    meta: {
      isAuthRequired: true
    }
  },
  {
    path: "/onlinesessions",
    name: "OnlineSessions",
    component: OnlineSessions,
    meta: {
      isAuthRequired: true
    }
  },
  {
    path: "/sessionsinformation/:sessionType",
    name: "SessionsInfo",
    component: SessionsInfo,
    meta: {
      isAuthRequired: true
    }
  },
  {
    path: "/meeting",
    name: "Meeting",
    component: () => import("../views/MeetingRoom.vue"),
    meta: {
      isAuthRequired: true
    }
  },
  {
    path: "/exams/onlineexams",
    name: "OnlineExams",
    component: () => import("@/views/exams/OnlineExams.vue"),
    meta: {
      isAuthRequired: true
    }
  },
  {
    path: "/exams/instructions",
    name: "Instructions",
    component: () => import("@/views/exams/Instructions.vue"),
    meta: {
      isAuthRequired: true
    }
  },
  {
    path: "/exams/runexam",
    name: "ExamView",
    component: () => import("@/views/exams/ExamView.vue"),
    meta: {
      isAuthRequired: true
    }
  },
  {
    path: "/exams/createdexams/",
    name: "CreatedExams",
    component: () => import("@/views/exams/CreatedExams.vue"),
    meta: {
      isAuthRequired: true
    }
  },
  {
    path: "/exams/examsubjects/:examCode",
    name: "ExamSubjects",
    component: () => import("@/views/exams/ExamSubjects.vue"),
    meta: {
      isAuthRequired: true
    }
  },
  {
    path: "/exams/updatequestions/:examCode/:subject",
    name: "UpdateQuestions",
    component: () => import("@/views/exams/UpdateQuestions.vue"),
    meta: {
      isAuthRequired: true
    }
  },
  {
    path: "/institute/examresults",
    name: "ExamResults",
    component: () => import("@/views/institute/ExamResults.vue"),
    meta: {
      isAuthRequired: true,
      isAdmin: true
    }
  },
  {
    path: "/institute/overallresults",
    name: "OverallResults",
    component: () => import("@/views/institute/OverallResults.vue"),
    meta: {
      isAuthRequired: true,
      isAdmin: true
    }
  },
  {
    path: "/institute/StudentData",
    name: "StudentsData",
    component: () => import("@/views/institute/Studentdata.vue"),
    meta: {
      isAuthRequired: true,
      isAdmin: true
    }
  },
  {
    path: "/institute/studentresult/:examMainId",
    name: "StudentResults",
    component: () => import("@/views/institute/StudentResults.vue"),
    meta: {
      isAuthRequired: true
    }
  },
  {
    path: "/result/:examId",
    name: "Result",
    component: () => import("@/views/exams/Results.vue"),
    meta: {
      isAuthRequired: true
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
    meta: {
      isAuthRequired: true
    }
  },
  {
    path: "/exams/addquestion",
    name: "AddQuestions",
    component: () => import("@/views/exams/AddQuestions.vue"),
    meta: {
      isAuthRequired: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
    meta: {
      isAuthRequired: false
    }
  },
  {
    path: "/login/userid",
    name: "LoginUserId",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginUserId.vue"),
    meta: {
      isAuthRequired: false
    }
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue"),
    meta: {
      isAuthRequired: false
    }
  },
  {
    path: "/signout",
    name: "SignOut",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SignOut.vue"),
    meta: {
      isAuthRequired: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.name === "Error") {
    new Vue({
      render: h =>
        h(Error, {
          props: {
            error: to.query.error
          }
        })
    }).$mount("#app");
    return;
  }
  if (to.name === "Register") {
    if (to.query.collegeCode == null) {
      next({ name: "Error", query: { error: "nocode" } });
    } else {
      firebaseUtils
        .firestore()
        .collection("institution_data")
        .doc(to.query.collegeCode)
        .get()
        .then(data => {
          if (data.exists) {
            next();
          } else {
            next({ name: "Error", query: { error: "invalid" } });
          }
        });
    }
    return;
  }
  if (window.localStorage["isTestRunning"] === "true") {
    delete window.localStorage["isTestRunning"];
    alert("Your exam is terminated");
    if (to.name === "Test") {
      next({ name: "Home" });
    }
    next();
  }
  if (firebaseUtils.auth().currentUser || !to.meta.isAuthRequired) {
    next();
  } else {
    next({ name: "Login" });
  }
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = "DoorstepClasses";
  }
});
export default router;
