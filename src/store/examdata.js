import firebaseutils from "@/services/FirebaseUtils.js";
export default {
  state: {
    examList: [],
    examDataMap: {},
    currentExamData: null
  },
  mutations: {
    UPDATE_EXAM_LIST(state, { examList, examDataMap }) {
      state.examList = examList;
      state.examDataMap = examDataMap;
    },
    UPDATE_CURRENT_EXAM(state, examData) {
      state.currentExamData = examData;
    }
  },
  actions: {
    update_exam_list({ rootState, commit }) {
      let examList = [];
      let examDataMap = {};
      firebaseutils
        .firestore()
        .collection("exam_info")
        .where("examStatus", "==", true)
        .where("collegeCode", "==", rootState.userData.collegeCode)
        .get()
        .then(snapshot => {
          snapshot.forEach(examData => {
            examList.push({
              id: examData.data().examMainId,
              title: examData.data().examName,
              examData: examData.data()
            });
            examDataMap[examData.id] = examData.data();
          });
          commit("UPDATE_EXAM_LIST", { examList, examDataMap });
        });
    },
    update_current_exam({ commit, state }, examMainId) {
      commit("UPDATE_CURRENT_EXAM", state.examDataMap[examMainId]);
    },
    clear_current_exam({ commit }) {
      commit("UPDATE_CURRENT_EXAM", null);
    }
  }
};
