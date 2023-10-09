import firebaseUtils from "@/services/FirebaseUtils.js";
import application from "@/services/Application.js";
export default {
  state: {
    questionList: [],
    currentQuestion: null,
    currentQuestionIndex: null,
    questionDataMap: {},
    answerMap: {},
    examId: null,
    questionOrder: [],
    isLoading: true
  },
  mutations: {
    UPDATE_QUESTION_LIST(state, { questionList, isCompleted }) {
      state.questionList = state.questionList.concat(questionList);
      if (isCompleted) {
        state.questionList.forEach(questionData => {
          updateImageInfo(questionData.questionData);
        });
        state.isLoading = false;
        state.currentQuestionIndex = 0;
        state.currentQuestion = state.questionList[state.currentQuestionIndex];
      }
    },
    update_loading_status(state, status) {
      state.isLoading = status;
    },
    RESET_QUESTION_LIST(state) {
      state.currentQuestion = null;
      state.currentQuestionIndex = null;
      state.questionDataMap = {};
      state.answerMap = {};
      state.questionOrder = [];
      state.questionList = [];
      state.isLoading = true;
    },
    mark_question_for_review(state, { index, selectedOption }) {
      state.questionList[index].isSaved = false;
      state.questionList[index].isReviewMarked = true;
      state.questionList[index].selectedOption = selectedOption;
    },
    save_answer(state, { index, selectedOption }) {
      state.questionList[index].isSaved = true;
      state.questionList[index].isReviewMarked = false;
      state.questionList[index].selectedOption = selectedOption;
    },
    update_current_question(state, index) {
      state.currentQuestionIndex = index;
      if (
        !(
          state.questionList[index].isReviewMarked ||
          state.questionList[index].isSaved
        )
      ) {
        state.questionList[index].selectedOption = null;
      }
      state.currentQuestion = state.questionList[index];
    },
    async submit_exam(state, { rootState, conductedOn }) {
      let correctList = [];
      let wrongList = [];
      let notAnswered = [];
      let questionDataList = [];
      state.questionList.forEach(question => {
        questionDataList.push({
          qid: question.qid,
          selectedOption: question.selectedOption,
          subject: question.subject
        });
        if (
          !(question.isReviewMarked || question.isSaved) ||
          !question.selectedOption
        ) {
          notAnswered.push(question.qid);
        } else if (question.selectedOption === state.answerMap[question.qid]) {
          correctList.push(question.qid);
        } else {
          wrongList.push(question.qid);
        }
      });
      let examId = state.examId;
      await firebaseUtils
        .firestore()
        .collection("exam_result_data")
        .doc(examId)
        .set({
          examId: examId,
          examCode: rootState.examdata.currentExamData.examCode,
          examMainId: rootState.examdata.currentExamData.examMainId,
          studentEmailAddress: rootState.userData.emailAddress,
          studentMobileNumber: rootState.userData.mobileNumber,
          studentName: `${rootState.userData.firstName} ${
            rootState.userData.lastName ? rootState.userData.lastName : ""
          }`,
          conductedOn,
          examResultData: JSON.stringify({
            questionDataList: questionDataList,
            correctList: correctList,
            wrongList: wrongList,
            notAnswered: notAnswered
          })
        })
        .then(() => {
          state.questionList = [];
          state.currentQuestion = null;
          state.currentQuestionIndex = null;
          state.questionDataMap = {};
          state.answerMap = {};
          state.questionOrder = [];
        });
      return examId;
    }
  },
  actions: {
    update_question_list({ commit, state, rootState }) {
      commit("RESET_QUESTION_LIST");
      state.examId = application.createUUID();
      let totalSubjectLength = Object.keys(
        rootState.examdata.currentExamData.subjectWiseData
      ).length;
      if (
        Object.keys(rootState.examdata.currentExamData.subjectWiseData)
          .length === 0
      ) {
        commit("update_loading_status", false);
      }
      Object.entries(
        rootState.examdata.currentExamData.subjectWiseData
      ).forEach(function(subject) {
        let questionList = [];
        firebaseUtils
          .firestore()
          .collection("questions_info")
          .doc(rootState.examdata.currentExamData.examCode)
          .collection("questions")
          .where("subject", "==", subject[0])
          .limit(parseInt(subject[1]))
          .get()
          .then(snapshot => {
            snapshot.forEach(question => {
              questionList.push({ qid: question.id, ...question.data() });
            });
            questionList = questionList.map((question, index) => {
              state.answerMap[question.qid] = question.questionData.answer;
              question.questionData.question = `${state.questionList.length +
                index +
                1}) ${question.questionData.question}`;
              return {
                questionData: question.questionData,
                qid: question.qid,
                selectedOption: null,
                isSaved: false,
                isReviewMarked: false,
                subject: subject[0]
              };
            });
            state.questionDataMap[subject[0]] = {
              startIndex: state.questionList.length + 1,
              endIndex: state.questionList.length + questionList.length
            };
            state.questionOrder.push(subject[0]);
            commit("UPDATE_QUESTION_LIST", {
              questionList,
              isCompleted:
                totalSubjectLength == Object.keys(state.questionDataMap).length
            });
          });
      });
    },
    update_current_question({ commit }, index) {
      commit("update_current_question", index);
    },
    mark_question_for_review({ commit }, { index, selectedOption }) {
      commit("mark_question_for_review", { index, selectedOption });
      return true;
    },
    save_answer({ commit }, { index, selectedOption }) {
      commit("save_answer", { index, selectedOption });
      return true;
    },
    async submit_exam({ commit, state, rootState }, conductedOn) {
      await commit("submit_exam", { rootState, conductedOn });
      let examId = state.examId;
      state.examId = null;
      return examId;
    }
  }
};

const updateImageInfo = questionData => {
  questionData.options.forEach(async option => {
    if (option.imagePath) {
      updateImageSrc(option.imagePath).then(res => {
        option.imagePath = res;
      });
    }
  });
  if (questionData.imagePath) {
    updateImageSrc(questionData.imagePath).then(res => {
      questionData.imagePath = res;
    });
  }
  return questionData;
};

const updateImageSrc = async imagePath => {
  return await firebaseUtils.getImageUrl(imagePath);
};
