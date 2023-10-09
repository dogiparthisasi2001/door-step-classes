<template>
  <div>
    <h3>{{ $route.params.examCode }}</h3>
    <List :items="subjectDataList" @item_click="navigateTo" />
  </div>
</template>

<script>
import firebaseUtils from "@/services/FirebaseUtils.js";
import List from "@/components/List.vue";
export default {
  components: { List },
  beforeCreate() {
    firebaseUtils
      .firestore()
      .collection("questions_info")
      .doc(this.$route.params.examCode)
      .collection("questions")
      .get()
      .then(snapshot => {
        snapshot.forEach(examData => {
          if (this.subjectList.indexOf(examData.data().subject) == -1) {
            this.subjectDataList.push({
              id: examData.data().subject,
              title: examData.data().subject,
              operations: []
            });
            this.subjectList.push(examData.data().subject);
          }
        });
      });
  },
  data() {
    return {
      subjectList: [],
      subjectDataList: []
    };
  },
  methods: {
    navigateTo(event) {
      this.$router.push({
        name: "UpdateQuestions",
        params: { examCode: this.$route.params.examCode, subject: event.id }
      });
    }
  }
};
</script>

<style></style>
