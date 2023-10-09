<template>
  <div>
    <Loading id="loading" label="Loading Results..." v-if="isLoading" />
    <table style="width:100%">
      <tr>
        <th>Rank</th>
        <th>Student Name</th>
        <th>Email Id</th>
        <th>Mobile Number</th>
        <th v-for="examData in examList" :key="examData.id">
          {{ examData.name }}
        </th>
        <th>Percentage</th>
      </tr>
      <tr v-for="(data, index) in studentList" :key="data.id">
        <td>{{ index + 1 }}</td>
        <td>{{ data.name }}</td>
        <td>{{ data.emailAddress }}</td>
        <td>{{ data.mobileNumber }}</td>
        <td v-for="examData in examList" :key="examData.id">
          <i class="material-icons" v-if="data[examData.id]">done</i>
          <i class="material-icons" v-else>clear</i>
        </td>
        <td>{{ `${data.percentage}%` }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import firebaseUtils from "@/services/FirebaseUtils.js";
import Loading from "@/components/Loading.vue";
export default {
  components: { Loading },
  beforeCreate() {
    let evaluationData = {};
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
            name: examData.data().examName
          });
          evaluationData[
            examData.data().examMainId
          ] = examData.data().evaluationData;
        });
        let studentList = [];
        firebaseUtils
          .firestore()
          .collection("users_info")
          .where("collegeCode", "==", this.$store.state.userData.collegeCode)
          .get()
          .then(studentSnapshot => {
            this.totalSize = studentSnapshot.size;
            let currentIndex = 0;
            studentSnapshot.forEach(studentDataSnap => {
              let studentData = studentDataSnap.data();
              let studentKey = studentData.emailAddress;
              this.studentData[studentKey] = {
                id: studentKey,
                name: `${studentData.firstName} ${
                  studentData.lastName ? studentData.lastName : ""
                }`,
                mobileNumber: studentData.mobileNumber,
                emailAddress: studentData.emailAddress
              };
              this.examList.forEach(exam => {
                this.studentData[studentKey][exam.id] = false;
              });
              let overallTotalMarks = 0;
              let overallObtainedMarks = 0;
              firebaseUtils
                .firestore()
                .collection("exam_result_data")
                .where("studentEmailAddress", "==", studentData.emailAddress)
                .get()
                .then(resultSnapshot => {
                  resultSnapshot.forEach(result => {
                    if (
                      this.studentData[studentKey][result.data().examMainId] !=
                      null
                    ) {
                      this.studentData[studentKey][
                        result.data().examMainId
                      ] = true;
                      let { obtainedMarks, totalMarks } = getResultData(
                        result.data().examResultData,
                        evaluationData
                      );
                      overallObtainedMarks += obtainedMarks;
                      overallTotalMarks += totalMarks;
                    }
                  });
                  this.studentData[studentKey].percentage = getPercentage(
                    overallObtainedMarks,
                    overallTotalMarks
                  );
                  if (
                    studentData.isAdmin == null ||
                    studentData.isAdmin == false
                  ) {
                    studentList.push(this.studentData[studentKey]);
                  }
                  if (++currentIndex == this.totalSize) {
                    studentList.sort((val1, val2) => {
                      return val1.percentage > val2.percentage
                        ? -1
                        : val1.percentage < val2.percentage
                        ? 1
                        : 0;
                    });
                    this.studentList = studentList;
                    this.isLoading = false;
                  }
                });
            });
          });
      });
  },
  data() {
    return {
      isLoading: true,
      examList: [],
      studentData: {},
      studentList: [],
      totalSize: 0
    };
  }
};
const getResultData = (examResultData, evaluationData) => {
  let totalMarks = 0;
  let obtainedMarks = 0;
  let resultData = JSON.parse(examResultData);
  resultData.questionDataList.forEach(questionData => {
    totalMarks += parseInt(
      (evaluationData[questionData.subject] || {}).positiveMarks || 1
    );
    if (resultData.correctList.indexOf(questionData.qid) != -1) {
      obtainedMarks += parseInt(
        (evaluationData[questionData.subject] || {}).positiveMarks || 1
      );
    } else if (resultData.wrongList.indexOf(questionData.qid) != -1) {
      obtainedMarks -= parseInt(
        (evaluationData[questionData.subject] || {}).negativeMarks || 0
      );
    }
  });
  return {
    obtainedMarks,
    totalMarks
  };
};
const getPercentage = (obtainedMarks, totalMarks) => {
  if (totalMarks == 0) {
    return 0;
  }
  return Math.round((obtainedMarks / totalMarks) * 100 * 100) / 100;
};
</script>

<style scoped>
th,
td {
  text-align: center;
  border: 1px solid black;
}
.review {
  border: 2px solid black;
  margin-bottom: 5px;
  overflow: auto;
}
table {
  border: 2px solid black;
}
</style>
