<template>
  <div>
    <List :items="examList" @item_click="navigateToStudentResults" />
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
      .collection("exam_info")
      .where("isCompleted", "==", true)
      .where("collegeCode", "==", this.$store.state.userData.collegeCode)
      .get()
      .then(snapshot => {
        snapshot.forEach(examData => {
          this.examList.push({
            id: examData.data().examMainId,
            title: examData.data().examName,
            operations: []
          });
        });
      });
  },
  data() {
    return {
      examList: []
    };
  },
  methods: {
    navigateToStudentResults(event) {
      this.$router.push({
        name: "StudentResults",
        params: { examMainId: event.id }
      });
    }
  }
};
</script>

<style></style>
