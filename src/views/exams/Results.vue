<template>
  <div class="result">
    <div><b>Exam Conducted On:</b> {{ conductedOn }}</div>
    <Loading id="loading" label="Loading Results..." v-if="isLoading" />
    <b>Result:</b>
    <div class="result">
      <table style="width:100%">
        <tr>
          <th>Subjects</th>
          <th>Correct Answered</th>
          <th>Wrong Answered</th>
          <th>Not Answered</th>
          <th>Given Questions</th>
        </tr>
        <tr v-for="(data, subject) in subjectWiseData" :key="subject">
          <td>{{ subject }}</td>
          <td>{{ data.correctList.length }}</td>
          <td>{{ data.wrongList.length }}</td>
          <td>{{ data.notAnswered.length }}</td>
          <td>{{ data.totalQuestionList.length }}</td>
        </tr>
      </table>
    </div>
    <div class="result">
      <table style="width:100%;border:0px;margin-bottom:16px;">
        <tr>
          <th>Total marks: {{ marksData.totalMarks }}</th>
          <th>Marks obtained: {{ marksData.resultMarks }}</th>
          <th>Percentage:{{ percentage }}%</th>
        </tr>
      </table>
    </div>
    <h4 class="answers">Review</h4>
    <div class="review">
      <ResultView :resultData="examResultData" />
    </div>
  </div>
</template>

<script>
import firebaseUtils from "@/services/FirebaseUtils.js";
import ResultView from "@/components/ResultView.vue";
import Loading from "@/components/Loading.vue";
export default {
  components: { ResultView, Loading },
  data() {
    return {
      resultData: {},
      subjectWiseData: {},
      marksData: {
        totalMarks: 0,
        resultMarks: 0
      },
      evaluationData: {}
    };
  },
  beforeCreate() {
    firebaseUtils
      .firestore()
      .collection("exam_result_data")
      .where("examId", "==", this.$route.params.examId)
      .get()
      .then(async snapshot => {
        snapshot.forEach(data => {
          this.resultData = data.data();
          firebaseUtils
            .firestore()
            .collection("exam_info")
            .doc(this.resultData.examMainId)
            .get()
            .then(doc => {
              if (doc.exists) {
                this.evaluationData = doc.data().evaluationData;
              }
              this.subjectWiseData = subjectWiseResultData(
                this.resultData.examResultData,
                this.marksData,
                this.evaluationData
              );
              this.$store
                .dispatch("result_exam_data", {
                  subjectWiseData: JSON.parse(
                    JSON.stringify(this.subjectWiseData)
                  ),
                  examCode: this.resultData.examCode
                })
                .catch(() => {
                  this.subjectWiseData = subjectWiseResultData(
                    this.resultData.examResultData,
                    this.marksData
                  );
                  this.$store.dispatch("result_exam_data", {
                    subjectWiseData: JSON.parse(
                      JSON.stringify(this.subjectWiseData)
                    ),
                    examCode: this.resultData.examCode
                  });
                });
            });
        });
      });
  },
  computed: {
    examResultData() {
      return this.$store.state.results.finalResultData;
    },
    isLoading() {
      return this.$store.state.results.isLoading;
    },
    conductedOn() {
      if (this.resultData.conductedOn) {
        return this.resultData.conductedOn.toDate().toLocaleString();
      } else {
        return "";
      }
    },
    percentage() {
      if (this.marksData.resultMarks <= 0) {
        return 0;
      }
      return (
        Math.round(
          (this.marksData.resultMarks / this.marksData.totalMarks) * 100 * 100
        ) / 100
      );
    }
  },
  methods: {}
};
const subjectWiseResultData = function(
  examResultData,
  marksData,
  evaluationData
) {
  if (examResultData) {
    let parsedData = JSON.parse(examResultData);
    let subjectWiseData = {};
    parsedData.questionDataList.forEach(questionData => {
      if (!subjectWiseData[questionData.subject]) {
        subjectWiseData[questionData.subject] = {
          correctList: [],
          wrongList: [],
          notAnswered: [],
          totalQuestionList: [],
          answerData: {}
        };
      }
      subjectWiseData[questionData.subject].totalQuestionList.push(
        questionData.qid
      );
      marksData.totalMarks =
        marksData.totalMarks +
        parseInt(
          (evaluationData[questionData.subject] || {}).positiveMarks || 1
        );
      subjectWiseData[questionData.subject].answerData[questionData.qid] =
        questionData.selectedOption;
      if (parsedData.correctList.indexOf(questionData.qid) != -1) {
        subjectWiseData[questionData.subject].correctList.push(
          questionData.qid
        );
        marksData.resultMarks =
          marksData.resultMarks +
          parseInt(
            (evaluationData[questionData.subject] || {}).positiveMarks || 1
          );
      } else if (parsedData.wrongList.indexOf(questionData.qid) != -1) {
        subjectWiseData[questionData.subject].wrongList.push(questionData.qid);
        marksData.resultMarks =
          marksData.resultMarks -
          parseInt(
            (evaluationData[questionData.subject] || {}).negativeMarks || 0
          );
      } else if (parsedData.notAnswered.indexOf(questionData.qid) != -1) {
        subjectWiseData[questionData.subject].notAnswered.push(
          questionData.qid
        );
      }
    });
    return subjectWiseData;
  } else {
    return {};
  }
};
</script>

<style scoped>
.result {
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
}
th,
td {
  text-align: center;
}
.review {
  /* border: 1px solid black; */
  margin-bottom: 5px;
  overflow: auto;
}
table {
  border: 1px solid black;
}
.answers {
  text-align: center;
}
</style>
