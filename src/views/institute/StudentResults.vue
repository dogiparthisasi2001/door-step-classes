<template>
  <div class="sudentresults">
    <div class="header-div">
      <BaseButton
        id="pdf-button"
        icon="picture_as_pdf"
        @on_action="downloadPdf"
      />
    </div>
    <div style="display:inline;">
      <h1>{{ examName }}</h1>
    </div>
    <!-- <List :items="studentResults" /> -->
    <table>
      <tr>
        <th>S.No.</th>
        <th>Student Name</th>
        <!-- <th>Mobile number</th> -->
        <th>Email</th>
        <th>Total Marks</th>
        <th>Obtaineed Marks</th>
        <th>Percentage</th>
      </tr>
      <tr v-for="(data, index) in studentResults" :key="data.emailAddress">
        <td>{{ index + 1 }}</td>
        <td>{{ data.name }}</td>
        <!-- <td>{{ data.mobileNumber }}</td> -->
        <td>{{ data.emailAddress }}</td>
        <td>{{ data.totalMarks }}</td>
        <td>{{ data.obtainedMarks }}</td>
        <td>{{ data.percentage }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import firebaseUtils from "@/services/FirebaseUtils.js";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
// import List from "@/components/List.vue";
export default {
  // components: { List },
  beforeCreate() {
    let evaluationData = {};
    firebaseUtils
      .firestore()
      .collection("exam_info")
      .doc(this.$route.params.examMainId)
      .get()
      .then(data => {
        evaluationData = data.data().evaluationData;
        this.examName = data.data().examName;
        firebaseUtils
          .firestore()
          .collection("exam_result_data")
          .where("examMainId", "==", this.$route.params.examMainId)
          .get()
          .then(snapshot => {
            let studentResults = [];
            snapshot.forEach(examData => {
              let { totalMarks, obtainedMarks, percentage } = getResultData(
                examData.data().examResultData,
                evaluationData
              );
              studentResults.push({
                emailAddress: examData.data().studentEmailAddress,
                mobileNumber: examData.data().mobileNumber,
                name: examData.data().studentName.replace(/undefined/g, ""),
                totalMarks,
                obtainedMarks,
                percentage: percentage + "%"
              });
            });
            studentResults.sort((val1, val2) => {
              return val1.obtainedMarks > val2.obtainedMarks
                ? -1
                : val1.obtainedMarks < val2.obtainedMarks
                ? 1
                : 0;
            });
            this.studentResults = studentResults;
          });
      });
  },
  data() {
    return {
      studentResults: [],
      examName: ""
    };
  },
  methods: {
    downloadPdf() {
      let datas = this.studentResults;
      let columns = [
        { title: "Student Name", dataKey: "name" },
        { title: "Email", dataKey: "emailAddress" },
        { title: "Total Marks", dataKey: "totalMarks" },
        { title: "Obtaineed Marks", dataKey: "obtainedMarks" },
        { title: "Percentage", dataKey: "percentage" }
      ];
      var doc = new jsPDF("p", "pt");
      let headerText = this.examName;
      var header = function(data) {
        doc.setFontSize(16);
        doc.setTextColor(40);
        //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
        doc.text(headerText, data.settings.margin.left, 50);
      };
      doc.autoTable(columns, datas, {
        theme: "grid",
        margin: { top: 60 },
        didDrawPage: header
      });
      doc.save(this.examName + ".pdf");
    }
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
    totalMarks,
    percentage: Math.round((obtainedMarks / totalMarks) * 100 * 100) / 100
  };
};
</script>

<style>
th,
tr,
td {
  padding: 10px;
  text-align: center;
  border: 2px solid rgb(180, 180, 180);
}
table {
  margin: 0 auto;
}
h1 {
  text-align: center;
}
.header-div {
  float: right;
  margin-top: 8px;
  margin-right: 8px;
}
</style>
