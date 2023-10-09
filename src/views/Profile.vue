<template>
  <div class="profile" style="text-align: -webkit-center;">
    <div class="avatar">
      <img
        src="https://d32ogoqmya1dw8.cloudfront.net/images/serc/empty_user_icon_256.v2.png"
        alt="User"
      />
    </div>
    <div class="data">
      <table>
        <tr>
          <td>Name</td>
          <td>:</td>
          <td>
            {{
              `${userData.firstName} ${
                userData.lastName ? userData.lastName : ""
              }`
            }}
          </td>
        </tr>
        <tr>
          <td>Date of Birth</td>
          <td>:</td>
          <td>{{ dateFormatter(userData.dateOfBirth) }}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>:</td>
          <td>{{ userData.emailAddress }}</td>
        </tr>
        <tr>
          <td>Phone Number</td>
          <td>:</td>
          <td>{{ userData.mobileNumber }}</td>
        </tr>
        <tr>
          <td>Results</td>
          <td>:</td>
          <td>Check Results</td>
        </tr>
      </table>

      <div
        v-for="examData in userData.examIdList || []"
        :key="examData.examId"
        @click="navigateToResult(examData.examId)"
        class="result-list-class"
      >
        {{ examData.testName + " - " + dateFormatter(examData.conductedOn) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    userData() {
      return this.$store.state.userData;
    }
  },
  methods: {
    navigateToResult(examId) {
      this.$router.push({ name: "Result", params: { examId } });
    },
    dateFormatter(date) {
      if (!date) {
        return "";
      }
      try {
        return date.toDate().toLocaleDateString();
      } catch (exception) {
        return date.toLocaleString();
      }
    }
  }
};
</script>

<style scoped>
td {
  padding-left: 30px;
}
.data {
  font-size: 120%;
  font-weight: 500;
}
.result-list-class {
  padding: 8px;
  border: 0.5px solid gray;
  box-shadow: 1px 1px 2px 1px #9e9e9e;
  margin: 8px;
  width: 50%;
  border-radius: 4px;
}
.result-list-class:hover {
  background-color: #d3d3d38f;
  box-shadow: 2px 2px 2px 1px #9e9e9e;
  cursor: pointer;
}
</style>
