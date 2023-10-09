<template>
  <div v-if="examData">
    <Modal
      id="submit-exam"
      message="Do you want to submit exam?"
      v-model="showConfirmation"
      @on_cancel="showConfirmation = false"
      @on_ok="submitExam"
    />
    <Loading label="Submitting..." id="submitting" v-if="examSubmitted" />
    <Loading label="Loading Questions..." id="loading" v-if="isLoading" />
    <div class="detail">
      <div class="submit-div">
        <BaseButton
          label="Submit"
          class="action"
          @on_action="showConfirmation = true"
        />
      </div>
      <div class="profile">
        <timer :duration="examData.duration" @timer_ended="submitExam" />
      </div>
      <div class="testdetails">
        <li class="details">Name Of The Test:{{ examData.examName }}</li>
      </div>
    </div>
    <div class="error-text">{{ errorText }}</div>
    <div class="Topics" v-if="questionLength != 0">
      <li
        class="subs"
        v-for="topic in questionOrder"
        :key="topic"
        :class="{
          'active-topic':
            currentQuestionIndex + 1 >= questionDataMap[topic].startIndex &&
            currentQuestionIndex + 1 <= questionDataMap[topic].endIndex
        }"
        @click="updateQuestion(questionDataMap[topic].startIndex)"
      >
        <div>
          {{
            topic +
              "[" +
              questionDataMap[topic].startIndex +
              "-" +
              questionDataMap[topic].endIndex +
              "]"
          }}
        </div>
      </li>
    </div>
    <div class="nums">
      <div v-for="index in questionLength" :key="index">
        <div
          class="num"
          @click="updateQuestion(index)"
          :class="[
            { 'active-question': currentQuestionIndex + 1 == index },
            { 'review-question': reviewList.indexOf(index - 1) != -1 },
            { 'submitted-question': savedList.indexOf(index - 1) != -1 }
          ]"
        >
          {{ index }}
        </div>
      </div>
    </div>
    <div class="question">
      <transition name="slide-up" mode="out-in">
        <QuestionView
          :questionData="questionData"
          v-if="questionData"
          id="question"
          v-model="questionData.selectedOption"
        />
      </transition>
    </div>
    <div class="actions-div">
      <BaseButton
        label="Skip"
        class="action"
        @on_action="skipToNext"
        v-if="currentQuestionIndex != questionLength - 1"
      />
      <BaseButton
        label="Marked For Review"
        class="action"
        @on_action="updateQuestionStatus('review')"
      />
      <BaseButton
        :label="
          currentQuestionIndex == questionLength - 1 ? 'Save' : 'Save & next'
        "
        class="action"
        @on_action="updateQuestionStatus('save')"
      />
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import QuestionView from "@/components/QuestionView.vue";
import Timer from "@/components/Timer.vue";
import Modal from "@/components/Modal.vue";
import firebaseUtils from "@/services/FirebaseUtils.js";
export default {
  components: { Loading, QuestionView, Timer, Modal },
  data() {
    return {
      examSubmitted: false,
      errorText: null,
      startTime: null,
      showConfirmation: false
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.onlinetest.isLoading;
    },
    examData() {
      return this.$store.state.examdata.currentExamData;
    },
    currentQuestionIndex() {
      return this.$store.state.onlinetest.currentQuestionIndex;
    },
    questionData() {
      return this.$store.state.onlinetest.currentQuestion;
    },
    questionLength() {
      return this.$store.state.onlinetest.questionList.length;
    },
    reviewList() {
      let reviewList = [];
      this.$store.state.onlinetest.questionList.forEach(
        (questionData, index) => {
          if (questionData.isReviewMarked) reviewList.push(index);
        }
      );
      return reviewList;
    },
    savedList() {
      let savedList = [];
      this.$store.state.onlinetest.questionList.forEach(
        (questionData, index) => {
          if (questionData.isSaved) savedList.push(index);
        }
      );
      return savedList;
    },
    questionDataMap() {
      return this.$store.state.onlinetest.questionDataMap;
    },
    questionOrder() {
      return this.$store.state.onlinetest.questionOrder;
    }
  },
  beforeMount() {
    if (!this.$store.state.examdata.currentExamData) {
      this.$router.replace({ name: "Home" });
    }
    window.addEventListener("beforeunload", this.preventNav);
    this.$once("hook:beforeDestroy", () => {
      window.removeEventListener("beforeunload", this.preventNav);
    });
  },
  mounted() {
    if (!this.$store.state.userData.examIdList) {
      this.$store.state.userData.examIdList = [];
    }
    this.startTime = new Date();
    this.$store.state.userData.examIdList.push({
      examId: this.$store.state.onlinetest.examId,
      conductedOn: this.startTime,
      examMainId: this.examData.examMainId,
      testName: this.examData.examName,
      canWriteAgain: true
    });
    firebaseUtils
      .firestore()
      .collection("users_info")
      .doc(this.$store.state.userData.emailAddress)
      .update({
        examIdList: this.$store.state.userData.examIdList
      });
  },
  beforeRouteLeave(to, from, next) {
    if (!this.examSubmitted && this.$store.state.examdata.currentExamData) {
      if (window.confirm("Exam will be submitted. Do you want to continue?")) {
        this.examSubmitted = true;
        this.showConfirmation = false;
        this.$store.dispatch("submit_exam", this.startTime).then(res => {
          if (res) {
            next();
          }
        });
      } else {
        return;
      }
    }
    next();
  },
  methods: {
    preventNav(event) {
      if (this.examSubmitted) return;
      window.addEventListener("unload", () => {
        this.$store.dispatch("submit_exam", this.startTime);
      });
      event.preventDefault();
      event.returnValue = "";
    },
    updateQuestion(index) {
      this.$store.dispatch("update_current_question", index - 1);
    },
    skipToNext() {
      this.updateQuestion(this.currentQuestionIndex + 2);
    },
    updateQuestionStatus(markingType) {
      if (!this.questionData.selectedOption) {
        this.errorText = "Select an option to update";
        setTimeout(() => {
          this.errorText = null;
        }, 5000);
        return;
      }
      let dispatchMethod =
        markingType === "review" ? "mark_question_for_review" : "save_answer";
      this.$store
        .dispatch(dispatchMethod, {
          index: this.currentQuestionIndex,
          selectedOption: this.questionData.selectedOption
        })
        .then(res => {
          if (res && this.currentQuestionIndex != this.questionLength - 1) {
            this.updateQuestion(this.currentQuestionIndex + 2);
          }
        });
    },
    submitExam() {
      this.examSubmitted = true;
      this.showConfirmation = false;
      this.$store.dispatch("submit_exam", this.startTime).then(res => {
        if (res) {
          this.$router.push({ name: "Result", params: { examId: res } });
        }
      });
    }
  }
};
</script>

