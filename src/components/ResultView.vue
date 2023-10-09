<template>
  <div class="Result-view">
    <div v-for="data in resultData" :key="data.subject" class="results-padding">
      <h5>{{ data.subject }}</h5>
      <div
        v-for="result in data.resultList"
        :key="result.qid"
        class="results-padding"
      >
        <div class="question-parent">
          <div class="question-div">
            <div class="question" v-html="result.questionData.question"></div>
            <img
              :id="result.qid + '-image'"
              width="auto"
              height="auto"
              v-if="result.questionData.isQuestionImage"
              class="queimg"
            />
          </div>
          <div class="exam-list-syllabus-icon-div">
            <i
              class="material-icons exam-list-syllabus-icon"
              title="Close Options"
              v-if="openOptionList.indexOf(result.qid) >= 0"
              @click="toggleOptions(result.qid, $event)"
            >
              keyboard_arrow_up
            </i>
            <i
              class="material-icons exam-list-syllabus-icon"
              title="Show Options"
              v-else
              @click="toggleOptions(result.qid, $event)"
            >
              keyboard_arrow_down
            </i>
          </div>
        </div>
        <div
          class="options-parent-div"
          v-if="openOptionList.indexOf(result.qid) >= 0"
        >
          <div
            class="options-div"
            v-for="(option, index) in result.questionData.options"
            :key="option.value"
            :class="[
              {
                'wrong-answer':
                  result.selectedOption == option.value &&
                  result.questionData.answer !== option.value
              },
              {
                'correct-answer': result.questionData.answer == option.value
              }
            ]"
          >
            {{ `${optionsIndex[index]})` }}
            <div
              v-if="option.optionContent && option.optionContent !== ''"
              v-html="option.optionContent"
            />
            <img
              :id="`${result.qid}-${option.value}-image`"
              :class="{
                'option-image':
                  result.selectedOption == option.value ||
                  result.questionData.answer == option.value
              }"
              class="option-image"
              v-else-if="option.isOptionImage"
            />
            <label v-else>{{ option.value }}</label>
          </div>
        </div>
        <label v-if="result.questionData.solution">Solution</label>
        <div
          class="question"
          v-if="result.questionData.solution"
          v-html="result.questionData.solution"
        ></div>
        <hr
          style="height:1px;border-width:0;color:gray;background-color:gray"
        />
      </div>
    </div>
  </div>
</template>

<script>
import firebaseUtils from "@/services/FirebaseUtils.js";
export default {
  props: {
    resultData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      openOptionList: [],
      index: 1,
      optionsIndex: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      ]
    };
  },
  mounted() {
    this.updateImages();
  },
  updated() {
    this.updateImages();
  },
  methods: {
    toggleOptions(id, event) {
      event.stopPropagation();
      if (this.openOptionList.indexOf(id) < 0) {
        this.openOptionList.push(id);
      } else {
        this.openOptionList.splice(this.openOptionList.indexOf(id), 1);
      }
    },
    updateImages() {
      this.resultData.forEach(data => {
        data.resultList.forEach(result => {
          this.updateImageSrc(
            result.questionData.imagePath,
            result.qid + "-image"
          );
          result.questionData.options.forEach(option => {
            this.updateImageSrc(
              option.imagePath,
              `${result.qid}-${option.value}-image`
            );
          });
        });
      });
    },
    updateImageSrc(imagePath, elementId) {
      if (imagePath) {
        firebaseUtils.getImageUrl(imagePath).then(res => {
          document.getElementById(elementId).src = res;
        });
      }
    }
  }
};
</script>

<style scoped>
.result-view {
  margin: 5px;
}
.correct-answer {
  border: 2px solid green;
  width: fit-content;
  border-radius: 4px;
  font-weight: 600;
}
.wrong-answer {
  width: fit-content;
  border: 2px solid red;
  border-radius: 4px;
  font-weight: 600;
}
.question {
  font-weight: bold;
}
.question-div {
  width: 90%;
  display: inline-flex;
}
.question-parent {
  display: inline-flex;
  width: 100%;
}
.queimg {
  width: auto;
  height: auto;
  text-align: center;
  max-width: 800px;
  max-height: 150px;
}
.options-div {
  font-style: italic;
  margin: 2px;
  padding: 2px;
}
.options-parent-div {
  margin-left: 12px;
}
.option-image {
  max-height: 60px;
}
h5 {
  text-decoration: underline;
}
tr {
  border: 2px;
}
.exam-list-syllabus-icon {
  float: right;
  color: gray;
}
.exam-list-syllabus-icon-div {
  width: -webkit-fill-available;
  margin-right: 16px;
  z-index: 3;
}
.exam-list-syllabus-icon:hover {
  box-shadow: 1px 1px 2px 1px #9e9e9e;
  border-radius: 50%;
  cursor: pointer;
}
.results-padding {
  margin-left: 8px;
  margin-right: 8px;
}
</style>
