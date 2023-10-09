<template>
  <ul class="mdc-list">
    <li
      v-for="question in questionList"
      :key="question.qid"
      class="mdc-list-item list-item-class grid-display"
      tabindex="0"
      @dblclick="emitEvent('on_dblclick', question.qid)"
    >
      <div class="question" v-html="question.questionData.question"></div>
      <img
        :id="question.qid + '-image'"
        width="auto"
        height="auto"
        v-if="question.questionData.isQuestionImage"
        class="queimg"
      />
      <div class="hover">
        <i
          class="material-icons hover-icon"
          @click="emitEvent('on_edit', question.qid)"
          >edit</i
        >
        <i
          class="material-icons hover-icon"
          @click="emitEvent('on_delete', question.qid)"
          >delete</i
        >
      </div>
      <div class="options-parent-div">
        <div
          class="options-div"
          v-for="option in question.questionData.options"
          :key="option.value"
          :class="[
            {
              'correct-answer': question.questionData.answer == option.value
            }
          ]"
        >
          <div
            v-if="option.optionContent && option.optionContent !== ''"
            v-html="option.optionContent"
          />
          <img
            :id="`${question.qid}-${option.value}-image`"
            :class="{
              'option-image':
                question.selectedOption == option.value ||
                question.questionData.answer == option.value
            }"
            class="option-image"
            v-else-if="option.isOptionImage"
          />
          <label v-else>{{ option.value }}</label>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import firebaseUtils from "@/services/FirebaseUtils.js";
export default {
  props: { questionList: { type: Array, default: () => [] } },
  mounted() {
    this.updateImages();
  },
  updated() {
    this.updateImages();
  },
  methods: {
    emitEvent(eventName, id) {
      this.$emit(eventName, { id });
    },
    updateImages() {
      this.questionList.forEach(question => {
        this.updateImageSrc(
          question.questionData.imagePath,
          question.qid + "-image"
        );
        question.questionData.options.forEach(option => {
          this.updateImageSrc(
            option.imagePath,
            `${question.qid}-${option.value}-image`
          );
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
.list-item-class {
  width: 90%;
  box-shadow: 1px 1px 2px 1px #9e9e9e;
  margin: 8px;
  height: auto;
  padding: 8px;
}
.options-parent {
  display: inline-flex;
}
.question-view {
  margin: 5px;
}
.correct-answer {
  border: 2px solid green;
  width: fit-content;
  font-weight: 700;
}
.wrong-answer {
  width: fit-content;
  border: 2px solid red;
  font-weight: 700;
}
.question {
  margin: 5px;
  font-weight: bold;
}
.queimg {
  width: auto;
  height: auto;
  text-align: center;
  max-width: 800px;
  max-height: 150px;
}
.options-div {
  font-style: oblique;
  /* text-align: center; */
  margin: 0 5px;
}
.option-image {
  max-height: 60px;
}
tr {
  border: 2px;
}
.hover {
  position: absolute;
  right: 28px;
  padding: 8px;
  background: white;
}
.hover-icon {
  opacity: 0.4;
  margin-right: 8px;
}
.hover-icon:hover {
  opacity: 0.9;
}
.grid-display {
  display: inline-table;
}
</style>
