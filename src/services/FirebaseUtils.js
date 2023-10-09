import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC_6EMUy6h2kBM0qsTHCYli6IcVyvh4bnM",
  authDomain: "doorstepclasses-3634f.firebaseapp.com",
  databaseURL: "https://doorstepclasses-3634f.firebaseio.com",
  projectId: "doorstepclasses-3634f",
  storageBucket: "doorstepclasses-3634f.appspot.com",
  messagingSenderId: "862257826421",
  appId: "1:862257826421:web:e03091f1ed9212432f863c",
  measurementId: "G-B1DHRTY5G6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let currentUserData = null;
export default {
  firebase() {
    return firebase;
  },
  database() {
    return firebase.database();
  },
  auth() {
    return firebase.auth();
  },
  firestore() {
    return firebase.firestore();
  },
  async getUserData(email) {
    let userList = [];
    await firebase
      .firestore()
      .collection("users_info")
      .where("emailAddress", "==", email)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          userList.push(doc.data());
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    currentUserData = userList[0] || {};
    return userList[0] || {};
  },
  getCurrentUserData() {
    return currentUserData;
  },
  getImageUrl(imagePath) {
    return firebase
      .storage()
      .ref()
      .child(imagePath)
      .getDownloadURL();
  }
};
