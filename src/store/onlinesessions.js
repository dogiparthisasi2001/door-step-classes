import firebaseutils from "@/services/FirebaseUtils.js";
export default {
  state: {
    meetingList: [],
    meetingDataMap: {},
    currentMeetingData: {}
  },
  mutations: {
    UPDATE_MEETING_DATA(state, { meetingList, meetingDataMap }) {
      state.meetingList = meetingList;
      state.meetingDataMap = meetingDataMap;
    },
    UPDATE_CURRENT_MEETING(state, meetingData) {
      state.currentMeetingData = meetingData;
    }
  },
  actions: {
    update_meeting_data({ commit }, sessionType) {
      console.log(sessionType);
      let meetingList = [];
      let meetingDataMap = {};
      firebaseutils
        .firestore()
        .collection("meeting_info")
        .get()
        .then(meetingSnapshot => {
          meetingSnapshot.forEach(meetingData => {
            meetingList.push({
              imageUrl: "https://image.flaticon.com/teams/slug/google.jpg",
              title: meetingData.data().topic,
              subTitle: meetingData.data().title,
              description: meetingData.data().description,
              id: meetingData.data().meetingId,
              operations: []
            });
            meetingDataMap[meetingData.id] = meetingData.data();
          });
          commit("UPDATE_MEETING_DATA", { meetingList, meetingDataMap });
        });
    },
    update_current_meeting_data({ commit, state }, meetingId) {
      commit("UPDATE_CURRENT_MEETING", state.meetingDataMap[meetingId]);
    },
    clear_current_meeting_data({ commit }) {
      commit("UPDATE_CURRENT_MEETING", null);
    }
  }
};
