<template>
  <div class="container-class">
    <Loading label="Adding exam data...." id="login" v-if="adding" />
    <h2>Add Exams Details</h2>
    <form class="container-class">
      <BaseInput
        label="Exam Code"
        id="test-code"
        v-model="examCode"
        :value="examCode"
      />
      <BaseButton
        id="reload-subjects"
        icon="refresh"
        @on_action="reloadSubjects"
      />
      <BaseInput
        label="Exam Name"
        id="exam-name"
        v-model="examName"
        :value="examName"
      />
      <BaseInput
        label="Exam Duration"
        id="duration"
        type="number"
        v-model="duration"
        :value="duration"
      />
      <BaseInput
        label="Exam Schedule"
        id="duration"
        type="datetime-local"
        v-model="examScheduleTime"
        :value="examScheduleTime"
      />
      <CheckboxGroup
        :options="subjectsAvailable"
        @option_checked="updatedSelectedSubjects"
        v-if="subjectsAvailable.length > 0"
      />
      <div v-if="selectedSubjects.length > 0">
        <div v-for="subject in selectedSubjects" :key="subject">
          <BaseInput
            :label="`No. of Questions for ${subject}`"
            :id="`${subject}-questions`"
            type="number"
            v-model="subjectWiseData[subject]"
            :value="examName"
          />
          <BaseInput
            :label="`Marks per Question ${subject}`"
            :id="`${subject}-positive-marks`"
            type="number"
            v-model="evaluationData[subject].positiveMarks"
            :value="positiveMarks"
          />
          <BaseInput
            :label="`Negative Marks per Question ${subject}`"
            :id="`${subject}-negative-marks`"
            type="number"
            v-model="evaluationData[subject].negativeMarks"
            :value="evaluationData[subject].negativeMarks"
          />
          <div class="syllabus-editor">
            <vue-editor v-model="syllabusData[subject]"></vue-editor>
          </div>
        </div>
      </div>
      <BaseButton id="add-exam" label="Add Exam" @on_action="addExamDetails" />
    </form>
  </div>
</template>

<script>
import firebaseUtils from "@/services/FirebaseUtils.js";
import application from "@/services/Application.js";
import Loading from "@/components/Loading.vue";
import CheckboxGroup from "@/components/CheckboxGroup.vue";
import { VueEditor } from "vue2-editor";
export default {
  components: { Loading, CheckboxGroup, VueEditor },
  data() {
    return {
      adding: false,
      examCode: "",
      examName: "",
      examScheduleTime: null,
      evaluationData: {},
      syllabusData: {},
      subjectsAvailable: [],
      selectedSubjects: [],
      subjectWiseData: {},
      duration: null
    };
  },
  beforeMount() {
    if (!(this.$store.state.userData || {}).isAdmin) {
      this.$router.replace({ name: "Home" });
    }
  },
  methods: {
    addExamDetails() {
      this.adding = true;
      this.errorText = null;
      const examData = {
        examCode: this.examCode,
        examName: this.examName,
        examMainId: application.createUUID(),
        duration: this.duration,
        examScheduleTime: new Date(this.examScheduleTime),
        isCompleted: false,
        examStatus: true,
        subjectWiseData: this.subjectWiseData,
        evaluationData: this.evaluationData,
        syllabusData: this.syllabusData,
        collegeCode: this.$store.state.userData.collegeCode
      };
      firebaseUtils
        .firestore()
        .collection("exam_info")
        .doc(examData.examMainId)
        .set(examData)
        .then(() => {
          this.adding = false;
          this.resetData();
          setTimeout(() => {
            this.notificationText = null;
          }, 2000);
        });
    },
    resetData() {
      this.examCode = "";
      this.examName = "";
      this.examScheduleTime = null;
      this.subjectsAvailable = [];
      this.selectedSubjects = [];
      this.subjectWiseData = [];
      this.evaluationData = {};
      this.syllabusData = {};
    },
    async reloadSubjects() {
      let subjectList = [];
      await firebaseUtils
        .firestore()
        .collection("questions_info")
        .doc(this.examCode)
        .collection("questions")
        .get()
        .then(snapshot =>
          snapshot.forEach(data => {
            if (subjectList.indexOf(data.data().subject) == -1) {
              subjectList.push(data.data().subject);
            }
          })
        );
      this.subjectsAvailable = subjectList;
      return subjectList;
    },
    updatedSelectedSubjects(event) {
      this.selectedSubjects = event;
      let updatedData = {};
      let evaluationData = {};
      let syllabusData = {};
      this.selectedSubjects.forEach(subject => {
        if (this.subjectWiseData[subject])
          updatedData[subject] = this.subjectWiseData[subject];
        if (this.evaluationData[subject]) {
          evaluationData[subject] = this.evaluationData[subject];
        } else {
          evaluationData[subject] = { positiveMarks: 1, negativeMarks: 0 };
        }
        if (this.syllabusData[subject]) {
          syllabusData[subject] = this.syllabusData[subject];
        } else {
          syllabusData[subject] = subject;
        }
      });
      this.subjectWiseData = updatedData;
      this.evaluationData = evaluationData;
      this.syllabusData = syllabusData;
    }
  }
};
</script>

<style scoped>
.container-class {
  width: 100%;
  display: inline-grid;
  justify-content: center;
  justify-items: center;
}
.syllabus-editor {
  width: 500px;
}
</style>
