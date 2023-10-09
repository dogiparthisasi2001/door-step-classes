<template>
  <div>
    <div class="Exam">
      <table>
        <tr>
          <th>Exams:-</th>
        </tr>
        <tr>
          <td>To Add Questions</td>
          <td>
            <router-link class="link" :to="{ name: 'AddQuestions' }"
              >AddQuestions</router-link
            >
          </td>
        </tr>
        <tr>
          <td>Create EXAM</td>
          <td>
            <router-link class="link" :to="{ name: 'AddExamDetails' }"
              >Create Exam</router-link
            >
          </td>
        </tr>
        <tr>
          <td>Check Exam Page</td>
          <td>
            <router-link class="link" :to="{ name: 'OnlineExams' }"
              >Exam Page</router-link
            >
          </td>
        </tr>
        <tr>
          <td>Check Exam Results</td>
          <td>
            <router-link class="link" :to="{ name: 'ExamResults' }"
              >Exam Results</router-link
            >
          </td>
        </tr>
        <tr>
          <td>Modify Questions</td>
          <td>
            <router-link class="link" :to="{ name: 'CreatedExams' }"
              >Modify</router-link
            >
          </td>
        </tr>
        <tr>
          <td>Modify Questions</td>
          <td>
            <router-link class="link" :to="{ name: 'StudentsData' }"
              >Students Data</router-link
            >
          </td>
        </tr>
        <tr>
          <td>Overall Results</td>
          <td>
            <router-link class="link" :to="{ name: 'OverallResults' }"
              >Overall Results</router-link
            >
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script></script>

<style scoped>
table {
  width: 50%;
  margin: 0 auto;
}
.link {
  text-align: center;
}
.Schedule {
  width: 30%;
  border: 2px solid black;
  height: 200px;
  float: right;
}
p {
  font-size: 120%;
}
</style>
