<template>
  <div>
    <loading id="loading" label="loading" v-if="loading" />
    <h3>{{ $route.params.examCode }}</h3>
    <h4>{{ $route.params.subject }}</h4>
    <QuestionList
      :questionList="questionList"
      @on_dblclick="showQuestionId"
      @on_delete="deleteQuestion"
      @on_edit="editQuestion"
    />
  </div>
</template>

<script>
import firebaseUtils from "@/services/FirebaseUtils.js";
import QuestionList from "@/components/QuestionList.vue";
import Loading from "@/components/Loading.vue";
export default {
  components: { QuestionList, Loading },
  data() {
    return {
      loading: true,
      questionList: []
    };
  },
  beforeCreate() {
    if (
      !(this.$store.state.userData || {}).isAdmin ||
      !this.$route.params.examCode
    ) {
      this.$router.replace({ name: "Home" });
    } else {
      this.examCode = this.$route.params.examCode;
      let questionList = [];
      firebaseUtils
        .firestore()
        .collection("questions_info")
        .doc(this.$route.params.examCode)
        .collection("questions")
        .where("subject", "==", this.$route.params.subject)
        .get()
        .then(snapshot => {
          snapshot.forEach(question => {
            questionList.push({ qid: question.id, ...question.data() });
          });
          questionList.forEach(question => {
            this.questionList.push({
              qid: question.qid,
              questionData: question.questionData
            });
          });
          this.loading = false;
        });
    }
  },
  methods: {
    showQuestionId(event) {
      alert(event.id);
    },
    editQuestion(event) {
      let route = this.$router.resolve({
        name: "AddQuestions",
        query: { qid: event.id, examCode: this.$route.params.examCode }
      });
      window.open(route.href, "_blank");
    },
    deleteQuestion(event) {
      firebaseUtils
        .firestore()
        .collection("questions_info")
        .doc(this.$route.params.examCode)
        .collection("questions")
        .doc(event.id)
        .delete()
        .then(() => {
          let index = this.questionList.findIndex(
            data => data.qid === event.id
          );
          if (index > -1) {
            this.questionList.splice(index, 1);
          }
        });
    }
  }
};
</script>

<style></style>
