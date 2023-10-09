<template>
  <div>
    <Loading id="loading" label="Loading Students Data..." v-if="isLoading" />
    <table>
      <tr>
        <th>S.No.</th>
        <th>Student Name</th>
        <th>Mobile number</th>
        <th>Email</th>
        <th>Date Of Birth</th>
        <th>password</th>
        <th>CollegeCode</th>
      </tr>
      <tr v-for="(data, index) in examList" :key="data.emailAddress">
        <td>{{ index + 1 }}</td>
        <td>{{ data.userName }}</td>
        <td>{{ data.mobileNumber }}</td>
        <td>{{ data.emailAddress }}</td>
        <td>{{ data.dateOfBirth }}</td>
        <td>{{ data.password }}</td>
        <td>{{ data.collegeCode }}</td>
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
    firebaseUtils
      .firestore()
      .collection("users_info")
      .where("collegeCode", "==", this.$store.state.userData.collegeCode)
      .get()
      .then(snapshot => {
        let examList = [];
        snapshot.forEach(examData => {
          this.examList.push({
            ...examData.data()
          });
          examList.sort((val1, val2) => {
            return val1.userName > val2.userName
              ? -1
              : val1.userName < val2.userName
              ? 1
              : 0;
          });
          this.examList = examList;
          this.isLoading = false;
        });
      });
  },
  data() {
    return {
      isLoading: true,
      examList: []
    };
  }
};
</script>

<style scoped>
table,
td,
tr,
th {
  text-align: center;
  border: 2px solid black;
}
table {
  margin: 0 auto;
}
td {
  width: auto;
}
</style>
