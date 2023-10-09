<template>
  <div>
    <Modal
      id="submit-exam"
      message="Exam is already submitted. Please contact admin."
      header="Error"
      v-model="showError"
      modalType="confirmation"
      :showCancel="false"
      @on_ok="showError = false"
    />
    <ExamList :items="examList" @item_click="navigateToExam" />
  </div>
</template>
<script>
import ExamList from "@/components/ExamList.vue";
import Modal from "@/components/Modal.vue";
export default {
  components: { ExamList, Modal },
  computed: {
    examList() {
      let examList = JSON.parse(
        JSON.stringify(this.$store.state.examdata.examList)
      );
      let examDataMap = {};
      (this.$store.state.userData.examIdList || []).forEach(data => {
        examDataMap[data.examMainId] =
          data.canWriteAgain == null ? false : data.canWriteAgain;
      });
      examList.forEach(data => {
        if (examDataMap[data.id] == null) {
          data["status"] = "notSubmitted";
        } else if (examDataMap[data.id]) {
          data["status"] = "reconducting";
        } else if (examDataMap[data.id] != null) {
          data["status"] = "submitted";
        }
      });
      return examList;
    }
  },
  data() {
    return { showError: false };
  },
  beforeCreate() {
    this.$store.dispatch("update_exam_list");
  },
  methods: {
    navigateToExam(event) {
      let canWrite = true;
      (this.$store.state.userData.examIdList || []).forEach(data => {
        if ((data.examMainId || "") === event.id) {
          canWrite = data.canWriteAgain == null ? false : data.canWriteAgain;
        }
      });
      if (canWrite) {
        this.$store.dispatch("update_current_exam", event.id);
        this.$router.push({ name: "Instructions" });
      } else {
        this.showError = true;
      }
    }
  }
};
</script>
<style scoped></style>
