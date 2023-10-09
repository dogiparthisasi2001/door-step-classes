<template>
  <div>
    <label>{{ label }}</label>
    <div class="options-div">
      <div v-for="option in options" v-bind:key="option">
        <div class="mdc-form-field">
          <div class="mdc-checkbox">
            <input
              type="checkbox"
              class="mdc-checkbox__native-control"
              :value="option"
              :id="option + '-id'"
              :checked="selectedList.indexOf(option) != -1"
              @input="handleInput($event, option)"
            />
            <div class="mdc-checkbox__background">
              <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                <path
                  class="mdc-checkbox__checkmark-path"
                  fill="none"
                  d="M1.73,12.91 8.1,19.28 22.79,4.59"
                />
              </svg>
              <div class="mdc-checkbox__mixedmark"></div>
            </div>
            <div class="mdc-checkbox__ripple"></div>
          </div>
          <label :for="option + '-id'" class="remove-margin-bottom">{{
            option
          }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: { type: Array, default: () => [] },
    values: { type: Array, default: () => [] },
    label: String
  },
  data() {
    return { selectedList: this.values };
  },
  methods: {
    handleInput(event, option) {
      if (event.target.checked) {
        this.selectedList.push(option);
      } else {
        this.selectedList.splice(this.selectedList.indexOf(option), 1);
      }
      this.$emit("option_checked", this.selectedList);
    }
  }
};
</script>

<style scoped>
.options-div {
  display: inline-grid;
  justify-items: left;
}
.remove-margin-bottom {
  margin-bottom: 0px;
}
</style>
