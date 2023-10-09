<template>
  <div :id="id" class="radio-group-parent">
    <div class="question" v-html="questionData.questionData.question"></div>
    <img
      :id="questionData.qid + '-image'"
      v-if="questionData.questionData.isQuestionImage"
      class="queimg"
    />
    <div class="options-div">
      <div
        v-for="option in questionData.questionData.options"
        v-bind:key="option.key"
      >
        <div class="mdc-form-field">
          <div class="mdc-radio">
            <input
              type="radio"
              class="mdc-radio__native-control"
              :id="option.value"
              name="option"
              :value="option.value"
              v-model="questionData.selectedOption"
              @input="$emit('input', option.value)"
            />
            <div class="mdc-radio__background">
              <div class="mdc-radio__outer-circle"></div>
              <div class="mdc-radio__inner-circle"></div>
            </div>
            <div class="mdc-radio__ripple"></div>
          </div>
          <div
            class="remove-margin-bottom"
            v-if="option.optionContent && option.optionContent !== ''"
            v-html="option.optionContent"
          />
          <label
            :for="option.value"
            class="remove-margin-bottom"
            v-else-if="!option.isOptionImage"
            >{{ option.value }}</label
          >
          <img
            :id="option.value + '-image'"
            width="auto"
            height="auto"
            v-if="option.isOptionImage"
            class="option-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import firebaseUtils from "@/services/FirebaseUtils.js";
export default {
  props: {
    questionData: {
      type: Object,
      required: true
    },
    id: String
  },
  mounted() {
    this.updateImageSrc(
      this.questionData.questionData.imagePath,
      this.questionData.qid + "-image"
    );
    this.questionData.questionData.options.forEach(option => {
      this.updateImageSrc(option.imagePath, option.value + "-image");
    });
  },
  updated() {
    this.updateImageSrc(
      this.questionData.questionData.imagePath,
      this.questionData.qid + "-image"
    );
    this.questionData.questionData.options.forEach(option => {
      this.updateImageSrc(option.imagePath, option.value + "-image");
    });
  },
  methods: {
    updateImageSrc(imagePath, elementId) {
      if (imagePath) {
        document.getElementById(elementId).src = imagePath;
        // firebaseUtils.getImageUrl(imagePath).then(res => {
        // });
      }
    }
  }
};
</script>

<style scoped>
.question {
  margin: 5px;
  font-size: large;
  font-size: 120%;
  font-weight: 900;
}
.queimg {
  width: auto;
  height: auto;
  text-align: center;
  max-width: 800px;
  max-height: 150px;
}
.option-image {
  max-height: 60px;
}
.remove-margin-bottom {
  margin-bottom: 10px;
  display: contents;
  font-weight: 700;
}
</style>