<style scoped>
.action {
  display: inliine-flex;
  padding: 10px;
  margin: 10px;
}
.profile {
  float: right;
  padding-right: 20px;
  font-size: 18px;
}
.details {
  list-style-type: none;
}
.subs {
  list-style-type: none;
  display: inline-block;
  padding: 10px;
  cursor: pointer;
}
.nums {
  padding: 1em;
  background-color: var(--primary-surface-color);
  width: 32%;
  border: 1px solid black;
  float: right;
  height: 400px;
  overflow: auto;
}
.question {
  width: 67%;
  border: 1px solid black;
  height: 400px;
  font-weight: 500;
  overflow: auto;
}
.Topics {
  background-color: thistle;
  margin-bottom: 8px;
  border: 0.5px dashed black;
  margin-top: 8px;
}
.num {
  float: left;
  background-color: gray;
  border-radius: 50%;
  width: 40px;
  margin: 3px;
  height: 40px;
  text-align: center;
  padding-top: 7px;
  color: var(--primary-text-color);
  cursor: pointer;
}
.active-question {
  background-color: blue;
  box-shadow: 2px 2px 2px gray;
}
.actions-div {
  display: inline-flex;
  width: 67%;
}
.review-question {
  background-color: red;
}
.submitted-question {
  background-color: green;
}
.error-text {
  color: var(--error-text-color);
  font-weight: 500;
  text-align: center;
}
.active-topic {
  background-color: var(--primary-surface-color);
}
.submit-div {
  float: right;
  text-align: right;
}
.slide-up-enter {
  transform: translateX(100px);
  opacity: 0;
}
.slide-up-leave-active,
.slide-up-enter-active {
  transition: all 0.5s ease;
}
.slide-up-leave {
  transform: translateX(-100px);
  opacity: 0;
}
.detail {
  height: 50px;
}
@media only screen and (max-width: 800px) {
  .question {
    width: 100%;
    height: 400px;
    border: 2px;
  }
  .nums {
    width: 100%;
    display: flex;
    height: fit-content;
  }
  .actions-div {
    width: 100%;
    border: 2px;
    height: fit-content;
    text-align: center;
  }
  .profile {
    float: right;
    padding-right: 20px;
    font-size: x-large;
  }
}
</style>
