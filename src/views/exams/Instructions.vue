<template>
  <div class="container-class">
    <div>
      <h3>Read the instructions carefully</h3>
    </div>
    <span style="color:red;font-size:20px;"
      >Once the exam is started you cannot attend the exam again.</span
    >
    <div v-if="!showStartExam">
      <span>Don't click submit until you complete your exam.</span>
      <h4>You can start your exam in</h4>
      <h4>
        <Timer
          id="timer"
          :duration="timerToStartExam"
          @timer_ended="showStartExam = true"
        />
      </h4>
    </div>
    <div v-if="showStartExam">
      <h4>You can start your exam by clicking the button</h4>
      <BaseButton
        id="start exam"
        label="Start Exam"
        @on_action="goToExam"
        v-if="showStartExam"
      />
    </div>
  </div>
</template>

<script>
import Timer from "@/components/Timer.vue";
export default {
  components: { Timer },
  data() {
    return {
      showStartExam: false
    };
  },
  computed: {
    timerToStartExam() {
      let date = this.$store.state.examdata.currentExamData.examScheduleTime;
      let currentTime = new Date();
      if (!date) {
        return 0.15;
      }
      try {
        date = date.toDate();
        // eslint-disable-next-line no-empty
      } catch (exception) {}
      if (date < currentTime) return 0.17;
      else return (date - currentTime) / 60000;
    }
  },
  beforeMount() {
    if (!this.$store.state.examdata.currentExamData) {
      this.$router.replace({ name: "Home" });
    } else {
      this.$store.dispatch("update_question_list");
    }
  },
  methods: {
    goToExam() {
      this.$router.replace({ name: "ExamView" });
    }
  }
};
</script>
<style scoped>
.start_exam {
  text-align: center;
}
.container-class {
  text-align: -webkit-center;
}
</style>
<style>
html,
body {
  overscroll-behavior-y: contain;
}
</style>
