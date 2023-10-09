<template>
  <div>
    <List :items="examList" @item_click="navigateTo" />
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
      .where("collegeCode", "==", this.$store.state.userData.collegeCode)
      .get()
      .then(snapshot => {
        snapshot.forEach(examData => {
          this.examList.push({
            id: examData.id,
            title: examData.id,
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
    navigateTo(event) {
      this.$router.push({
        name: "ExamSubjects",
        params: { examCode: event.id }
      });
    }
  }
};
</script>

<style></style>
