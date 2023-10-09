import firebaseUtils from "@/services/FirebaseUtils.js";
export default {
  state: {
    examResultData: {},
    finalResultData: [],
    isLoading: true
  },
  mutations: {
    result_exam_data(
      state,
      { subject, resultList, totalQuestionLength, totalSubjectLenght }
    ) {
      if (!state.examResultData[subject]) {
        state.examResultData[subject] = [];
      }
      Array.prototype.push.apply(state.examResultData[subject], resultList);
      if (totalQuestionLength == state.examResultData[subject].length) {
        state.finalResultData.push({
          subject,
          resultList: state.examResultData[subject]
        });
        // state.examResultData[subject].forEach((questionData) => {
        //   updateImageInfo(questionData.questionData);
        // });
        if (totalSubjectLenght == Object.keys(state.examResultData).length) {
          state.isLoading = false;
        }
      }
    },
    reset_exam_data(state) {
      state.examResultData = {};
      state.finalResultData = [];
      state.isLoading = true;
    },
    update_loading_status(state, { status }) {
      state.isLoading = status;
    }
  },
  actions: {
    result_exam_data({ commit }, { subjectWiseData, examCode }) {
      let totalSubjectLenght = Object.keys(subjectWiseData).length;
      commit("reset_exam_data");
      if (totalSubjectLenght === 0) {
        commit("update_loading_status", { status: false });
      }
      let index = 1;
      Object.entries(subjectWiseData).forEach(subject => {
        let totalQuestionLength = subject[1].totalQuestionList.length;
        const [list, chuckSize] = [subject[1].totalQuestionList, 10];
        let splittedArray = new Array(Math.ceil(list.length / chuckSize))
          .fill()
          .map(() => list.splice(0, chuckSize));
        splittedArray.forEach(qIdList => {
          firebaseUtils
            .firestore()
            .collection("questions_info")
            .doc(examCode)
            .collection("questions")
            .where(
              firebaseUtils.firebase().firestore.FieldPath.documentId(),
              "in",
              qIdList
            )
            .get()
            .then(snapshot => {
              let resultList = [];
              snapshot.forEach(question => {
                resultList.push({ qid: question.id, ...question.data() });
              });
              resultList = resultList.map(question => {
                question.questionData.question = `<div style="display:inline-flex;">${index})${question.questionData.question}</div>`;
                index++;
                return {
                  questionData: question.questionData,
                  qid: question.qid,
                  selectedOption: subject[1].answerData[question.qid]
                };
              });
              commit("result_exam_data", {
                subject: subject[0],
                resultList,
                totalQuestionLength,
                totalSubjectLenght
              });
            });
        });
      });
    }
  }
};

// const updateImageInfo = (questionData) => {
//   questionData.options.forEach(async (option) => {
//     if (option.imagePath) {
//       updateImageSrc(option.imagePath).then((res) => {
//         option.imagePath = res;
//       });
//     }
//   });
//   if (questionData.imagePath) {
//     updateImageSrc(questionData.imagePath).then((res) => {
//       questionData.imagePath = res;
//     });
//   }
//   return questionData;
// };

// const updateImageSrc = async (imagePath) => {
//   return await firebaseUtils.getImageUrl(imagePath);
// };
